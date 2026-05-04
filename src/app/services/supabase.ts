import { createClient } from "@supabase/supabase-js";

const env = import.meta.env;

const SUPABASE_URL = (env.VITE_SUPABASE_URL ?? "").trim();
const SUPABASE_KEY = (env.VITE_SUPABASE_KEY ?? "").trim();

export const hasSupabaseConfig = () => Boolean(SUPABASE_URL && SUPABASE_KEY);

export const supabase = hasSupabaseConfig()
  ? createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;
