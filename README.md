
  # Dashboard for Environmental Monitoring

  This is a code bundle for Dashboard for Environmental Monitoring. The original project is available at https://www.figma.com/design/BIoFtEuaIiCd0n8nRIW4qA/Dashboard-for-Environmental-Monitoring.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Optional configuration

  You can customize morning notification hours and rain forecast location with Vite env vars:

  - `VITE_MORNING_START_HOUR` (default: `6`)
  - `VITE_MORNING_END_HOUR` (default: `12`)
  - `VITE_WEATHER_LAT` (default: `14.5995`)
  - `VITE_WEATHER_LON` (default: `120.9842`)
  - `VITE_SUPABASE_URL` (default: `https://ppcwxgllgvqdgidbifky.supabase.co`)
  - `VITE_SUPABASE_KEY` (required, use your Supabase anon key)
  - `VITE_SUPABASE_DEVICE_ID` (default: `esp32-1`)
  - `VITE_SUPABASE_DEVICE_TABLE` (default: `device_state`)

  Example `.env`:

  ```
  VITE_MORNING_START_HOUR=6
  VITE_MORNING_END_HOUR=12
  VITE_WEATHER_LAT=14.5995
  VITE_WEATHER_LON=120.9842
  VITE_SUPABASE_URL=https://ppcwxgllgvqdgidbifky.supabase.co
  VITE_SUPABASE_KEY=your_supabase_anon_key
  VITE_SUPABASE_DEVICE_ID=esp32-1
  VITE_SUPABASE_DEVICE_TABLE=device_state
  ```

  ## Supabase device state

  Controls now read/write device states (pump/pest) to Supabase.

  - Client service: `src/app/services/backend.ts`
  - Table schema: `guidelines/supabase-schema.sql`

  ## Optional C++ backend

  A local C++ server scaffold still exists in `backend/cpp-server/` if you want a custom API layer between ESP32 and Supabase.
## Persistent Supabase scheduler

This repository now includes a standalone scheduler process that evaluates `device_schedules` and writes the desired pump/pest state to `device_state`.

### Supabase Edge Function

A new Supabase Edge Function is available at `supabase/functions/scheduler/index.ts`.

1. Install and login to the Supabase CLI.
2. Deploy the function:

```bash
supabase functions deploy scheduler
```

3. Add a schedule in the Supabase dashboard:

- Go to `Functions` → `scheduler` → `Schedules`
- Use a cron expression like:
  - `* * * * *` (every minute)
  - `*/5 * * * *` (every 5 minutes)
  - `0 1 * * *` (daily at 1am)

### Environment variables

Set these variables for the function in Supabase:

```bash
SUPABASE_URL=https://your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_DEVICE_ID=esp32-1
SUPABASE_DEVICE_TABLE=device_state
SUPABASE_SCHEDULE_TABLE=device_schedules
```

If you prefer a local fallback, you can still run the existing scheduler process with:

```bash
npm run scheduler
```

This scheduler can run on any server or cloud instance to keep Supabase-driven automation working even when the browser is closed.  