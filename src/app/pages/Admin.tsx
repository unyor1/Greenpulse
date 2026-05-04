import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRightLeft, Leaf, LogOut, Shield, Users } from "lucide-react";
import { getCurrentUserProfile, signOutUser, getUsersByRole } from "../services/auth";
import {
  getBackendSchedules,
  getAuditLogs,
  getDashboardSensors,
  createDashboardSensor,
  deleteDashboardSensor,
  DashboardSensorConfig,
} from "../services/backend";
import type { AuditLogEntry } from "../services/backend";
import { toast } from "sonner";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// stat card values will be loaded dynamically

export function Admin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [scheduleCount, setScheduleCount] = useState<number | null>(null);
  const [teamUserCount, setTeamUserCount] = useState<number | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditError, setAuditError] = useState("");
  const [auditDeviceFilter, setAuditDeviceFilter] = useState<"all" | "waterpump" | "pest" | "login">("all");
  const [auditDateFilter, setAuditDateFilter] = useState("");

  const [dashboardSensors, setDashboardSensors] = useState<DashboardSensorConfig[]>([]);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [sensorName, setSensorName] = useState("");
  const [sensorKey, setSensorKey] = useState("");
  const [sensorType, setSensorType] = useState<"light" | "soil_moisture">("light");

  const loadDashboardSensors = async () => {
    setDashboardLoading(true);
    try {
      const sensors = await getDashboardSensors();
      setDashboardSensors(sensors);
    } catch (err) {
      console.error("Unable to load dashboard sensors", err);
      setDashboardSensors([]);
    } finally {
      setDashboardLoading(false);
    }
  };

  const handleAddSensor = async () => {
    const trimmedName = sensorName.trim();
    const trimmedKey = sensorKey.trim();

    if (!trimmedName || !trimmedKey) {
      toast.error("Sensor nickname and database identifier are required.");
      return;
    }

    try {
      await createDashboardSensor({
        name: trimmedName,
        key: trimmedKey,
        sensorType,
      });
      toast.success("Sensor added successfully.");
      setSensorName("");
      setSensorKey("");
      setSensorType("light");
      await loadDashboardSensors();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to add sensor.";
      toast.error(message);
    }
  };

  const handleDeleteSensor = async (id: string) => {
    try {
      await deleteDashboardSensor(id);
      toast.success("Sensor removed successfully.");
      await loadDashboardSensors();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to remove sensor.";
      toast.error(message);
    }
  };

  useEffect(() => {
    let cancelled = false;
    const loadProfile = async () => {
      const profile = await getCurrentUserProfile();
      if (!cancelled && profile?.username) {
        setUsername(profile.username);
      }
    };
    void loadProfile();
    return () => {
      cancelled = true;
    };
  }, []);

  // Load counts for schedules and users with role 'user'
  useEffect(() => {
    let cancelled = false;
    const loadCounts = async () => {
      try {
        const schedules = await getBackendSchedules().catch(() => []);
        if (!cancelled) setScheduleCount(Array.isArray(schedules) ? schedules.length : 0);
      } catch {
        if (!cancelled) setScheduleCount(0);
      }

      try {
        const users = await getUsersByRole("user").catch(() => []);
        if (!cancelled) setTeamUserCount(Array.isArray(users) ? users.length : 0);
      } catch {
        if (!cancelled) setTeamUserCount(0);
      }
    };
    void loadCounts();
    return () => { cancelled = true; };
  }, []);

  // Load recent audit logs for admin review
  useEffect(() => {
    let cancelled = false;
    const loadAudit = async () => {
      setAuditLoading(true);
      setAuditError("");
      try {
        const audits = await getAuditLogs(20);
        if (cancelled) return;
        setAuditLogs(Array.isArray(audits) ? audits : []);
      } catch {
        if (!cancelled) setAuditError("Unable to load audit logs.");
      } finally {
        if (!cancelled) setAuditLoading(false);
      }
    };
    void loadAudit();
    return () => { cancelled = true; };
  }, []);

  const timeAgo = (iso?: string | null) => {
    if (!iso) return "unknown";
    const then = new Date(iso).getTime();
    const now = Date.now();
    const diff = Math.floor((now - then) / 1000);
    if (diff < 5) return "just now";
    if (diff < 60) return `${diff}s ago`;
    const mins = Math.floor(diff / 60);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  };

  const auditPreviewLimit = 8;
  const auditDateStart = auditDateFilter ? new Date(`${auditDateFilter}T00:00:00`) : null;
  const auditDateEnd = auditDateFilter ? new Date(`${auditDateFilter}T23:59:59`) : null;
  const filteredAuditLogs = auditLogs.filter((audit) => {
    if (auditDeviceFilter !== "all") {
      if (auditDeviceFilter === "login") {
        if (audit.event !== "login") return false;
      } else if (audit.event !== "manual_switch" || audit.device !== auditDeviceFilter) {
        return false;
      }
    }
    if (auditDateStart && auditDateEnd) {
      const createdAt = new Date(audit.createdAt);
      if (createdAt < auditDateStart || createdAt > auditDateEnd) return false;
    }
    return true;
  });

  const handleLogout = async () => {
    try {
      await signOutUser();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sign out failed.";
      toast.error(message);
    } finally {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="bg-gradient-to-r from-green-500 to-green-400 px-4 py-4 md:px-6 md:py-5 flex items-center justify-between">
        <Link to="/admin" className="flex items-center gap-3">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1607194402064-d0742de6d17b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGxlYWYlMjBwbGFudCUyMGxvZ298ZW58MXx8fHwxNzcyNjIzODU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="GreenPulse Logo"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-white/30"
          />
          <span className="text-2xl font-bold text-white">GreenPulse</span>
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>

      <div className="p-5 md:p-8">
        <div className="mx-auto w-full max-w-6xl space-y-6">
          <header className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-900 p-6 text-white shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Control Center</p>
                <h1 className="mt-2 text-3xl font-black md:text-4xl">Admin Dashboard</h1>
                <p className="mt-2 text-sm text-emerald-100">
                  {username ? `Welcome, ${username}` : "Welcome, Admin"}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  to="/admin/approvals"
                  className="rounded-xl border border-white/30 px-4 py-2 text-sm font-semibold transition hover:border-emerald-300 hover:text-emerald-200"
                >
                  User Approvals
                </Link>
              </div>
            </div>
          </header>

          <section className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Set Schedules",
                value: scheduleCount === null ? "—" : String(scheduleCount),
                note: scheduleCount === null ? "Loading..." : "",
                icon: ArrowRightLeft,
                tone: "from-cyan-500 to-cyan-400",
              },
              {
                title: "Team Members",
                value: teamUserCount === null ? "—" : String(teamUserCount),
                note: teamUserCount === null ? "Loading..." : "",
                icon: Users,
                tone: "from-amber-500 to-amber-400",
              },
            ].map((card) => (
              <article key={card.title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className={`mb-3 inline-flex rounded-lg bg-gradient-to-r p-2 ${card.tone}`}>
                  <card.icon className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-sm font-semibold text-slate-600">{card.title}</h2>
                <p className="mt-1 text-3xl font-black text-slate-900">{card.value}</p>
                <p className="mt-2 text-xs text-slate-500">{card.note}</p>
              </article>
            ))}
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Dashboard Sensor Management</p>
                <h2 className="mt-2 text-2xl font-black text-slate-900">User Sensor Configuration</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Add or remove live sensor types for the user dashboard.
                </p>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
              <div className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Sensor Nickname
                    <input
                      value={sensorName}
                      onChange={(event) => setSensorName(event.target.value)}
                      placeholder="e.g. Grow Light"
                      className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="block text-sm font-medium text-slate-700">
                    Database Identifier
                    <input
                      value={sensorKey}
                      onChange={(event) => setSensorKey(event.target.value)}
                      placeholder="e.g. light_intensity"
                      className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm"
                    />
                  </label>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Sensor Type
                    <select
                      value={sensorType}
                      onChange={(event) => setSensorType(event.target.value as "light" | "soil_moisture")}
                      className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm"
                    >
                      <option value="light">Light Sensor</option>
                      <option value="soil_moisture">Soil Moisture Sensor</option>
                    </select>
                  </label>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={handleAddSensor}
                      className="w-full rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                      Add Sensor
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-semibold text-slate-900">Configured Sensors</span>
                  {dashboardLoading ? <span className="text-xs text-slate-500">Loading…</span> : null}
                </div>
                {dashboardSensors.length > 0 ? (
                  <ul className="space-y-3">
                    {dashboardSensors.map((sensor) => (
                      <li key={sensor.id} className="flex items-center justify-between gap-3 rounded-xl bg-white p-3 shadow-sm">
                        <div>
                          <div className="text-sm font-semibold text-slate-900">{sensor.name}</div>
                          <div className="text-xs text-slate-500">{sensor.key} · {sensor.sensorType === "light" ? "Light" : "Soil Moisture"}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteSensor(sensor.id)}
                          className="rounded-md bg-rose-500 px-3 py-1 text-xs font-semibold text-white transition hover:bg-rose-600"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-600">No sensors configured yet for the dashboard.</p>
                )}
              </div>
            </div>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Admin Audit</p>
                <h2 className="mt-2 text-2xl font-black text-slate-900">Recent Audit Events</h2>
              </div>
              <div className="flex flex-wrap gap-2 items-end">
                <div className="flex flex-wrap gap-2">
                  {(["all", "login", "waterpump", "pest"] as const).map((device) => (
                    <button
                      key={device}
                      type="button"
                      onClick={() => setAuditDeviceFilter(device)}
                      className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                        auditDeviceFilter === device
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                      }`}
                    >
                      {device === "all"
                        ? "All"
                        : device === "login"
                        ? "Login"
                        : device === "waterpump"
                        ? "Water Pump"
                        : "Pest"}
                    </button>
                  ))}
                </div>
                <div className="max-w-xs">
                  <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="audit-date-filter">
                    Date
                  </label>
                  <input
                    id="audit-date-filter"
                    type="date"
                    value={auditDateFilter}
                    onChange={(event) => setAuditDateFilter(event.target.value)}
                    className="h-8 w-full rounded-md border border-gray-300 px-2 text-xs"
                  />
                </div>
              </div>
            </div>
            {auditLoading ? (
              <div className="text-sm text-slate-500">Loading audit logs...</div>
            ) : auditError ? (
              <div className="text-sm text-red-600">{auditError}</div>
            ) : filteredAuditLogs.length === 0 ? (
              <div className="text-sm text-slate-500">No audit events recorded yet.</div>
            ) : (
              <div className="space-y-3 max-h-[28rem] overflow-auto pr-2">
                <div className="text-xs text-slate-500">
                  Showing latest {Math.min(auditPreviewLimit, filteredAuditLogs.length)} of {filteredAuditLogs.length} events
                </div>
                {filteredAuditLogs.slice(0, auditPreviewLimit).map((audit) => (
                  <div key={audit.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="text-sm font-semibold text-slate-900">
                        {audit.username ?? "Unknown user"}
                        {audit.event === "login" && " logged in"}
                        {audit.event === "manual_switch" && ` toggled ${audit.device === "waterpump" ? "Water Pump" : "Pest Control"}`}
                        {audit.event === "schedule_create" && " created a schedule"}
                        {audit.event === "schedule_update" && " updated a schedule"}
                        {audit.event === "schedule_delete" && " deleted a schedule"}
                      </div>
                      <div className="text-xs text-slate-500">{timeAgo(audit.createdAt)}</div>
                    </div>
                    {audit.details ? (
                      <p className="mt-2 text-sm text-slate-700">{audit.details}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
