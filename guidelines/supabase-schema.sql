-- GreenPulse full Supabase schema
-- Safe to run on a fresh project or re-run (idempotent where practical).

begin;


create table if not exists public.device_state (
	device_id text primary key,
	waterpump_on boolean not null default false,
	pest_on boolean not null default false,
	updated_at timestamptz not null default now()
);

alter table if exists public.device_state
	add column if not exists waterpump_on boolean not null default false;

alter table if exists public.device_state
	add column if not exists pest_on boolean not null default false;

alter table if exists public.device_state
	add column if not exists light int;

alter table if exists public.device_state
	add column if not exists soil_moisture int;

create or replace function public.set_device_state_updated_at()
returns trigger
language plpgsql
as $$
begin
	new.updated_at = now();
	return new;
end;
$$;

drop trigger if exists trg_device_state_set_updated_at on public.device_state;
create trigger trg_device_state_set_updated_at
before update on public.device_state
for each row
execute function public.set_device_state_updated_at();

create table if not exists public.sensor_logs (
	id bigint generated always as identity primary key,
	device_id text not null,
	light int,
	moisture int,
	waterpump smallint not null default 0,
	pest smallint not null default 0,
	created_at timestamptz not null default now(),
	constraint sensor_logs_light_range check (light is null or (light >= 0 and light <= 200000)),
	constraint sensor_logs_moisture_range check (moisture is null or (moisture >= 0 and moisture <= 100)),
	constraint sensor_logs_waterpump_flag check (waterpump in (0, 1)),
	constraint sensor_logs_pest_flag check (pest in (0, 1))
);

create table if not exists public.device_schedules (
	id bigint generated always as identity primary key,
	device_id text not null,
	device text not null,
	
	days smallint[] not null,
	start_time time not null,
	end_time time not null,
	timezone text not null default 'Asia/Manila',
	enabled boolean not null default true,
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now(),
	constraint device_schedules_device_check check (device in ('pest', 'waterpump')),
	constraint device_schedules_days_len_check check (cardinality(days) >= 1 and cardinality(days) <= 7),
	constraint device_schedules_days_range_check check (days <@ array[0,1,2,3,4,5,6]::smallint[]),
	constraint device_schedules_days_no_null_check check (array_position(days, null) is null),
	constraint device_schedules_time_window_check check (start_time <> end_time)
);

create table if not exists public.audit_logs (
	id bigint generated always as identity primary key,
	user_id uuid,
	username text,
	event text not null,
	device text,
	state boolean,
	details text,
	created_at timestamptz not null default now(),
	constraint audit_logs_device_check check (device is null or device in ('pest', 'waterpump'))
);

create index if not exists audit_logs_created_idx
on public.audit_logs (created_at desc);

create table if not exists public.user_profiles (
	id uuid primary key references auth.users(id) on delete cascade,
	username text,
	email text,
	approved boolean not null default false,
	role text not null default 'user',
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

create or replace function public.set_user_profiles_updated_at()
returns trigger
language plpgsql
as $$
begin
	new.updated_at = now();
	return new;
end;
$$;

drop trigger if exists trg_user_profiles_set_updated_at on public.user_profiles;
create trigger trg_user_profiles_set_updated_at
before update on public.user_profiles
for each row
execute function public.set_user_profiles_updated_at();

create table if not exists public.user_pump_settings (
	id uuid primary key references auth.users(id) on delete cascade,
	pump_auto_enabled boolean not null default true,
	pump_on_threshold smallint not null default 60 check (pump_on_threshold >= 0 and pump_on_threshold <= 100),
	pump_off_threshold smallint not null default 70 check (pump_off_threshold >= 0 and pump_off_threshold <= 100),
	short_run_condition_enabled boolean not null default false,
	short_run_trigger_threshold smallint not null default 0 check (short_run_trigger_threshold >= 0 and short_run_trigger_threshold <= 100),
	short_run_duration_minutes smallint not null default 5 check (short_run_duration_minutes >= 1 and short_run_duration_minutes <= 120),
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now(),
	constraint pump_threshold_order check (pump_on_threshold < pump_off_threshold)
);

create or replace function public.set_user_pump_settings_updated_at()
returns trigger
language plpgsql
as $$
begin
	new.updated_at = now();
	return new;
end;
$$;

drop trigger if exists trg_user_pump_settings_set_updated_at on public.user_pump_settings;
create trigger trg_user_pump_settings_set_updated_at
before update on public.user_pump_settings
for each row
execute function public.set_user_pump_settings_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
	select exists (
		select 1 from public.user_profiles
		where id = auth.uid() and role = 'admin' and approved = true
	);
$$;

create or replace function public.get_email_for_username(username_input text)
returns text
language sql
security definer
set search_path = public
as $$
	select email
	from public.user_profiles
	where lower(username) = lower(username_input)
	limit 1;
$$;

create or replace function public.is_username_taken(username_input text)
returns boolean
language sql
security definer
set search_path = public
as $$
	select exists (
		select 1
		from public.user_profiles
		where lower(username) = lower(username_input)
	);
$$;



create index if not exists sensor_logs_device_created_idx
on public.sensor_logs (device_id, created_at desc);

create index if not exists sensor_logs_created_idx
on public.sensor_logs (created_at desc);

create index if not exists device_schedules_device_target_enabled_idx
on public.device_schedules (device_id, device, enabled);

create index if not exists device_schedules_device_idx
on public.device_schedules (device_id);

create index if not exists user_profiles_username_idx
on public.user_profiles (lower(username));

create unique index if not exists user_profiles_username_unique
on public.user_profiles (lower(username))
where username is not null;



grant usage on schema public to anon, authenticated;

grant execute on function public.get_email_for_username(text) to anon, authenticated;
grant execute on function public.is_username_taken(text) to anon, authenticated;

grant select, insert, update on public.device_state to anon, authenticated;
grant select, insert on public.sensor_logs to anon, authenticated;
grant select, insert, update, delete on public.device_schedules to anon, authenticated;
grant select, insert, update, delete on public.user_profiles to anon, authenticated;
grant select, insert, update, delete on public.user_pump_settings to authenticated;
grant select, insert on public.audit_logs to authenticated;

grant usage, select on sequence public.sensor_logs_id_seq to anon, authenticated;
grant usage, select on sequence public.device_schedules_id_seq to anon, authenticated;
grant usage, select on sequence public.audit_logs_id_seq to authenticated;



alter table public.device_state enable row level security;
alter table public.sensor_logs enable row level security;
alter table public.device_schedules enable row level security;
alter table public.audit_logs enable row level security;
alter table public.user_profiles enable row level security;
alter table public.user_pump_settings enable row level security;

drop policy if exists "audit_logs_read" on public.audit_logs;
create policy "audit_logs_read"
on public.audit_logs
for select
to authenticated
using (public.is_admin());

drop policy if exists "audit_logs_insert" on public.audit_logs;
create policy "audit_logs_insert"
on public.audit_logs
for insert
to authenticated
with check (true);

drop policy if exists "device_state_read" on public.device_state;
create policy "device_state_read"
on public.device_state
for select
to anon, authenticated
using (true);

drop policy if exists "device_state_insert" on public.device_state;
create policy "device_state_insert"
on public.device_state
for insert
to anon, authenticated
with check (true);

drop policy if exists "device_state_update" on public.device_state;
create policy "device_state_update"
on public.device_state
for update
to anon, authenticated
using (true)
with check (true);

drop policy if exists "sensor_logs_read" on public.sensor_logs;
create policy "sensor_logs_read"
on public.sensor_logs
for select
to anon, authenticated
using (true);

drop policy if exists "sensor_logs_insert" on public.sensor_logs;
create policy "sensor_logs_insert"
on public.sensor_logs
for insert
to anon, authenticated
with check (true);

drop policy if exists "device_schedules_read" on public.device_schedules;
create policy "device_schedules_read"
on public.device_schedules
for select
to anon, authenticated
using (true);

drop policy if exists "device_schedules_insert" on public.device_schedules;
create policy "device_schedules_insert"
on public.device_schedules
for insert
to anon, authenticated
with check (true);

drop policy if exists "device_schedules_update" on public.device_schedules;
create policy "device_schedules_update"
on public.device_schedules
for update
to anon, authenticated
using (true)
with check (true);

drop policy if exists "device_schedules_delete" on public.device_schedules;
create policy "device_schedules_delete"
on public.device_schedules
for delete
to anon, authenticated
using (true);

drop policy if exists "user_profiles_select" on public.user_profiles;
create policy "user_profiles_select"
on public.user_profiles
for select
to anon, authenticated
using (auth.uid() = id or public.is_admin());

drop policy if exists "user_profiles_insert" on public.user_profiles;
create policy "user_profiles_insert"
on public.user_profiles
for insert
to anon, authenticated
with check (auth.uid() = id);

drop policy if exists "user_profiles_update" on public.user_profiles;
create policy "user_profiles_update"
on public.user_profiles
for update
to anon, authenticated
using (auth.uid() = id or public.is_admin())
with check (auth.uid() = id or public.is_admin());

drop policy if exists "user_profiles_delete" on public.user_profiles;
create policy "user_profiles_delete"
on public.user_profiles
for delete
to anon, authenticated
using (public.is_admin());

drop policy if exists "user_pump_settings_select" on public.user_pump_settings;
create policy "user_pump_settings_select"
on public.user_pump_settings
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "user_pump_settings_insert" on public.user_pump_settings;
create policy "user_pump_settings_insert"
on public.user_pump_settings
for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "user_pump_settings_update" on public.user_pump_settings;
create policy "user_pump_settings_update"
on public.user_pump_settings
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "user_pump_settings_delete" on public.user_pump_settings;
create policy "user_pump_settings_delete"
on public.user_pump_settings
for delete
to authenticated
using (auth.uid() = id);


-- device_state needs extra_data JSON storage
alter table if exists public.device_state
  add column if not exists extra_data jsonb not null default '{}'::jsonb;

-- dashboard widget metadata
create table if not exists public.dashboard_sensors (
  id bigint generated always as identity primary key,
  device_id text not null,
  key text not null,
  name text not null,
  sensor_type text not null default 'light',
  unit text not null,
  icon text not null,
  icon_color text not null,
  created_at timestamptz not null default now()
);

alter table if exists public.dashboard_sensors
  add column if not exists sensor_type text not null default 'light';

alter table if exists public.dashboard_sensors
  drop constraint if exists dashboard_sensors_type_check;

alter table if exists public.dashboard_sensors
  add constraint dashboard_sensors_type_check check (sensor_type in ('light','soil_moisture'));

create index if not exists dashboard_sensors_device_idx
  on public.dashboard_sensors (device_id);

create unique index if not exists dashboard_sensors_key_unique
  on public.dashboard_sensors (device_id, key);

grant select, insert, update, delete on public.dashboard_sensors
  to anon, authenticated;

alter table if exists public.dashboard_sensors
  enable row level security;

drop policy if exists "dashboard_sensors_read" on public.dashboard_sensors;
create policy dashboard_sensors_read
  on public.dashboard_sensors
  for select
  to authenticated
  using (true);

drop policy if exists "dashboard_sensors_insert" on public.dashboard_sensors;
create policy dashboard_sensors_insert
  on public.dashboard_sensors
  for insert
  to authenticated
  with check (true);

drop policy if exists "dashboard_sensors_update" on public.dashboard_sensors;
create policy dashboard_sensors_update
  on public.dashboard_sensors
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "dashboard_sensors_delete" on public.dashboard_sensors;
create policy dashboard_sensors_delete
  on public.dashboard_sensors
  for delete
  to authenticated
  using (true);

-- dashboard sensor history logs
create table if not exists public.dashboard_sensor_logs (
  id bigint generated always as identity primary key,
  dashboard_sensor_id bigint not null references public.dashboard_sensors(id) on delete cascade,
  device_id text not null,
  value numeric not null,
  created_at timestamptz not null default now()
);

create index if not exists dashboard_sensor_logs_sensor_idx
  on public.dashboard_sensor_logs (dashboard_sensor_id);

grant select, insert on public.dashboard_sensor_logs
  to anon, authenticated;

alter table if exists public.dashboard_sensor_logs
  enable row level security;

drop policy if exists "dashboard_sensor_logs_read" on public.dashboard_sensor_logs;
create policy dashboard_sensor_logs_read
  on public.dashboard_sensor_logs
  for select
  to authenticated
  using (true);

drop policy if exists "dashboard_sensor_logs_insert" on public.dashboard_sensor_logs;
create policy dashboard_sensor_logs_insert
  on public.dashboard_sensor_logs
  for insert
  to authenticated
  with check (true);
commit;
