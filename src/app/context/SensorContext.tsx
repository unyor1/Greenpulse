import { createContext, useContext, useState, useEffect, ReactNode, SetStateAction } from "react";
import { useLocation } from "react-router-dom";
import { getBackendSensorData, getUserPumpSettings, getDashboardSensors, getDashboardSensorLogs, DashboardSensorConfig } from "../services/backend";
import { getCurrentUserProfile } from "../services/auth";
import { toast } from "sonner";

const env = ((import.meta as any).env ?? {}) as Record<string, string | undefined>;
const DEFAULT_WEATHER_LAT = Number(env.VITE_WEATHER_LAT ?? 14.5176);
const DEFAULT_WEATHER_LON = Number(env.VITE_WEATHER_LON ?? 121.0509);
const WEATHER_LOCATION_STORAGE_KEY = "gp_weather_location";
const PUMP_ON_THRESHOLD_STORAGE_KEY = "gp_pump_on_threshold";
const PUMP_OFF_THRESHOLD_STORAGE_KEY = "gp_pump_off_threshold";
const PUMP_AUTO_ENABLED_STORAGE_KEY = "gp_pump_auto_enabled";
const PUMP_SHORT_RUN_CONDITION_ENABLED_STORAGE_KEY = "gp_pump_short_run_condition_enabled";
const PUMP_SHORT_RUN_TRIGGER_THRESHOLD_STORAGE_KEY = "gp_pump_short_run_trigger_threshold";
const PUMP_SHORT_RUN_DURATION_STORAGE_KEY = "pump_short_run_duration_minutes";
const DEFAULT_PUMP_ON_THRESHOLD = 60;
const DEFAULT_PUMP_OFF_THRESHOLD = 70;
const DEFAULT_PUMP_AUTO_ENABLED = true;
const DEFAULT_PUMP_SHORT_RUN_ENABLED = false;
const DEFAULT_PUMP_SHORT_RUN_THRESHOLD = 0;
const DEFAULT_PUMP_SHORT_RUN_MINUTES = 5;
const LIGHT_NOTIFICATION_START_HOUR = 7;
const LIGHT_NOTIFICATION_END_HOUR = 16;
const LIGHT_MAX_LUX = 1000; // used to convert lux to percentage

interface SensorData {
  timestamp: number;
  lightIntensity: number;
  soilMoisture: number;
}

interface WeatherLocation {
  name: string;
  lat: number;
  lon: number;
}

type PumpUserOverrideState = Record<"pest" | "waterpump", boolean>;

interface SensorContextType {
  lightIntensity: number;
  soilMoisture: number;
  weatherLocation: WeatherLocation;
  setWeatherLocation: (location: WeatherLocation) => void;
  humidifierActive: boolean;
  waterPumpActive: boolean;
  setHumidifierActive: (active: boolean) => void;
  setWaterPumpActive: (active: boolean) => void;
  historicalData: SensorData[];
  pumpOnThreshold: number;
  pumpOffThreshold: number;
  setPumpOnThreshold: (v: number) => void;
  setPumpOffThreshold: (v: number) => void;
  pumpAutoEnabled: boolean;
  setPumpAutoEnabled: (active: boolean) => void;
  pumpShortRunConditionEnabled: boolean;
  setPumpShortRunConditionEnabled: (enabled: boolean) => void;
  pumpShortRunTriggerThreshold: number;
  setPumpShortRunTriggerThreshold: (value: number) => void;
  pumpShortRunDurationMinutes: number;
  setPumpShortRunDurationMinutes: (value: number) => void;
  pumpSettingsLoaded: boolean;
  userOverride: PumpUserOverrideState;
  setUserOverride: React.Dispatch<SetStateAction<PumpUserOverrideState>>;
  getLightStatus: (intensity: number) => "good" | "warning" | "critical";
  getMoistureStatus: (moisture: number) => "good" | "warning" | "critical";
  mergedHistoricalData: SensorData[];
}

const SensorContext = createContext<SensorContextType | undefined>(undefined);

export function SensorProvider({ children }: { children: ReactNode }) {
  const location = useLocation();

  const parseCoordinate = (value: number, min: number, max: number, fallback: number) => {
    if (!Number.isFinite(value)) return fallback;
    return Math.max(min, Math.min(max, value));
  };

  const getInitialWeatherLocation = (): WeatherLocation => {
    const fallback: WeatherLocation = {
      name: "Taguig City",
      lat: parseCoordinate(DEFAULT_WEATHER_LAT, -90, 90, 14.5176),
      lon: parseCoordinate(DEFAULT_WEATHER_LON, -180, 180, 121.0509),
    };

    if (typeof window === "undefined") {
      return fallback;
    }

    const raw = window.localStorage.getItem(WEATHER_LOCATION_STORAGE_KEY);
    if (!raw) {
      return fallback;
    }

    const sanitizeName = (input?: unknown) => {
      if (typeof input !== "string") return fallback.name;
      const parts = input.split(",").map((p) => p.trim()).filter(Boolean);
      if (parts.length >= 2 && parts[0] === parts[1]) {
        return parts[0];
      }
      return input.trim() || fallback.name;
    };

    try {
      const parsed = JSON.parse(raw) as Partial<WeatherLocation>;
      const lat = parseCoordinate(Number(parsed.lat), -90, 90, fallback.lat);
      const lon = parseCoordinate(Number(parsed.lon), -180, 180, fallback.lon);
      const name = sanitizeName(parsed.name);
      return { name, lat, lon };
    } catch {
      return fallback;
    }
  };

  const [lightIntensity, setLightIntensity] = useState(750);
  const [soilMoisture, setSoilMoisture] = useState(65);
  const [pumpOnThreshold, setPumpOnThreshold] = useState<number>(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(PUMP_ON_THRESHOLD_STORAGE_KEY) : null;
      return raw === null ? DEFAULT_PUMP_ON_THRESHOLD : Number(raw ?? DEFAULT_PUMP_ON_THRESHOLD);
    } catch {
      return DEFAULT_PUMP_ON_THRESHOLD;
    }
  });
  const [pumpOffThreshold, setPumpOffThreshold] = useState<number>(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(PUMP_OFF_THRESHOLD_STORAGE_KEY) : null;
      return raw === null ? DEFAULT_PUMP_OFF_THRESHOLD : Number(raw ?? DEFAULT_PUMP_OFF_THRESHOLD);
    } catch {
      return DEFAULT_PUMP_OFF_THRESHOLD;
    }
  });
  const [weatherLocation, setWeatherLocationState] = useState<WeatherLocation>(() =>
    getInitialWeatherLocation()
  );
  const [humidifierActive, setHumidifierActive] = useState(false);
  const [waterPumpActive, setWaterPumpActive] = useState(false);
  const [pumpAutoEnabled, setPumpAutoEnabled] = useState<boolean>(() => {
    try {
      const stored = typeof window !== "undefined" ? window.localStorage.getItem(PUMP_AUTO_ENABLED_STORAGE_KEY) : null;
      return stored === null ? DEFAULT_PUMP_AUTO_ENABLED : stored === "true";
    } catch {
      return DEFAULT_PUMP_AUTO_ENABLED;
    }
  });
  const [pumpShortRunConditionEnabled, setPumpShortRunConditionEnabled] = useState<boolean>(() => {
    try {
      const stored = typeof window !== "undefined" ? window.localStorage.getItem(PUMP_SHORT_RUN_CONDITION_ENABLED_STORAGE_KEY) : null;
      return stored === null ? DEFAULT_PUMP_SHORT_RUN_ENABLED : stored === "true";
    } catch {
      return DEFAULT_PUMP_SHORT_RUN_ENABLED;
    }
  });
  const [pumpShortRunTriggerThreshold, setPumpShortRunTriggerThreshold] = useState<number>(() => {
    try {
      const stored = typeof window !== "undefined" ? window.localStorage.getItem(PUMP_SHORT_RUN_TRIGGER_THRESHOLD_STORAGE_KEY) : null;
      return stored === null ? DEFAULT_PUMP_SHORT_RUN_THRESHOLD : Number(stored);
    } catch {
      return DEFAULT_PUMP_SHORT_RUN_THRESHOLD;
    }
  });
  const [pumpShortRunDurationMinutes, setPumpShortRunDurationMinutes] = useState<number>(() => {
    try {
      const stored = typeof window !== "undefined" ? window.localStorage.getItem(PUMP_SHORT_RUN_DURATION_STORAGE_KEY) : null;
      return stored === null ? DEFAULT_PUMP_SHORT_RUN_MINUTES : Number(stored);
    } catch {
      return DEFAULT_PUMP_SHORT_RUN_MINUTES;
    }
  });
  const [userOverride, setUserOverride] = useState<PumpUserOverrideState>({ pest: false, waterpump: false });
  const [historicalData, setHistoricalData] = useState<SensorData[]>([]);
  const [mergedHistoricalData, setMergedHistoricalData] = useState<SensorData[]>([]);
  const [pumpSettingsLoaded, setPumpSettingsLoaded] = useState(false);
  const [notificationState, setNotificationState] = useState<{
    dateKey?: string;
    lightNotified: boolean;
  }>({
    dateKey: undefined,
    lightNotified: false,
  });

  const getLightStatus = (intensity: number): "good" | "warning" | "critical" => {
    if (intensity <= 30) return "critical";
    if (intensity >= 60) return "good";
    if (intensity >= 40 && intensity <= 50) return "warning";
    return "warning";
  };

  const getMoistureStatus = (moisture: number): "good" | "warning" | "critical" => {
    if (moisture < pumpOnThreshold) return "critical";
    if (moisture > pumpOffThreshold) return "warning";
    return "good";
  };

  const setWeatherLocation = (location: WeatherLocation) => {
    const sanitizeName = (input?: string) => {
      if (!input) return "Custom Location";
      const parts = input.split(",").map((p) => p.trim()).filter(Boolean);
      if (parts.length >= 2 && parts[0] === parts[1]) return parts[0];
      return input.trim() || "Custom Location";
    };

    setWeatherLocationState({
      name: sanitizeName(location.name),
      lat: parseCoordinate(location.lat, -90, 90, DEFAULT_WEATHER_LAT),
      lon: parseCoordinate(location.lon, -180, 180, DEFAULT_WEATHER_LON),
    });
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(WEATHER_LOCATION_STORAGE_KEY, JSON.stringify(weatherLocation));
  }, [weatherLocation]);

  // Persist pump threshold settings locally as fallback
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(PUMP_ON_THRESHOLD_STORAGE_KEY, String(pumpOnThreshold));
        window.localStorage.setItem(PUMP_OFF_THRESHOLD_STORAGE_KEY, String(pumpOffThreshold));
      }
    } catch {}
  }, [pumpOnThreshold, pumpOffThreshold]);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(PUMP_AUTO_ENABLED_STORAGE_KEY, String(pumpAutoEnabled));
        window.localStorage.setItem(PUMP_SHORT_RUN_CONDITION_ENABLED_STORAGE_KEY, String(pumpShortRunConditionEnabled));
        window.localStorage.setItem(PUMP_SHORT_RUN_TRIGGER_THRESHOLD_STORAGE_KEY, String(pumpShortRunTriggerThreshold));
        window.localStorage.setItem(PUMP_SHORT_RUN_DURATION_STORAGE_KEY, String(pumpShortRunDurationMinutes));
      }
    } catch {}
  }, [pumpAutoEnabled, pumpShortRunConditionEnabled, pumpShortRunTriggerThreshold, pumpShortRunDurationMinutes]);

  // Load authenticated user pump settings from Supabase when auth state or route changes
  useEffect(() => {
    let cancelled = false;

    const loadUserPumpSettings = async () => {
      try {
        const profile = await getCurrentUserProfile();
        if (!profile) {
          if (!cancelled) {
            setPumpSettingsLoaded(true);
          }
          return;
        }
        if (cancelled) return;

        const settings = await getUserPumpSettings(profile.id);
        if (!settings || cancelled) {
          setPumpSettingsLoaded(true);
          return;
        }

        setPumpAutoEnabled(settings.pumpAutoEnabled);
        setPumpOnThreshold(settings.pumpOnThreshold);
        setPumpOffThreshold(settings.pumpOffThreshold);
        setPumpShortRunConditionEnabled(settings.shortRunConditionEnabled);
        setPumpShortRunTriggerThreshold(settings.shortRunTriggerThreshold);
        setPumpShortRunDurationMinutes(settings.shortRunDurationMinutes);
        setPumpSettingsLoaded(true);
      } catch (err) {
        console.error("Failed to load user pump settings", err);
        setPumpSettingsLoaded(true);
      }
    };

    void loadUserPumpSettings();
    return () => {
      cancelled = true;
    };
  }, [location.pathname]);

  // Simulate real-time sensor updates
  useEffect(() => {
    let isMounted = true;
    const fetchSensor = async () => {
      try {
        const { light, soilMoisture } = await getBackendSensorData();
        if (isMounted) {
          setLightIntensity(light);
          setSoilMoisture(soilMoisture);
        }
      } catch (err) {
        // Optionally handle error (e.g., show toast)
      }
    };
    fetchSensor();
    const interval = setInterval(fetchSensor, 2000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Store historical data every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setHistoricalData((prev) => {
        const newData = {
          timestamp: Date.now(),
          lightIntensity: lightIntensity,
          soilMoisture: Math.round(soilMoisture),
        };
        // Keep only last 50 data points
        const updated = [...prev, newData];
        return updated.slice(-50);
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [lightIntensity, soilMoisture]);

  // Fetch managed dashboard sensors and logs and merge into historical timeline
  useEffect(() => {
    let isMounted = true;

    const findNearestSample = (ts: number) => {
      if (historicalData.length === 0) return null;
      let nearest = historicalData[0];
      let bestDiff = Math.abs(nearest.timestamp - ts);
      for (let i = 1; i < historicalData.length; i++) {
        const diff = Math.abs(historicalData[i].timestamp - ts);
        if (diff < bestDiff) {
          bestDiff = diff;
          nearest = historicalData[i];
        }
      }
      return nearest;
    };

    const loadManaged = async () => {
      try {
        const sensors = await getDashboardSensors();
        if (!isMounted) return;

        const entries = await Promise.all(
          sensors.map(async (sensor: DashboardSensorConfig) => {
            const rows = await getDashboardSensorLogs(sensor.id, 200);
            return rows.map((r) => ({ sensor, row: r }));
          })
        );

        if (!isMounted) return;

        const flat = entries.flat();
        const converted: SensorData[] = flat.map(({ sensor, row }) => {
          const ts = new Date(row.createdAt).getTime();
          const nearest = findNearestSample(ts);
          if (sensor.sensorType === "soil_moisture") {
            return {
              timestamp: ts,
              soilMoisture: Number(row.value),
              lightIntensity: nearest ? nearest.lightIntensity : lightIntensity,
            } as SensorData;
          }
          // assume light
          return {
            timestamp: ts,
            lightIntensity: Number(row.value),
            soilMoisture: nearest ? nearest.soilMoisture : soilMoisture,
          } as SensorData;
        });

        // Merge historicalData and converted entries by timestamp
        const map = new Map<number, SensorData>();
        historicalData.forEach((h) => map.set(h.timestamp, { ...h }));
        converted.forEach((c) => {
          const existing = map.get(c.timestamp);
          if (!existing) {
            map.set(c.timestamp, { ...c });
          } else {
            map.set(c.timestamp, {
              timestamp: c.timestamp,
              lightIntensity: c.lightIntensity ?? existing.lightIntensity,
              soilMoisture: c.soilMoisture ?? existing.soilMoisture,
            });
          }
        });

        const merged = Array.from(map.values()).sort((a, b) => a.timestamp - b.timestamp);
        if (isMounted) setMergedHistoricalData(merged);
      } catch (err) {
        // swallow; not critical
        console.error("Failed to load managed sensor logs:", err);
      }
    };

    // initial load and interval
    void loadManaged();
    const interval = setInterval(loadManaged, 30_000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [historicalData, lightIntensity, soilMoisture]);

  // Light intensity notifications (7am - 4pm only)
  useEffect(() => {
    // Don't show notifications on the landing, login, register, forgot, or reset pages
    if (["/", "/login", "/register", "/forgot", "/auth/reset"].includes(location.pathname)) {
      return;
    }

    const now = new Date();
    const hour = now.getHours();
    const isWithinWindow =
      hour >= LIGHT_NOTIFICATION_START_HOUR && hour < LIGHT_NOTIFICATION_END_HOUR;
    const dateKey = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0"),
    ].join("-");

    setNotificationState((prev) => {
      const isNewDay = prev.dateKey !== dateKey;
      const currentState = isNewDay ? { dateKey, lightNotified: false } : prev;

      if (!isWithinWindow) {
        return currentState;
      }

      if (!currentState.lightNotified) {
        const lightPercent = Math.round((lightIntensity / LIGHT_MAX_LUX) * 100);
        if (lightPercent < 30) {
          toast.warning("Light Intensity Alert", {
            description: `Light intensity is ${lightPercent}%. Ensure plants get enough light between 7am and 4pm.`,
          });
          return { ...currentState, lightNotified: true };
        }
      }

      return currentState;
    });
  }, [lightIntensity, location.pathname]);

  return (
    <SensorContext.Provider
      value={{
        lightIntensity,
        soilMoisture,
        weatherLocation,
        setWeatherLocation,
        humidifierActive,
        waterPumpActive,
        setHumidifierActive,
        setWaterPumpActive,
        historicalData,
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
        getLightStatus,
        getMoistureStatus,
        mergedHistoricalData,
      }}
    >
      {children}
    </SensorContext.Provider>
  );
}

export function useSensor() {
  const context = useContext(SensorContext);
  if (context === undefined) {
    throw new Error("useSensor must be used within a SensorProvider");
  }
  return context;
}
