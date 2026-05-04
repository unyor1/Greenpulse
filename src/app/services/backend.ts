/// <reference types="vite/client" />
import { createClient } from "@supabase/supabase-js";

const env = import.meta.env;
const SUPABASE_URL = (env.VITE_SUPABASE_URL ?? "https://ppcwxgllgvqdgidbifky.supabase.co").trim();
const SUPABASE_KEY = (env.VITE_SUPABASE_KEY ?? "").trim();
const SUPABASE_DEVICE_ID = (env.VITE_SUPABASE_DEVICE_ID ?? "esp32-1").trim();
const SUPABASE_DEVICE_TABLE = (env.VITE_SUPABASE_DEVICE_TABLE ?? "device_state").trim();

const supabase = SUPABASE_URL && SUPABASE_KEY ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

export async function getBackendSensorData(): Promise<{ light: number; soilMoisture: number }> {
  if (!supabase) {
    throw new Error("Supabase config missing");
  }
  const { data, error } = await supabase
    .from(SUPABASE_DEVICE_TABLE)
    .select("light,soil_moisture")
    .eq("device_id", SUPABASE_DEVICE_ID)
    .maybeSingle();
  if (error) {
    throw new Error(`Supabase sensor read failed: ${error.message}`);
  }
  const row = data as { light?: unknown; soil_moisture?: unknown } | null;
  return {
    light: typeof row?.light === "number" ? row.light : Number(row?.light ?? 0),
    soilMoisture: typeof row?.soil_moisture === "number" ? row.soil_moisture : Number(row?.soil_moisture ?? 0),
  };
}
/// <reference types="vite/client" />
// Backend sync for humidifier (Pest Control)
export async function getBackendHumidifierState(): Promise<boolean> {
  if (!supabase) {
    throw new Error("Supabase config missing");
  }
  const { data, error } = await supabase
    .from(SUPABASE_DEVICE_TABLE)
    .select("pest_on")
    .eq("device_id", SUPABASE_DEVICE_ID)
    .maybeSingle();
  if (error) {
    throw new Error(`Supabase read failed: ${error.message}`);
  }
  const row = data as { pest_on?: unknown } | null;
  return parseBooleanValue(row?.pest_on);
}

export async function setBackendHumidifierState(active: boolean): Promise<void> {
  if (!supabase) {
    throw new Error("Supabase config missing");
  }
  const { error } = await supabase.from(SUPABASE_DEVICE_TABLE).upsert(
    {
      device_id: SUPABASE_DEVICE_ID,
      pest_on: active,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "device_id" }
  );
  if (error) {
    throw new Error(`Supabase write failed: ${error.message}`);
  }
}

// Backend sync for water pump
export async function getBackendWaterPumpState(): Promise<boolean> {
  if (!supabase) {
    throw new Error("Supabase config missing");
  }
  const { data, error } = await supabase
    .from(SUPABASE_DEVICE_TABLE)
    .select("waterpump_on")
    .eq("device_id", SUPABASE_DEVICE_ID)
    .maybeSingle();
  if (error) {
    throw new Error(`Supabase read failed: ${error.message}`);
  }
  const row = data as { waterpump_on?: unknown } | null;
  return parseBooleanValue(row?.waterpump_on);
}

export async function setBackendWaterPumpState(active: boolean): Promise<void> {
  if (!supabase) {
    throw new Error("Supabase config missing");
  }
  const { error } = await supabase.from(SUPABASE_DEVICE_TABLE).upsert(
    {
      device_id: SUPABASE_DEVICE_ID,
      waterpump_on: active,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "device_id" }
  );
  if (error) {
    throw new Error(`Supabase write failed: ${error.message}`);
  }
}

export interface BackendSensorLog {
  createdAt: string;
  waterpump: boolean;
  pest: boolean;
}

export async function getBackendSensorLogs(limit = 200): Promise<BackendSensorLog[]> {
  if (!supabase) {
    throw new Error("Supabase config missing");
  }

  const { data, error } = await supabase
    .from("sensor_logs")
    .select("created_at,waterpump,pest")
    .eq("device_id", SUPABASE_DEVICE_ID)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Supabase sensor logs read failed: ${error.message}`);
  }

  const rows = (data ?? []) as Array<Record<string, unknown>>;
  return rows.map((row) => ({
    createdAt: String(row.created_at ?? ""),
    waterpump: parseBooleanValue(row.waterpump),
    pest: parseBooleanValue(row.pest),
  }));
}

export interface DashboardSensorConfig {
  id: string;
  deviceId: string;
  key: string;
  name: string;
  sensorType: "light" | "soil_moisture";
  unit: string;
  icon: string;
  iconColor: string;
  createdAt: string;
}

export interface DashboardSensorLog {
  id: string;
  dashboardSensorId: string;
  deviceId: string;
  value: number;
  createdAt: string;
}

const DASHBOARD_SENSORS_TABLE = "dashboard_sensors";
const DASHBOARD_SENSOR_LOGS_TABLE = "dashboard_sensor_logs";

export async function getBackendDeviceState(): Promise<Record<string, unknown>> {
  if (!supabase) {
    throw new Error("Supabase config missing");
  }

  const { data, error } = await supabase
    .from(SUPABASE_DEVICE_TABLE)
    .select("*")
    .eq("device_id", SUPABASE_DEVICE_ID)
    .maybeSingle();

  if (error) {
    throw new Error(`Supabase device state read failed: ${error.message}`);
  }

  const row = (data as Record<string, unknown>) ?? {};
  const extra = row.extra_data;
  if (extra && typeof extra === "object" && !Array.isArray(extra)) {
    return { ...row, ...(extra as Record<string, unknown>) };
  }

  return row;
}

export async function upsertDeviceStateExtraData(
  key: string,
  value: unknown
): Promise<void> {
  if (!supabase) {
    throw new Error("Supabase config missing");
  }

  const current = await getBackendDeviceState();
  const existingExtra =
    typeof current.extra_data === "object" && current.extra_data !== null
      ? (current.extra_data as Record<string, unknown>)
      : {};
  const updatedExtra = { ...existingExtra, [key]: value };

  const { error } = await supabase.from(SUPABASE_DEVICE_TABLE).upsert(
    {
      device_id: SUPABASE_DEVICE_ID,
      extra_data: updatedExtra,
    },
    { onConflict: "device_id" }
  );

  if (error) {
    throw new Error(`Supabase device state upsert failed: ${error.message}`);
  }
}

export async function removeDeviceStateExtraData(key: string): Promise<void> {
  if (!supabase) {
    throw new Error("Supabase config missing");
  }

  const { data, error } = await supabase
    .from(SUPABASE_DEVICE_TABLE)
    .select("extra_data")
    .eq("device_id", SUPABASE_DEVICE_ID)
    .maybeSingle();

  if (error) {
    throw new Error(`Supabase device state read failed: ${error.message}`);
  }

  const current = (data as Record<string, unknown> | null) ?? {};
  const existingExtra =
    typeof current.extra_data === "object" && current.extra_data !== null
      ? (current.extra_data as Record<string, unknown>)
      : {};

  if (!(key in existingExtra)) {
    return;
  }

  const { [key]: _, ...updatedExtra } = existingExtra;

  const { error: updateError } = await supabase
    .from(SUPABASE_DEVICE_TABLE)
    .update({ extra_data: updatedExtra })
    .eq("device_id", SUPABASE_DEVICE_ID);

  if (updateError) {
    throw new Error(`Supabase device state delete failed: ${updateError.message}`);
  }
}

export async function getDashboardSensors(): Promise<DashboardSensorConfig[]> {
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from(DASHBOARD_SENSORS_TABLE)
    .select(
      "id,device_id,key,name,sensor_type,unit,icon,icon_color,created_at"
    )
    .eq("device_id", SUPABASE_DEVICE_ID)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Supabase dashboard sensor read failed: ${error.message}`);
  }

  const rows = (data ?? []) as Array<Record<string, unknown>>;
  return rows
    .map((row) => ({
      id: String(row.id ?? ""),
      deviceId: String(row.device_id ?? SUPABASE_DEVICE_ID),
      key: String(row.key ?? ""),
      name: String(row.name ?? ""),
      sensorType: (row.sensor_type === "soil_moisture" ? "soil_moisture" : "light") as "soil_moisture" | "light",
      unit: String(row.unit ?? ""),
      icon: String(
        row.icon ??
          (row.sensor_type === "soil_moisture" ? "Droplets" : "Sun")
      ),
      iconColor: String(
        row.icon_color ??
          (row.sensor_type === "soil_moisture" ? "text-blue-500" : "text-yellow-500")
      ),
      createdAt: String(row.created_at ?? ""),
    }))
    .filter((sensor) => sensor.key.length > 0);
}

export async function createDashboardSensor(
  input: {
    key: string;
    name: string;
    sensorType: "light" | "soil_moisture";
    unit?: string;
    icon?: string;
    iconColor?: string;
  }
): Promise<DashboardSensorConfig> {
  if (!supabase) {
    throw new Error("Supabase config missing");
  }

  const trimmedKey = input.key.trim();
  const trimmedName = input.name.trim();

  if (!trimmedKey || !trimmedName) {
    throw new Error("Sensor nickname and database identifier are required.");
  }

  const unit = input.unit ?? (input.sensorType === "soil_moisture" ? "%" : "lux");
  const icon = input.icon ?? (input.sensorType === "soil_moisture" ? "Droplets" : "Sun");
  const iconColor =
    input.iconColor ??
    (input.sensorType === "soil_moisture" ? "text-blue-500" : "text-yellow-500");

  const { data: existing, error: existingError } = await supabase
    .from(DASHBOARD_SENSORS_TABLE)
    .select("id,device_id,key,name,sensor_type,unit,icon,icon_color,created_at")
    .eq("device_id", SUPABASE_DEVICE_ID)
    .eq("key", trimmedKey)
    .maybeSingle();

  if (existingError) {
    throw new Error(existingError.message);
  }

  if (existing) {
    return {
      id: String(existing.id ?? ""),
      deviceId: String(existing.device_id ?? SUPABASE_DEVICE_ID),
      key: String(existing.key ?? trimmedKey),
      name: String(existing.name ?? trimmedName),
      sensorType:
        existing.sensor_type === "soil_moisture" ? "soil_moisture" : "light",
      unit: String(existing.unit ?? unit),
      icon: String(existing.icon ?? icon),
      iconColor: String(existing.icon_color ?? iconColor),
      createdAt: String(existing.created_at ?? new Date().toISOString()),
    };
  }

  const { data, error } = await supabase
    .from(DASHBOARD_SENSORS_TABLE)
    .insert({
      device_id: SUPABASE_DEVICE_ID,
      key: trimmedKey,
      name: trimmedName,
      sensor_type: input.sensorType,
      unit,
      icon,
      icon_color: iconColor,
    })
    .select("id,device_id,key,name,sensor_type,unit,icon,icon_color,created_at")
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Failed to create dashboard sensor");
  }

  const created: DashboardSensorConfig = {
    id: String(data.id),
    deviceId: String(data.device_id ?? SUPABASE_DEVICE_ID),
    key: String(data.key ?? trimmedKey),
    name: String(data.name ?? trimmedName),
    sensorType:
      data.sensor_type === "soil_moisture" ? "soil_moisture" : "light",
    unit: String(data.unit ?? unit),
    icon: String(data.icon ?? icon),
    iconColor: String(data.icon_color ?? iconColor),
    createdAt: String(data.created_at ?? new Date().toISOString()),
  };

  await upsertDeviceStateExtraData(created.key, 0);

  return created;
}

export async function deleteDashboardSensor(id: string): Promise<void> {
  if (!supabase) {
    throw new Error("Supabase config missing");
  }

  const { data: existing, error: fetchError } = await supabase
    .from(DASHBOARD_SENSORS_TABLE)
    .select("key")
    .eq("id", id)
    .maybeSingle();

  if (fetchError) {
    throw new Error(fetchError.message);
  }

  const key = existing?.key ? String(existing.key) : "";

  const { error } = await supabase
    .from(DASHBOARD_SENSORS_TABLE)
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  if (key) {
    await removeDeviceStateExtraData(key);
  }
}

export async function createDashboardSensorLog(
  dashboardSensorId: string,
  value: number
): Promise<void> {
  if (!supabase) {
    throw new Error("Supabase config missing");
  }

  const { error } = await supabase.from(DASHBOARD_SENSOR_LOGS_TABLE).insert({
    dashboard_sensor_id: Number(dashboardSensorId),
    device_id: SUPABASE_DEVICE_ID,
    value,
    created_at: new Date().toISOString(),
  });

  if (error) {
    throw new Error(`Supabase dashboard sensor log failed: ${error.message}`);
  }
}

export async function getDashboardSensorLogs(
  sensorId: string,
  limit = 100
): Promise<DashboardSensorLog[]> {
  if (!supabase) {
    throw new Error("Supabase config missing");
  }

  const { data, error } = await supabase
    .from(DASHBOARD_SENSOR_LOGS_TABLE)
    .select("id,dashboard_sensor_id,device_id,value,created_at")
    .eq("dashboard_sensor_id", Number(sensorId))
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Supabase dashboard sensor log read failed: ${error.message}`);
  }

  const rows = (data ?? []) as Array<Record<string, unknown>>;
  return rows.map((row) => ({
    id: String(row.id ?? ""),
    dashboardSensorId: String(row.dashboard_sensor_id ?? ""),
    deviceId: String(row.device_id ?? ""),
    value: Number(row.value ?? 0),
    createdAt: String(row.created_at ?? ""),
  }));
}

const parseBooleanValue = (value: unknown): boolean => {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value === 1;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    return normalized === "1" || normalized === "true" || normalized === "on";
  }
  return false;
};

export interface AuditLogEntry {
  id: string;
  userId: string | null;
  username: string | null;
  event: string;
  device: ScheduleDevice | null;
  state: boolean | null;
  details: string | null;
  createdAt: string;
}

export async function logAuditEvent(input: {
  userId?: string | null;
  username?: string | null;
  event: string;
  device?: ScheduleDevice | null;
  state?: boolean | null;
  details?: string | null;
}): Promise<void> {
  if (!supabase) {
    throw new Error("Supabase config missing");
  }

  const { error } = await supabase.from("audit_logs").insert({
    user_id: input.userId ?? null,
    username: input.username ?? null,
    event: input.event,
    device: input.device ?? null,
    state: input.state ?? null,
    details: input.details ?? null,
    created_at: new Date().toISOString(),
  });

  if (error) {
    throw new Error(`Supabase audit log failed: ${error.message}`);
  }
}

export async function getAuditLogs(limit = 100): Promise<AuditLogEntry[]> {
  if (!supabase) {
    throw new Error("Supabase config missing");
  }

  const { data, error } = await supabase
    .from("audit_logs")
    .select("id,user_id,username,event,device,state,details,created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Supabase audit log read failed: ${error.message}`);
  }

  const rows = (data ?? []) as Array<Record<string, unknown>>;
  return rows.map((row) => ({
    id: String(row.id ?? ""),
    userId: row.user_id ? String(row.user_id) : null,
    username: row.username ? String(row.username) : null,
    event: String(row.event ?? ""),
    device: parseScheduleDevice(row.device) ?? null,
    state: row.state === null ? null : parseBooleanValue(row.state),
    details: row.details ? String(row.details) : null,
    createdAt: String(row.created_at ?? ""),
  }));
}

const DEFAULT_PUMP_SHORT_RUN_MINUTES = 5;

export interface UserPumpSettings {
  pumpAutoEnabled: boolean;
  pumpOnThreshold: number;
  pumpOffThreshold: number;
  shortRunConditionEnabled: boolean;
  shortRunTriggerThreshold: number;
  shortRunDurationMinutes: number;
  createdAt: string;
  updatedAt: string;
}

export async function getUserPumpSettings(userId: string): Promise<UserPumpSettings | null> {
  if (!supabase) {
    throw new Error("Supabase config missing");
  }

  const { data, error } = await supabase
    .from("user_pump_settings")
    .select(
      "pump_auto_enabled,pump_on_threshold,pump_off_threshold,short_run_condition_enabled,short_run_trigger_threshold,short_run_duration_minutes,created_at,updated_at"
    )
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(`Supabase pump settings read failed: ${error.message}`);
  }

  if (!data) {
    return null;
  }

  return {
    pumpAutoEnabled: parseBooleanValue(data.pump_auto_enabled),
    pumpOnThreshold: Number(data.pump_on_threshold ?? 60),
    pumpOffThreshold: Number(data.pump_off_threshold ?? 70),
    shortRunConditionEnabled: parseBooleanValue(data.short_run_condition_enabled),
    shortRunTriggerThreshold: Number(data.short_run_trigger_threshold ?? 0),
    shortRunDurationMinutes: Number(data.short_run_duration_minutes ?? DEFAULT_PUMP_SHORT_RUN_MINUTES),
    createdAt: String(data.created_at ?? ""),
    updatedAt: String(data.updated_at ?? ""),
  };
}

export async function upsertUserPumpSettings(input: {
  id: string;
  pumpAutoEnabled: boolean;
  pumpOnThreshold: number;
  pumpOffThreshold: number;
  shortRunConditionEnabled: boolean;
  shortRunTriggerThreshold: number;
  shortRunDurationMinutes: number;
}): Promise<void> {
  if (!supabase) {
    throw new Error("Supabase config missing");
  }

  const { error } = await supabase.from("user_pump_settings").upsert(
    {
      id: input.id,
      pump_auto_enabled: input.pumpAutoEnabled,
      pump_on_threshold: input.pumpOnThreshold,
      pump_off_threshold: input.pumpOffThreshold,
      short_run_condition_enabled: input.shortRunConditionEnabled,
      short_run_trigger_threshold: input.shortRunTriggerThreshold,
      short_run_duration_minutes: input.shortRunDurationMinutes,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );

  if (error) {
    throw new Error(`Supabase pump settings save failed: ${error.message}`);
  }
}

const normalizeTimeValue = (value: unknown): string => {
  if (typeof value !== "string") {
    return "00:00:00";
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return "00:00:00";
  }

  const parts = trimmed.split(":");
  if (parts.length === 2) {
    return `${parts[0]}:${parts[1]}:00`;
  }

  if (parts.length >= 3) {
    return `${parts[0]}:${parts[1]}:${parts[2]}`;
  }

  return "00:00:00";
};

const parseNumberArray = (value: unknown): number[] => {
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

export type ScheduleDevice = "pest" | "waterpump";

export interface BackendSchedule {
  id: number;
  deviceId: string;
  device: ScheduleDevice;
  days: number[];
  startTime: string;
  endTime: string;
  timezone: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBackendScheduleInput {
  device: ScheduleDevice;
  days: number[];
  startTime: string;
  endTime: string;
  timezone?: string;
  enabled?: boolean;
}

const parseScheduleDevice = (value: unknown): ScheduleDevice | null => {
  if (value === "pest" || value === "waterpump") {
    return value;
  }
  return null;
};

const mapBackendSchedule = (row: Record<string, unknown>): BackendSchedule | null => {
  const id = Number(row.id);
  const device = parseScheduleDevice(row.device);

  if (!Number.isFinite(id) || !device) {
    return null;
  }

  return {
    id,
    deviceId: String(row.device_id ?? ""),
    device,
    days: parseNumberArray(row.days),
    startTime: normalizeTimeValue(row.start_time),
    endTime: normalizeTimeValue(row.end_time),
    timezone: String(row.timezone ?? "Asia/Manila"),
    enabled: parseBooleanValue(row.enabled),
    createdAt: String(row.created_at ?? ""),
    updatedAt: String(row.updated_at ?? ""),
  };
};

export const hasScheduleBackendConfig = () => Boolean(supabase && SUPABASE_DEVICE_ID);

export async function getBackendSchedules(): Promise<BackendSchedule[]> {
  if (!supabase) {
    throw new Error("Supabase config missing");
  }

  const { data, error } = await supabase
    .from("device_schedules")
    .select("id,device_id,device,days,start_time,end_time,timezone,enabled,created_at,updated_at")
    .eq("device_id", SUPABASE_DEVICE_ID)
    .eq("enabled", true)
    .order("start_time", { ascending: true });

  if (error) {
    throw new Error(`Supabase schedule read failed: ${error.message}`);
  }

  const rows = (data ?? []) as Array<Record<string, unknown>>;
  return rows.map(mapBackendSchedule).filter((item): item is BackendSchedule => Boolean(item));
}

export async function createBackendSchedule(input: CreateBackendScheduleInput): Promise<BackendSchedule> {
  if (!supabase) {
    throw new Error("Supabase config missing");
  }

  const payload = {
    device_id: SUPABASE_DEVICE_ID,
    device: input.device,
    days: [...new Set(input.days)].sort((a, b) => a - b),
    start_time: normalizeTimeValue(input.startTime),
    end_time: normalizeTimeValue(input.endTime),
    timezone: input.timezone ?? "Asia/Manila",
    enabled: input.enabled ?? true,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("device_schedules")
    .insert(payload)
    .select("id,device_id,device,days,start_time,end_time,timezone,enabled,created_at,updated_at")
    .single();

  if (error) {
    throw new Error(`Supabase schedule insert failed: ${error.message}`);
  }

  const mapped = mapBackendSchedule((data ?? {}) as Record<string, unknown>);
  if (!mapped) {
    throw new Error("Supabase schedule insert returned invalid data");
  }

  return mapped;
}

export async function deleteBackendSchedule(id: number): Promise<void> {
  if (!supabase) {
    throw new Error("Supabase config missing");
  }

  const { error } = await supabase
    .from("device_schedules")
    .delete()
    .eq("id", id)
    .eq("device_id", SUPABASE_DEVICE_ID);

  if (error) {
    throw new Error(`Supabase schedule delete failed: ${error.message}`);
  }
}

export async function updateBackendSchedule(id: number, input: CreateBackendScheduleInput): Promise<BackendSchedule> {
  if (!supabase) {
    throw new Error("Supabase config missing");
  }

  const payload = {
    device: input.device,
    days: [...new Set(input.days)].sort((a, b) => a - b),
    start_time: normalizeTimeValue(input.startTime),
    end_time: normalizeTimeValue(input.endTime),
    timezone: input.timezone ?? "Asia/Manila",
    enabled: input.enabled ?? true,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("device_schedules")
    .update(payload)
    .eq("id", id)
    .eq("device_id", SUPABASE_DEVICE_ID)
    .select("id,device_id,device,days,start_time,end_time,timezone,enabled,created_at,updated_at")
    .single();

  if (error) {
    throw new Error(`Supabase schedule update failed: ${error.message}`);
  }

  const mapped = mapBackendSchedule((data ?? {}) as Record<string, unknown>);
  if (!mapped) {
    throw new Error("Supabase schedule update returned invalid data");
  }

  return mapped;
}

