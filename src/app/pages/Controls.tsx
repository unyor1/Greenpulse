import { useEffect, useState, useRef } from "react";
import { ControlButton } from "../components/ControlButton";
import { PlantbotWidget } from "../components/PlantbotWidget";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { useSensor } from "../context/SensorContext";
import { toast } from "sonner";
import { getCurrentUserProfile } from "../services/auth";
import {
  createBackendSchedule,
  deleteBackendSchedule,
  updateBackendSchedule,
  getBackendSchedules,
  getBackendHumidifierState,
  getBackendWaterPumpState,
  hasScheduleBackendConfig,
  logAuditEvent,
  setBackendHumidifierState,
  setBackendWaterPumpState,
  upsertUserPumpSettings,
} from "../services/backend";
import { hasBlynkConfig, updateBlynkVirtualPin } from "../services/blynk";
import { Wind, Droplet, Trash2, Settings, Info } from "lucide-react";

type ScheduleDevice = "pest" | "waterpump";

interface Schedule {
  id: string;
  device: ScheduleDevice;
  days: number[];
  startTime: string;
  endTime: string;
  timezone: string;
}

const normalizeScheduleTime = (time: string) => {
  const parts = time.split(":");
  if (parts.length === 2) return `${parts[0]}:${parts[1]}:00`;
  return time;
};

const DAYS = [
  { value: 0, label: "Mon" },
  { value: 1, label: "Tue" },
  { value: 2, label: "Wed" },
  { value: 3, label: "Thu" },
  { value: 4, label: "Fri" },
  { value: 5, label: "Sat" },
  { value: 6, label: "Sun" },
];

const BLYNK_POLL_INTERVAL_MS = 5000;       // poll Supabase every 5s for Blynk changes
const BLYNK_PIN_PEST = "V3";
const BLYNK_PIN_WATERPUMP = "V2";
// pump thresholds are provided by SensorContext and persisted in Supabase user settings
const DEFAULT_PUMP_SHORT_RUN_MINUTES = 5;
const getShortRunDurationMs = (minutes: number) => Math.max(1, minutes) * 60 * 1000;

type UserOverrideState = Record<ScheduleDevice, boolean>;


export function Controls() {
  const {
    humidifierActive,
    waterPumpActive,
    setHumidifierActive,
    setWaterPumpActive,
    soilMoisture,
    pumpOnThreshold,
    pumpOffThreshold,
    setPumpOnThreshold,
    setPumpOffThreshold,
    pumpAutoEnabled,
    setPumpAutoEnabled,
    pumpShortRunConditionEnabled,
    setPumpShortRunConditionEnabled,
    pumpShortRunTriggerThreshold,
    setPumpShortRunTriggerThreshold,
    pumpShortRunDurationMinutes,
    setPumpShortRunDurationMinutes,
    pumpSettingsLoaded,
    userOverride,
    setUserOverride,
  } = useSensor();

  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [openScheduleDialog, setOpenScheduleDialog] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<ScheduleDevice>("pest");
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [selectedStartTime, setSelectedStartTime] = useState("08:00:00");
  const [selectedEndTime, setSelectedEndTime] = useState("09:00:00");
  const [editingScheduleId, setEditingScheduleId] = useState<string | null>(null);
  const [schedulesSyncing, setSchedulesSyncing] = useState(false);
  const [pumpShortRunUntil, setPumpShortRunUntil] = useState<number | null>(null);
  const [pestScheduleUntil, setPestScheduleUntil] = useState<number | null>(null);
  const [pumpScheduleUntil, setPumpScheduleUntil] = useState<number | null>(null);
  const [nowTick, setNowTick] = useState(() => Date.now());
  const [openSettingsDialog, setOpenSettingsDialog] = useState(false);
  const [openInfoDialog, setOpenInfoDialog] = useState(false);

  const prevDesiredRef = useRef<Record<ScheduleDevice, boolean | null>>({
    pest: null,
    waterpump: null,
  });
  const shortRunRef = useRef<{ key: string | null; until: number | null }>({
    key: null,
    until: null,
  });

  // Short-run trigger setting (persisted in SensorContext)
  const [draftShortRunEnabled, setDraftShortRunEnabled] = useState<boolean>(pumpShortRunConditionEnabled);
  const [draftShortRunThreshold, setDraftShortRunThreshold] = useState<number>(pumpShortRunTriggerThreshold);
  const [draftShortRunDurationMinutes, setDraftShortRunDurationMinutes] = useState<number>(pumpShortRunDurationMinutes);

  const syncSchedulesFromBackend = async (showErrors: boolean) => {
    if (!hasScheduleBackendConfig()) return;
    try {
      if (showErrors) setSchedulesSyncing(true);
      const records = await getBackendSchedules();
      setSchedules(
        records.map((r) => ({
          id: String(r.id),
          device: r.device as ScheduleDevice,
          days: r.days,
          startTime: r.startTime,
          endTime: r.endTime,
          timezone: r.timezone,
        }))
      );
    } catch {
      if (showErrors) toast.error("Unable to load schedules from Supabase.");
    } finally {
      if (showErrors) setSchedulesSyncing(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => setNowTick(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const loadProfile = async () => {
      const profile = await getCurrentUserProfile();
      if (!cancelled && profile) {
        setUsername(profile.username);
        setUserId(profile.id);
      }
    };
    void loadProfile();
    return () => {
      cancelled = true;
    };
  }, []);

  const trackAudit = async (input: {
    event: string;
    device?: ScheduleDevice | null;
    state?: boolean;
    details?: string;
  }) => {
    try {
      await logAuditEvent({
        userId: userId,
        username: username || null,
        event: input.event,
        device: input.device ?? null,
        state: input.state ?? null,
        details: input.details ?? null,
      });
    } catch (err) {
      console.error("Failed to write audit log", err);
    }
  };


  // ─── Load schedules from Supabase on mount ────────────────────────────────────
  useEffect(() => {
    if (!hasScheduleBackendConfig()) return;
    let disposed = false;

    const loadSchedules = async () => {
      if (disposed) return;
      await syncSchedulesFromBackend(true);
    };

    void loadSchedules();
    return () => { disposed = true; };
  }, []);

  useEffect(() => {
    if (!hasScheduleBackendConfig()) return;
    let disposed = false;

    const refreshSchedules = async () => {
      if (disposed) return;
      await syncSchedulesFromBackend(false);
    };

    const interval = setInterval(() => void refreshSchedules(), 60 * 1000);
    return () => {
      disposed = true;
      clearInterval(interval);
    };
  }, []);

  // ─── Load device state from Supabase on mount ────────────────────────────────
  useEffect(() => {
    if (!hasScheduleBackendConfig()) return;
    if (!pumpSettingsLoaded) return;
    let disposed = false;

    const loadDeviceState = async () => {
      try {
        const [humidifierState, pumpState] = await Promise.all([
          getBackendHumidifierState().catch(() => null),
          getBackendWaterPumpState().catch(() => null),
        ]);
        if (disposed) return;

        if (typeof humidifierState === "boolean" && !userOverride.pest) {
          setHumidifierActive(humidifierState);
        }
        if (typeof pumpState === "boolean" && !userOverride.waterpump) {
          setWaterPumpActive(pumpState);
        }
      } catch {
        // schedule evaluator will correct within 30s
      }
    };

    void loadDeviceState();
    return () => { disposed = true; };
  }, [setHumidifierActive, setWaterPumpActive, userOverride, pumpSettingsLoaded]);

  // ─── Poll Supabase every 5s to pick up Blynk-triggered state changes ─────────
  // When the user taps V2/V3 in the Blynk app, the ESP32 writes to Supabase.
  // This polling loop reads those changes and syncs the dashboard UI.
  useEffect(() => {
    if (!hasScheduleBackendConfig()) return;
    if (!pumpSettingsLoaded) return;
    let disposed = false;

    const pollBlynkState = async () => {
      if (disposed) return;
      try {
        const [humidifierState, pumpState] = await Promise.all([
          getBackendHumidifierState().catch(() => null),
          getBackendWaterPumpState().catch(() => null),
        ]);
        if (disposed) return;

        if (!userOverride.pest && typeof humidifierState === "boolean") {
          setHumidifierActive(humidifierState);
        }
        if (!userOverride.waterpump && typeof pumpState === "boolean") {
          setWaterPumpActive(pumpState);
        }
      } catch {
        // silently ignore transient errors
      }
    };

    const interval = setInterval(() => void pollBlynkState(), BLYNK_POLL_INTERVAL_MS);
    return () => {
      disposed = true;
      clearInterval(interval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setHumidifierActive, setWaterPumpActive, userOverride, pumpSettingsLoaded]);

  // ─── Schedule evaluator — runs every 2s ──────────────────────────────────────
  useEffect(() => {
    if (!pumpSettingsLoaded) return;
    const weekdayMap: Record<string, number> = {
      Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6,
    };

    const getLocalDaySeconds = () => {
      const now = new Date();
      const scheduleDay = (now.getDay() + 6) % 7;
      const secondsNow =
        now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
      return { scheduleDay, secondsNow };
    };

    const getZonedDaySeconds = (timezone?: string) => {
      if (!timezone) return getLocalDaySeconds();
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
          scheduleDay: weekdayMap[weekday] ?? getLocalDaySeconds().scheduleDay,
          secondsNow: hour * 3600 + minute * 60 + second,
        };
      } catch {
        return getLocalDaySeconds();
      }
    };

    const toSeconds = (time: string) => {
      const normalized = normalizeScheduleTime(time);
      const [h, m, s] = normalized.split(":").map(Number);
      return h * 3600 + m * 60 + s;
    };

    const isWithinRange = (current: number, start: number, end: number) => {
      if (start === end) return false;
      if (start < end) return current >= start && current < end;
      return current >= start || current < end;
    };

    const getRemainingSeconds = (current: number, start: number, end: number) => {
      if (start === end) return 0;
      if (start < end) return end - current;
      if (current >= start) return 24 * 3600 - current + end;
      return end - current;
    };

    const getActiveSchedule = (device: ScheduleDevice) => {
      for (const s of schedules) {
        if (s.device !== device) continue;
        if (!s.days?.length) continue;
        const { scheduleDay, secondsNow } = getZonedDaySeconds(s.timezone);
        if (!s.days.includes(scheduleDay)) continue;
        if (!isWithinRange(secondsNow, toSeconds(s.startTime), toSeconds(s.endTime))) continue;
        return { schedule: s, scheduleDay, secondsNow };
      }
      return null;
    };

    let disposed = false;

    const evaluateSchedules = async () => {
      if (disposed) return;

      const pestMatch = getActiveSchedule("pest");
      const pumpMatch = getActiveSchedule("waterpump");
      const pestActive = Boolean(pestMatch);

      if (pestMatch) {
        const remainingSeconds = getRemainingSeconds(
          pestMatch.secondsNow,
          toSeconds(pestMatch.schedule.startTime),
          toSeconds(pestMatch.schedule.endTime)
        );
        setPestScheduleUntil(Date.now() + remainingSeconds * 1000);
      } else {
        setPestScheduleUntil(null);
      }

      if (pumpMatch) {
        const remainingSeconds = getRemainingSeconds(
          pumpMatch.secondsNow,
          toSeconds(pumpMatch.schedule.startTime),
          toSeconds(pumpMatch.schedule.endTime)
        );
        setPumpScheduleUntil(Date.now() + remainingSeconds * 1000);
      } else {
        setPumpScheduleUntil(null);
      }

      let pumpActive = false;
      const scheduleKey = pumpMatch ? `${pumpMatch.schedule.id}-${pumpMatch.scheduleDay}` : null;
      const shouldShortRunForSchedule =
        Boolean(pumpMatch) &&
        pumpShortRunConditionEnabled &&
        soilMoisture >= pumpShortRunTriggerThreshold;

      const clearPumpShortRun = () => {
        if (shortRunRef.current.key !== null || shortRunRef.current.until !== null) {
          shortRunRef.current = { key: null, until: null };
          setPumpShortRunUntil(null);
        }
      };

      if (pumpMatch) {
        if (shouldShortRunForSchedule) {
          if (shortRunRef.current.key !== scheduleKey) {
            const until = Date.now() + getShortRunDurationMs(pumpShortRunDurationMinutes);
            shortRunRef.current = { key: scheduleKey, until };
            setPumpShortRunUntil(until);
          }
          pumpActive = Date.now() < (shortRunRef.current.until ?? 0);
        } else {
          clearPumpShortRun();
          pumpActive = true;
        }
      } else if (pumpAutoEnabled) {
        // Hysteresis: turn on when below `pumpOnThreshold`, stay on until reaching `pumpOffThreshold`.
        const currentlyOn = Boolean(waterPumpActive);
        if (currentlyOn) {
          pumpActive = soilMoisture < pumpOffThreshold;
        } else {
          pumpActive = soilMoisture <= pumpOnThreshold;
        }

        if (pumpActive) {
          clearPumpShortRun();
        }
      } else {
        clearPumpShortRun();
      }

      console.debug("Schedules eval", { pestActive, pumpActive });

      // ── Pest / Humidifier ─────────────────────────────────────────────────
      try {
        if (!userOverride.pest) {
          setHumidifierActive(pestActive);
          const prev = prevDesiredRef.current.pest;
          const shouldUpdate = prev === null || prev !== pestActive;
          if (shouldUpdate) {
            prevDesiredRef.current.pest = pestActive;
            if (hasScheduleBackendConfig()) {
              try {
                await setBackendHumidifierState(pestActive);
                if (prev !== null) {
                  toast.success(`Schedule: Pest ${pestActive ? "ON" : "OFF"} (Supabase)`);
                }
              } catch {
                console.error("Failed writing pest state to Supabase.");
                toast.error("Failed writing pest state to Supabase.");
              }
            }
            if (hasBlynkConfig()) {
              try {
                await updateBlynkVirtualPin(BLYNK_PIN_PEST, pestActive);
              } catch (err) {
                console.error("Failed to update Blynk pest pin.", err);
                toast.error("Failed to update Blynk pest pin.");
              }
            }
          }
        }
      } catch {}

      // ── Water Pump ────────────────────────────────────────────────────────
      try {
        if (!userOverride.waterpump) {
          setWaterPumpActive(pumpActive);
          const prev = prevDesiredRef.current.waterpump;
          const shouldUpdate = prev === null || prev !== pumpActive;
          if (shouldUpdate) {
            prevDesiredRef.current.waterpump = pumpActive;
            if (hasScheduleBackendConfig()) {
              try {
                await setBackendWaterPumpState(pumpActive);
                if (prev !== null) {
                  toast.success(`Schedule: Pump ${pumpActive ? "ON" : "OFF"} (Supabase)`);
                }
              } catch {
                console.error("Failed writing pump state to Supabase.");
                toast.error("Failed writing pump state to Supabase.");
              }
            }
            if (hasBlynkConfig()) {
              try {
                await updateBlynkVirtualPin(BLYNK_PIN_WATERPUMP, pumpActive);
              } catch (err) {
                console.error("Failed to update Blynk water pump pin.", err);
                toast.error("Failed to update Blynk water pump pin.");
              }
            }
          }
        }
      } catch {}
    };

    void evaluateSchedules();
    const interval = setInterval(() => void evaluateSchedules(), 2000);
    return () => {
      disposed = true;
      clearInterval(interval);
    };
  }, [
    schedules,
    soilMoisture,
    setHumidifierActive,
    setWaterPumpActive,
    userOverride,
    pumpAutoEnabled,
    waterPumpActive,
    pumpOnThreshold,
    pumpOffThreshold,
    pumpShortRunConditionEnabled,
    pumpShortRunTriggerThreshold,
  ]);

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  const getRemainingMs = (expires: number | null) => {
    if (expires === null) return null;
    const remaining = expires - nowTick;
    return remaining > 0 ? remaining : null;
  };

  const formatRemaining = (ms: number) => {
    const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  const pumpShortRemaining = getRemainingMs(pumpShortRunUntil);
  const pestScheduleRemaining = getRemainingMs(pestScheduleUntil);
  const pumpScheduleRemaining = getRemainingMs(pumpScheduleUntil);
  const pestTimerLabel = pestScheduleRemaining
    ? `Schedule ends in: ${formatRemaining(pestScheduleRemaining)}`
    : "Auto mode";
  const pumpTimerLabel = pumpShortRemaining
    ? `Short run: ${formatRemaining(pumpShortRemaining)}`
    : pumpScheduleRemaining
    ? `Schedule ends in: ${formatRemaining(pumpScheduleRemaining)}`
    : "Auto mode";

  const toggleDay = (day: number) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const openScheduleForDevice = (device: ScheduleDevice) => {
    setSelectedDevice(device);
    setSelectedDays([]);
    setSelectedStartTime("08:00:00");
    setSelectedEndTime("09:00:00");
    setEditingScheduleId(null);
    setOpenScheduleDialog(true);
  };

  const openEditScheduleDialog = (schedule: Schedule) => {
    setSelectedDevice(schedule.device);
    setSelectedDays([...schedule.days]);
    setSelectedStartTime(schedule.startTime);
    setSelectedEndTime(schedule.endTime);
    setEditingScheduleId(schedule.id);
    setOpenScheduleDialog(true);
  };

  const handleAddOrEditSchedule = async () => {
    if (selectedDays.length === 0) {
      alert("Please select at least one day");
      return;
    }
    if (selectedStartTime === selectedEndTime) {
      alert("Start and end time cannot be the same");
      return;
    }

    if (editingScheduleId) {
      if (!hasScheduleBackendConfig()) {
        setSchedules((prev) =>
          prev.map((s) =>
            s.id === editingScheduleId
              ? {
                  ...s,
                  days: selectedDays.slice().sort((a, b) => a - b),
                  startTime: normalizeScheduleTime(selectedStartTime),
                  endTime: normalizeScheduleTime(selectedEndTime),
                }
              : s
          )
        );
        setOpenScheduleDialog(false);
        setEditingScheduleId(null);
        return;
      }

      const numericId = Number(editingScheduleId);
      if (!Number.isFinite(numericId)) {
        setSchedules((prev) =>
          prev.map((s) =>
            s.id === editingScheduleId
              ? {
                  ...s,
                  days: selectedDays.slice().sort((a, b) => a - b),
                  startTime: normalizeScheduleTime(selectedStartTime),
                  endTime: normalizeScheduleTime(selectedEndTime),
                }
              : s
          )
        );
        setOpenScheduleDialog(false);
        setEditingScheduleId(null);
        return;
      }

      try {
        setSchedulesSyncing(true);
        const existing = schedules.find((s) => s.id === editingScheduleId);
        const timezone =
          existing?.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone;
        const updated = await updateBackendSchedule(numericId, {
          device: selectedDevice,
          days: selectedDays.slice().sort((a, b) => a - b),
          startTime: normalizeScheduleTime(selectedStartTime),
          endTime: normalizeScheduleTime(selectedEndTime),
          timezone,
        });
        setSchedules((prev) =>
          prev.map((s) =>
            s.id === editingScheduleId
              ? {
                  id: String(updated.id),
                  device: updated.device as ScheduleDevice,
                  days: updated.days,
                  startTime: updated.startTime,
                  endTime: updated.endTime,
                  timezone: updated.timezone,
                }
              : s
          )
        );
        await trackAudit({
          event: "schedule_update",
          device: selectedDevice,
          details: `${selectedDevice === "pest" ? "Pest Control" : "Water Pump"} schedule updated: ${selectedDays
            .slice()
            .sort((a, b) => a - b)
            .map((day) => DAYS.find((d) => d.value === day)?.label)
            .filter(Boolean)
            .join(", ")} ${normalizeScheduleTime(selectedStartTime)}–${normalizeScheduleTime(selectedEndTime)}`,
        });
        toast.success("Schedule updated in Supabase.");
        setOpenScheduleDialog(false);
        setEditingScheduleId(null);
      } catch (err) {
        console.error(err);
        toast.error("Failed to update schedule.");
      } finally {
        setSchedulesSyncing(false);
      }
      return;
    }

    // ── Add new ───────────────────────────────────────────────────────────────
    const nextSchedule: Schedule = {
      id: Date.now().toString(),
      device: selectedDevice,
      days: selectedDays.slice().sort((a, b) => a - b),
      startTime: normalizeScheduleTime(selectedStartTime),
      endTime: normalizeScheduleTime(selectedEndTime),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    if (!hasScheduleBackendConfig()) {
      setSchedules((prev) => [...prev, nextSchedule]);
      setOpenScheduleDialog(false);
      return;
    }

    try {
      setSchedulesSyncing(true);
      const saved = await createBackendSchedule({
        device: selectedDevice,
        days: nextSchedule.days,
        startTime: nextSchedule.startTime,
        endTime: nextSchedule.endTime,
        timezone: nextSchedule.timezone,
      });
      setSchedules((prev) => [
        ...prev,
        {
          id: String(saved.id),
          device: saved.device as ScheduleDevice,
          days: saved.days,
          startTime: saved.startTime,
          endTime: saved.endTime,
          timezone: saved.timezone,
        },
      ]);
      await trackAudit({
        event: "schedule_create",
        device: selectedDevice,
        details: `${selectedDevice === "pest" ? "Pest Control" : "Water Pump"} schedule created: ${selectedDays
          .slice()
          .sort((a, b) => a - b)
          .map((day) => DAYS.find((d) => d.value === day)?.label)
          .filter(Boolean)
          .join(", ")} ${nextSchedule.startTime}–${nextSchedule.endTime}`,
      });
      setOpenScheduleDialog(false);
      toast.success("Schedule saved to Supabase.");
    } catch {
      toast.error("Failed to save schedule to Supabase.");
    } finally {
      setSchedulesSyncing(false);
    }
  };

  const handleDeleteSchedule = async (id: string) => {
    if (!hasScheduleBackendConfig()) {
      setSchedules((prev) => prev.filter((s) => s.id !== id));
      return;
    }
    const numericId = Number(id);
    if (!Number.isFinite(numericId)) {
      setSchedules((prev) => prev.filter((s) => s.id !== id));
      return;
    }
    try {
      setSchedulesSyncing(true);
      await deleteBackendSchedule(numericId);
      setSchedules((prev) => prev.filter((s) => s.id !== id));
      await trackAudit({
        event: "schedule_delete",
        device: null,
        details: `Schedule ${id} deleted by ${username || "user"}`,
      });
      toast.success("Schedule deleted from Supabase.");
    } catch {
      toast.error("Failed to delete schedule from Supabase.");
    } finally {
      setSchedulesSyncing(false);
    }
  };

  const getDaysLabel = (days: number[]) => {
    if (days.length === 7) return "Every day";
    return days
      .slice()
      .sort((a, b) => a - b)
      .map((day) => DAYS.find((d) => d.value === day)?.label)
      .filter(Boolean)
      .join(", ");
  };

  const selectedDeviceSchedules = schedules.filter(
    (s) => s.device === selectedDevice
  );

  // Draft values for settings dialog — apply on Save
  const [draftPumpOn, setDraftPumpOn] = useState<number>(pumpOnThreshold);
  const [draftPumpOff, setDraftPumpOff] = useState<number>(pumpOffThreshold);

  useEffect(() => {
    if (openSettingsDialog) {
      setDraftPumpOn(pumpOnThreshold);
      setDraftPumpOff(pumpOffThreshold);
      setDraftShortRunEnabled(pumpShortRunConditionEnabled);
      setDraftShortRunThreshold(pumpShortRunTriggerThreshold);
      setDraftShortRunDurationMinutes(pumpShortRunDurationMinutes);
    }
  }, [openSettingsDialog, pumpOnThreshold, pumpOffThreshold, pumpShortRunConditionEnabled, pumpShortRunTriggerThreshold, pumpShortRunDurationMinutes]);


  const thresholdsValid = (openSettingsDialog ? draftPumpOn < draftPumpOff : pumpOnThreshold < pumpOffThreshold);

  // ─── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-4 w-full min-w-0 flex flex-col min-h-0">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Welcome</h2>
          <p className="text-lg font-bold text-gray-900">
            {username ? `Hi, ${username}` : "Hi there"}
          </p>
        </div>
      </div>
      {/* Device Controls */}
      <div className="w-full min-w-0">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
            Device Controls
          </h2>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpenInfoDialog(true)}
              className="h-8 w-8 p-0"
            >
              <Info className="h-4 w-4" />
              <span className="sr-only">Help</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpenSettingsDialog(true)}
              className="h-8 w-8 p-0"
            >
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
          </div>
        </div>
        <div className="space-y-3 w-full min-w-0">
          {/* Pest Control */}
          <div className="w-full min-w-0">
            <ControlButton
              title="Pest Control"
              icon={Wind}
              showScheduleIcon
              onScheduleClick={() => openScheduleForDevice("pest")}
              isActive={humidifierActive}
                timerLabel={pestTimerLabel}
              onToggle={() => {
                const next = !humidifierActive;
                setHumidifierActive(next);
                setUserOverride((prev) => ({ ...prev, pest: true }));
                void (async () => {
                  if (hasBlynkConfig()) {
                    try {
                      await updateBlynkVirtualPin(BLYNK_PIN_PEST, next);
                    } catch (err) {
                      console.error("Failed to update Blynk pest pin.", err);
                      toast.error("Failed to update Blynk pest pin.");
                    }
                  }

                  if (hasScheduleBackendConfig()) {
                    try {
                      await setBackendHumidifierState(next);
                    } catch {
                      console.error("Failed to update pest state in Supabase.");
                      toast.error("Failed to update pest state in Supabase.");
                    }
                  }

                  await trackAudit({
                    event: "manual_switch",
                    device: "pest",
                    state: next,
                    details: `Pest Control manually turned ${next ? "ON" : "OFF"}`,
                  });
                })();
              }}
            />
          </div>

          {/* Water Pump */}
          <div className="w-full min-w-0">
            <ControlButton
              title="Water Pump"
              icon={Droplet}
              showScheduleIcon
              onScheduleClick={() => openScheduleForDevice("waterpump")}
              isActive={waterPumpActive}
                timerLabel={pumpTimerLabel}
              onToggle={() => {
                const next = !waterPumpActive;
                setWaterPumpActive(next);
                setUserOverride((prev) => ({ ...prev, waterpump: true }));
                void (async () => {
                  if (hasBlynkConfig()) {
                    try {
                      await updateBlynkVirtualPin(BLYNK_PIN_WATERPUMP, next);
                    } catch (err) {
                      console.error("Failed to update Blynk water pump pin.", err);
                      toast.error("Failed to update Blynk water pump pin.");
                    }
                  }

                  if (hasScheduleBackendConfig()) {
                    try {
                      await setBackendWaterPumpState(next);
                    } catch {
                      console.error("Failed to update pump state in Supabase.");
                      toast.error("Failed to update pump state in Supabase.");
                    }
                  }

                  await trackAudit({
                    event: "manual_switch",
                    device: "waterpump",
                    state: next,
                    details: `Water Pump manually turned ${next ? "ON" : "OFF"}`,
                  });
                })();
              }}
            />
          </div>
        </div>
      </div>

      {/* Active Schedules Summary */}
      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 w-full min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-blue-500 rounded-full" />
            <span className="text-xs text-gray-600">
              {schedules.length} Active Schedule{schedules.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Shows which source is currently in control */}
          <div className="flex items-center gap-1 text-xs text-gray-500">
            {humidifierActive || waterPumpActive ? "Devices Running" : "All Off"}
          </div>
        </div>
      </div>

      {/* Schedule Dialog */}
      <Dialog open={openScheduleDialog} onOpenChange={setOpenScheduleDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {editingScheduleId ? "Edit" : "Add"} Schedule —{" "}
              {selectedDevice === "pest" ? "Pest Control" : "Water Pump"}
            </DialogTitle>
            <DialogDescription>
              Create or update a scheduled watering or pest control task for the selected device.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Day selector */}
            <div>
              <Label className="text-sm mb-2 block">Select Days</Label>
              <div className="grid grid-cols-7 gap-2">
                {DAYS.map((day) => (
                  <button
                    key={day.value}
                    type="button"
                    onClick={() => toggleDay(day.value)}
                    className={`p-2 text-xs rounded-lg border-2 transition-colors ${
                      selectedDays.includes(day.value)
                        ? "bg-green-500 text-white border-green-500"
                        : "bg-white text-gray-600 border-gray-300 hover:border-green-400"
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Time pickers */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="schedule-start-time" className="text-sm mb-2 block">
                  Start Time
                </Label>
                <input
                  id="schedule-start-time"
                  type="time"
                  step={1}
                  value={selectedStartTime}
                  onChange={(e) => setSelectedStartTime(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <Label htmlFor="schedule-end-time" className="text-sm mb-2 block">
                  End Time
                </Label>
                <input
                  id="schedule-end-time"
                  type="time"
                  step={1}
                  value={selectedEndTime}
                  onChange={(e) => setSelectedEndTime(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>

            <Button
              onClick={handleAddOrEditSchedule}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {schedulesSyncing
                ? "Saving..."
                : editingScheduleId
                ? "Save Changes"
                : "Add Schedule"}
            </Button>

            {/* Existing schedules list */}
            <div>
              <Label className="text-sm mb-2 block">Existing Schedules</Label>
              {selectedDeviceSchedules.length === 0 ? (
                <p className="text-xs text-gray-500">No schedules added yet</p>
              ) : (
                <div className="space-y-2">
                  {selectedDeviceSchedules.map((schedule) => (
                    <div
                      key={schedule.id}
                      className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 py-2"
                    >
                      <div>
                        <div className="text-xs font-medium text-gray-900">
                          {schedule.startTime} – {schedule.endTime}
                        </div>
                        <div className="text-xs text-gray-600">
                          {getDaysLabel(schedule.days)}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditScheduleDialog(schedule)}
                          disabled={schedulesSyncing}
                          className="h-7 w-7 p-0"
                        >
                          <span className="sr-only">Edit</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 00-4-4l-8 8v3zm0 0v3a2 2 0 002 2h3"
                            />
                          </svg>
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteSchedule(schedule.id)}
                          disabled={schedulesSyncing}
                          className="h-7 w-7 p-0"
                        >
                          <Trash2 className="h-3.5 w-3.5 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={openSettingsDialog} onOpenChange={setOpenSettingsDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>
              Manage your automatic watering options and schedule behavior.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-sm mb-2 block">Automatic Watering</Label>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">Enable automatic watering</div>
                <Switch
                  checked={pumpAutoEnabled}
                  onCheckedChange={(val) => {
                    const enabled = Boolean(val);
                    setPumpAutoEnabled(enabled);
                    if (!enabled) {
                      (async () => {
                        setWaterPumpActive(false);
                        prevDesiredRef.current.waterpump = null;
                        if (hasBlynkConfig()) {
                          try {
                            await updateBlynkVirtualPin(BLYNK_PIN_WATERPUMP, false);
                          } catch (err) {
                            console.error("Failed to update Blynk water pump pin.", err);
                          }
                        }
                        if (hasScheduleBackendConfig()) {
                          try {
                            await setBackendWaterPumpState(false);
                          } catch (err) {
                            console.error("Failed to update pump state in Supabase.", err);
                          }
                        }
                      })();
                    }
                  }}
                />
              </div>
            </div>
            <div>
              <Label className="text-sm mb-2 block">Automatic Watering Thresholds</Label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-gray-600 mb-1">Trigger when moisture &lt;</div>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    step={1}
                    value={draftPumpOn}
                    onChange={(e) => setDraftPumpOn(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                    className={`w-full p-2 rounded-lg text-sm ${!thresholdsValid ? 'border-red-500' : 'border border-gray-300'}`}
                  />
                  <div className="text-xs text-gray-500">(percent)</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Stop when moisture &gt;</div>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    step={1}
                    value={draftPumpOff}
                    onChange={(e) => setDraftPumpOff(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                    className={`w-full p-2 rounded-lg text-sm ${!thresholdsValid ? 'border-red-500' : 'border border-gray-300'}`}
                  />
                  <div className="text-xs text-gray-500">(percent)</div>
                </div>
              </div>
              <div className="mt-4 border-t pt-4">
                <Label className="text-sm mb-2 block">Short-run schedule trigger</Label>
                  <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      id="short-run-enabled"
                      type="checkbox"
                      checked={draftShortRunEnabled}
                      onChange={(e) => setDraftShortRunEnabled(Boolean(e.target.checked))}
                    />
                    <label htmlFor="short-run-enabled" className="text-sm text-gray-700">Only trigger short-run when moisture ≥</label>
                  </div>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    step={1}
                    value={draftShortRunThreshold}
                    onChange={(e) => setDraftShortRunThreshold(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                    className="w-20 p-2 rounded-lg text-sm border border-gray-300"
                  />
                  <div className="text-xs text-gray-500">(percent)</div>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <label htmlFor="short-run-duration" className="text-sm text-gray-700">Short-run duration</label>
                  <input
                    id="short-run-duration"
                    type="number"
                    min={1}
                    max={120}
                    step={1}
                    value={draftShortRunDurationMinutes}
                    onChange={(e) => setDraftShortRunDurationMinutes(Math.max(1, Math.min(120, Number(e.target.value) || 1)))}
                    className="w-20 p-2 rounded-lg text-sm border border-gray-300"
                  />
                  <div className="text-xs text-gray-500">minutes</div>
                </div>
              </div>
              {!thresholdsValid && (
                <div className="text-xs text-red-600 mt-2">On threshold must be less than Off threshold.</div>
              )}
              <div className="flex gap-2 mt-3">
                <Button
                  onClick={() => {
                    // Cancel — discard drafts
                    setOpenSettingsDialog(false);
                  }}
                  variant="ghost"
                >
                  Cancel
                </Button>
                <Button
                  onClick={async () => {
                    if (!thresholdsValid) {
                      toast.error("Please fix thresholds before saving.");
                      return;
                    }

                    try {
                      setPumpOnThreshold(draftPumpOn);
                      setPumpOffThreshold(draftPumpOff);
                      setPumpShortRunConditionEnabled(draftShortRunEnabled);
                      setPumpShortRunTriggerThreshold(draftShortRunThreshold);
                      setPumpShortRunDurationMinutes(draftShortRunDurationMinutes);

                      if (!userId) {
                        throw new Error("User not authenticated");
                      }

                      await upsertUserPumpSettings({
                        id: userId,
                        pumpAutoEnabled,
                        pumpOnThreshold: draftPumpOn,
                        pumpOffThreshold: draftPumpOff,
                        shortRunConditionEnabled: draftShortRunEnabled,
                        shortRunTriggerThreshold: draftShortRunThreshold,
                        shortRunDurationMinutes: draftShortRunDurationMinutes,
                      });

                      toast.success("Settings saved.");
                    } catch (err) {
                      console.error("Failed to save pump settings", err);
                      toast.error("Failed to save settings.");
                    }
                    setOpenSettingsDialog(false);
                  }}
                  className="ml-auto bg-green-600 hover:bg-green-700"
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={openInfoDialog} onOpenChange={setOpenInfoDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Controls Help</DialogTitle>
            <DialogDescription>
              Learn how to use device controls, schedules, and automatic watering settings.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 text-sm text-gray-700">
            <div>
              <strong>Device Controls</strong> let you manually toggle the pest control and water pump.
              Click the schedule icon on each card to create or edit timed operations.
            </div>
            <div>
              <strong>Settings</strong> lets you enable or disable automatic watering and adjust activity thresholds.
              Use the input values to choose when the pump should turn on and off automatically.
            </div>
            <div>
              When automatic watering is enabled, the system follows your thresholds until you turn it off.
              Manual toggles still work, and the current state is reflected immediately in the control cards.
            </div>
            <div>
              <strong>Short run trigger</strong> starts when soil moisture is ≥ the trigger threshold and when a schedule is currently active.
              The duration setting controls how long the pump runs for these short bursts.
            </div>
            <div>
              <strong>Schedules</strong> let you set when pest control or the water pump should run automatically.
              Select days, start/end times, and the system will activate the selected device during that window.
            </div>
            <div>
              Save any changed settings with the Save button. Close the dialog to discard unsaved changes.
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              variant="secondary"
              onClick={() => setOpenInfoDialog(false)}
              className="bg-gray-100 text-gray-800 hover:bg-gray-200"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <PlantbotWidget />
    </div>
  );
}