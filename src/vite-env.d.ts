/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MORNING_START_HOUR?: string;
  readonly VITE_MORNING_END_HOUR?: string;
  readonly VITE_WEATHER_LAT?: string;
  readonly VITE_WEATHER_LON?: string;
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_KEY?: string;
  readonly VITE_SUPABASE_DEVICE_ID?: string;
  readonly VITE_SUPABASE_DEVICE_TABLE?: string;
  readonly VITE_SUPABASE_SCHEDULE_TABLE?: string;
  readonly VITE_SUPABASE_SENSOR_TABLE?: string; 
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
