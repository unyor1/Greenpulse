import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

const loadDotEnv = () => {
  const envFile = path.resolve(process.cwd(), ".env");
  if (!fs.existsSync(envFile)) return {};

  const content = fs.readFileSync(envFile, "utf8");
  return content.split(/\r?\n/).reduce((acc, line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return acc;
    const [key, ...rest] = trimmed.split("=");
    const value = rest.join("=").trim();
    acc[key] = value;
    return acc;
  }, {});
};

const fileEnv = loadDotEnv();
const env = { ...fileEnv, ...process.env };
const SUPABASE_URL = (env.SUPABASE_URL ?? env.VITE_SUPABASE_URL ?? "").trim();
const SUPABASE_KEY = (env.SUPABASE_KEY ?? env.VITE_SUPABASE_KEY ?? "").trim();
const SUPABASE_DEVICE_ID = (env.SUPABASE_DEVICE_ID ?? env.VITE_SUPABASE_DEVICE_ID ?? "esp32-1").trim();
const SUPABASE_DEVICE_TABLE = (env.SUPABASE_DEVICE_TABLE ?? "device_state").trim();
const SUPABASE_SCHEDULE_TABLE = (env.SUPABASE_SCHEDULE_TABLE ?? "device_schedules").trim();

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_KEY.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const normalizeTimeValue = (value) => {
  if (typeof value !== "string") {
    return "00:00:00";
  }

  const normalized = value.trim();
  if (!normalized) {
    return "00:00:00";
  }

  const parts = normalized.split(":");
  if (parts.length === 2) {
    return `${parts[0].padStart(2, "0")}:${parts[1].padStart(2, "0")}:00`;
  }

  if (parts.length >= 3) {
    return `${parts[0].padStart(2, "0")}:${parts[1].padStart(2, "0")}:${parts[2].padStart(2, "0")}`;
  }

  return "00:00:00";
};

const parseBooleanValue = (value) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value === 1;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    return normalized === "1" || normalized === "true" || normalized === "on";
  }
  return false;
};

const parseNumberArray = (value) => {
  if (Array.isArray(value)) {
    return value
      .map((item) => Number(item))
      .filter((item) => Number.isInteger(item) && item >= 0 && item <= 6);
  }

  if (typeof value === "string") {
    const cleaned = value.replace(/[{}\s]/g, "");
    if (!cleaned) return [];
    return cleaned
      .split(",")
      .map((item) => Number(item))
      .filter((item) => Number.isInteger(item) && item >= 0 && item <= 6);
  }

  return [];
};

const weekdayMap = {
  Mon: 0,
  Tue: 1,
  Wed: 2,
  Thu: 3,
  Fri: 4,
  Sat: 5,
  Sun: 6,
};

const getZonedDaySeconds = (timezone) => {
  if (!timezone) {
    const now = new Date();
    return {
      scheduleDay: (now.getDay() + 6) % 7,
      secondsNow: now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds(),
    };
  }

  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const parts = formatter.formatToParts(new Date());
    const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
    const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
    const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
    const second = Number(parts.find((p) => p.type === "second")?.value ?? 0);
    return {
      scheduleDay: weekdayMap[weekday] ?? ((new Date().getDay() + 6) % 7),
      secondsNow: hour * 3600 + minute * 60 + second,
    };
  } catch (error) {
    console.warn(`Unable to evaluate timezone ${timezone}:`, error.message);
    const now = new Date();
    return {
      scheduleDay: (now.getDay() + 6) % 7,
      secondsNow: now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds(),
    };
  }
};

const toSeconds = (time) => {
  const normalized = normalizeTimeValue(time);
  const [h, m, s] = normalized.split(":").map(Number);
  return h * 3600 + m * 60 + s;
};

const isWithinRange = (current, start, end) => {
  if (start === end) return false;
  if (start < end) return current >= start && current < end;
  return current >= start || current < end;
};

const loadSchedules = async () => {
  const { data, error } = await supabase
    .from(SUPABASE_SCHEDULE_TABLE)
    .select("id,device_id,device,days,start_time,end_time,timezone,enabled")
    .eq("device_id", SUPABASE_DEVICE_ID)
    .eq("enabled", true)
    .order("start_time", { ascending: true });

  if (error) {
    throw new Error(`Schedule query failed: ${error.message}`);
  }

  return (data ?? []).map((row) => ({
    id: Number(row.id),
    device: row.device,
    days: parseNumberArray(row.days),
    startTime: normalizeTimeValue(row.start_time),
    endTime: normalizeTimeValue(row.end_time),
    timezone: String(row.timezone ?? ""),
    enabled: parseBooleanValue(row.enabled),
  }));
};

const loadCurrentState = async () => {
  const { data, error } = await supabase
    .from(SUPABASE_DEVICE_TABLE)
    .select("pest_on,waterpump_on")
    .eq("device_id", SUPABASE_DEVICE_ID)
    .maybeSingle();

  if (error) {
    throw new Error(`Device state query failed: ${error.message}`);
  }

  return {
    pest_on: parseBooleanValue(data?.pest_on),
    waterpump_on: parseBooleanValue(data?.waterpump_on),
  };
};

const upsertDeviceState = async (pest_on, waterpump_on) => {
  const { error } = await supabase.from(SUPABASE_DEVICE_TABLE).upsert(
    {
      device_id: SUPABASE_DEVICE_ID,
      pest_on,
      waterpump_on,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "device_id" }
  );

  if (error) {
    throw new Error(`Device state upsert failed: ${error.message}`);
  }
};

const scheduleIsActive = (schedule) => {
  if (!schedule.enabled || !schedule.days.length) return false;
  const { scheduleDay, secondsNow } = getZonedDaySeconds(schedule.timezone);
  if (!schedule.days.includes(scheduleDay)) return false;

  return isWithinRange(secondsNow, toSeconds(schedule.startTime), toSeconds(schedule.endTime));
};

const determineDesiredState = (schedules) => {
  const desired = { pest_on: false, waterpump_on: false };

  for (const schedule of schedules) {
    if (!scheduleIsActive(schedule)) continue;
    if (schedule.device === "pest") {
      desired.pest_on = true;
    }
    if (schedule.device === "waterpump") {
      desired.waterpump_on = true;
    }
  }

  return desired;
};

const evaluate = async () => {
  try {
    const schedules = await loadSchedules();
    const desiredState = determineDesiredState(schedules);
    const currentState = await loadCurrentState();

    if (
      currentState.pest_on === desiredState.pest_on &&
      currentState.waterpump_on === desiredState.waterpump_on
    ) {
      console.log(`No change — pest=${desiredState.pest_on} pump=${desiredState.waterpump_on}`);
      return;
    }

    await upsertDeviceState(desiredState.pest_on, desiredState.waterpump_on);
    console.log(`Updated device state — pest=${desiredState.pest_on} pump=${desiredState.waterpump_on}`);
  } catch (error) {
    console.error("Scheduler error:", error.message || error);
  }
};

const runScheduler = async () => {
  console.log("Supabase scheduler starting (one-shot execution)...");
  console.log(`Device ID: ${SUPABASE_DEVICE_ID}`);
  console.log(`Schedule table: ${SUPABASE_SCHEDULE_TABLE}`);
  console.log(`Device table: ${SUPABASE_DEVICE_TABLE}`);

  await evaluate();
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runScheduler().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

export default runScheduler;
