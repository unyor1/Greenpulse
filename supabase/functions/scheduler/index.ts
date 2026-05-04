import { createClient } from "https://esm.sh/@supabase/supabase-js@2?target=deno";

const getEnv = (key: string, fallback?: string) => {
  const value = Deno.env.get(key) ?? fallback ?? "";
  return value.trim();
};

// System provided variables
const SUPABASE_URL = getEnv("SUPABASE_URL");
const SUPABASE_KEY = getEnv("SUPABASE_SERVICE_ROLE_KEY");

// Custom variables renamed to avoid SUPABASE_ prefix restriction
const SUPABASE_DEVICE_ID = getEnv("G_DEVICE_ID", "esp32-1");
const SUPABASE_DEVICE_TABLE = getEnv("G_DEVICE_TABLE", "device_state");
const SUPABASE_SCHEDULE_TABLE = getEnv("G_SCHEDULE_TABLE", "device_schedules");

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const normalizeTimeValue = (value: unknown) => {
  if (typeof value !== "string") return "00:00:00";
  const normalized = value.trim();
  if (!normalized) return "00:00:00";
  const parts = normalized.split(":");
  if (parts.length === 2) {
    return `${parts[0].padStart(2, "0")}:${parts[1].padStart(2, "0")}:00`;
  }
  if (parts.length >= 3) {
    return `${parts[0].padStart(2, "0")}:${parts[1].padStart(2, "0")}:${parts[2].padStart(2, "0")}`;
  }
  return "00:00:00";
};

const parseBooleanValue = (value: unknown) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value === 1;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    return normalized === "1" || normalized === "true" || normalized === "on";
  }
  return false;
};

const parseNumberArray = (value: unknown) => {
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

const weekdayMap: Record<string, number> = {
  Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6,
};

const getZonedDaySeconds = (timezone: string) => {
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
    console.warn(`Unable to evaluate timezone ${timezone}:`, (error as Error).message);
    const now = new Date();
    return {
      scheduleDay: (now.getDay() + 6) % 7,
      secondsNow: now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds(),
    };
  }
};

const toSeconds = (time: string) => {
  const normalized = normalizeTimeValue(time);
  const [h, m, s] = normalized.split(":").map(Number);
  return h * 3600 + m * 60 + s;
};

const isWithinRange = (current: number, start: number, end: number) => {
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

  if (error) throw new Error(`Schedule query failed: ${error.message}`);

  return (data ?? []).map((row: any) => ({
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

  if (error) throw new Error(`Device state query failed: ${error.message}`);

  return {
    pest_on: parseBooleanValue(data?.pest_on),
    waterpump_on: parseBooleanValue(data?.waterpump_on),
  };
};

const upsertDeviceState = async (pest_on: boolean, waterpump_on: boolean) => {
  const { error } = await supabase.from(SUPABASE_DEVICE_TABLE).upsert(
    {
      device_id: SUPABASE_DEVICE_ID,
      pest_on,
      waterpump_on,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "device_id" }
  );

  if (error) throw new Error(`Device state upsert failed: ${error.message}`);
};

const scheduleIsActive = (schedule: any) => {
  if (!schedule.enabled || !schedule.days.length) return false;
  const { scheduleDay, secondsNow } = getZonedDaySeconds(schedule.timezone);
  if (!schedule.days.includes(scheduleDay)) return false;
  return isWithinRange(secondsNow, toSeconds(schedule.startTime), toSeconds(schedule.endTime));
};

const determineDesiredState = (schedules: any[]) => {
  const desired = { pest_on: false, waterpump_on: false };
  for (const schedule of schedules) {
    if (!scheduleIsActive(schedule)) continue;
    if (schedule.device === "pest") desired.pest_on = true;
    if (schedule.device === "waterpump") desired.waterpump_on = true;
  }
  return desired;
};

const evaluate = async () => {
  const schedules = await loadSchedules();
  const desiredState = determineDesiredState(schedules);
  const currentState = await loadCurrentState();

  if (
    currentState.pest_on === desiredState.pest_on &&
    currentState.waterpump_on === desiredState.waterpump_on
  ) {
    return { updated: false, desiredState };
  }

  await upsertDeviceState(desiredState.pest_on, desiredState.waterpump_on);
  return { updated: true, desiredState };
};

Deno.serve(async (request: Request) => {
  try {
    const result = await evaluate();
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Scheduler error:", errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
});