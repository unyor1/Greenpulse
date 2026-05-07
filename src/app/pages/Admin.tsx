import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRightLeft, Leaf, LogOut, Shield, Users, Sun, Droplets, Info } from "lucide-react";
import { getCurrentUserProfile, signOutUser, getUsersByRole } from "../services/auth";
import {
  getBackendSchedules,
  getAuditLogs,
  getDashboardSensors,
  createDashboardSensor,
  deleteDashboardSensor,
  DashboardSensorConfig,
  getBackendDeviceState,
} from "../services/backend";
import type { AuditLogEntry } from "../services/backend";
import { toast } from "sonner";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { MonitoringCard } from "../components/MonitoringCard";
import { WeatherForecast } from "../components/WeatherForecast";
import { WateringRecommendation } from "../components/WateringRecommendation";
import { PlantbotWidget } from "../components/PlantbotWidget";
import { useSensor } from "../context/SensorContext";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

// stat card values will be loaded dynamically

export function Admin() {
  const navigate = useNavigate();
  const { lightIntensity, soilMoisture, getLightStatus, getMoistureStatus } = useSensor();
  const [username, setUsername] = useState("");
  const [scheduleCount, setScheduleCount] = useState<number | null>(null);
  const [teamUserCount, setTeamUserCount] = useState<number | null>(null);
  const [teamUsers, setTeamUsers] = useState<Array<{ username?: string }>>([]);
  const [activeUserCount, setActiveUserCount] = useState<number>(0);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditError, setAuditError] = useState("");
  const [auditDeviceFilter, setAuditDeviceFilter] = useState<"all" | "waterpump" | "pest" | "login">("all");
  const [auditDateFilter, setAuditDateFilter] = useState("");
  const [deviceState, setDeviceState] = useState<Record<string, unknown>>({});
  const [openInfoDialog, setOpenInfoDialog] = useState(false);

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
        if (!cancelled) {
          setTeamUsers(Array.isArray(users) ? users : []);
          setTeamUserCount(Array.isArray(users) ? users.length : 0);
        }
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

  // Calculate active users based on recent login activity (only users with 'user' role)
  useEffect(() => {
    const now = Date.now();
    const oneHourAgo = now - 60 * 60 * 1000;
    const activeUsers = new Set<string>();

    // Get list of usernames with 'user' role
    const userRoleUsernames = new Set(
      teamUsers.map((user) => user.username).filter((username): username is string => !!username)
    );

    // Count only users with 'user' role that have logged in within the last hour
    auditLogs.forEach((audit) => {
      if (audit.event === "login" && audit.username && userRoleUsernames.has(audit.username)) {
        const auditTime = new Date(audit.createdAt).getTime();
        if (auditTime >= oneHourAgo) {
          activeUsers.add(audit.username);
        }
      }
    });

    setActiveUserCount(activeUsers.size);
  }, [auditLogs, teamUsers]);

  // Load dashboard sensors and device state
  useEffect(() => {
    let isMounted = true;

    const loadDashboard = async () => {
      try {
        const [sensors, state] = await Promise.all([
          getDashboardSensors(),
          getBackendDeviceState(),
        ]);
        if (isMounted) {
          setDashboardSensors(sensors);
          setDeviceState(state);
        }
      } catch (err) {
        console.error("Failed to load dashboard sensors", err);
      }
    };

    void loadDashboard();
    const interval = setInterval(loadDashboard, 3000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
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
       <span className="hidden sm:inline border border-white px-2 py-1 rounded-md">
  Logout
</span>
        </button>
      </div>

      <div className="p-5 md:p-8">
        <div className="mx-auto w-full max-w-6xl space-y-6">
          <header className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-900 p-6 text-white shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-400"><strong>Control Center</strong></p>
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
              {
                title: "Active Users",
                value: String(activeUserCount),
                note: activeUserCount > 0 ? "Online now" : "No active users",
                icon: Users,
                tone: "from-green-500 to-green-400",
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

          {/* Dashboard Monitoring Section */}
          <section className="rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-green-600"><strong>Live Monitoring</strong></p>
                <h2 className="mt-2 text-2xl font-black text-slate-900">Dashboard Overview</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Real-time sensor data and environmental conditions.
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setOpenInfoDialog(true)}
                className="h-8 w-8 p-0"
              >
                <Info className="h-4 w-4" />
                <span className="sr-only">Dashboard Help</span>
              </Button>
            </div>
            <Dialog open={openInfoDialog} onOpenChange={setOpenInfoDialog}>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Dashboard Help</DialogTitle>
                  <DialogDescription>
                    Learn what each dashboard section shows and how to interpret the data.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4 text-sm text-gray-700">
                  <div>
                    <strong>Light Intensity</strong> shows the current brightness of your growing area.
                  </div>
                  <div>
                    <strong>Soil Moisture</strong> shows current soil humidity and whether it is within a healthy range.
                  </div>
                  <div>
                    <strong>Additional Sensors</strong> display backend-connected devices and additional custom sensor readings.
                  </div>
                  <div>
                    <strong>Watering Recommendation</strong> suggests whether plants need water based on the latest sensor readings.
                  </div>
                  <div>
                    <strong>Weather Forecast</strong> previews upcoming weather so you can compare outdoor conditions with your system.
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

            {/* Environmental Sensors */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
                Environmental Sensors
              </h3>
              <div className="grid gap-3 md:grid-cols-2">
                <MonitoringCard
                  title="Light Intensity"
                  value={Math.round(lightIntensity)}
                  unit="%"
                  icon={Sun}
                  iconColor="text-yellow-500"
                  status={getLightStatus(lightIntensity)}
                />
                <MonitoringCard
                  title="Soil Moisture"
                  value={Math.round(soilMoisture)}
                  unit="%"
                  icon={Droplets}
                  iconColor="text-blue-500"
                  status={getMoistureStatus(soilMoisture)}
                />
              </div>
            </div>

            {/* Managed Sensors */}
            {dashboardSensors.length > 0 ? (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
                  Additional Sensors
                </h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {dashboardSensors.map((sensor) => {
                    const rawValue = deviceState[sensor.key];
                    const value =
                      typeof rawValue === "number"
                        ? rawValue
                        : typeof rawValue === "string"
                        ? Number(rawValue)
                        : 0;
                    const iconComponent = sensor.sensorType === "soil_moisture" ? Droplets : Sun;
                    const status = sensor.sensorType === "soil_moisture"
                      ? getMoistureStatus(value)
                      : getLightStatus(value);

                    return (
                      <MonitoringCard
                        key={sensor.id}
                        title={sensor.name}
                        value={Math.round(value)}
                        unit={sensor.unit}
                        icon={iconComponent}
                        iconColor={sensor.iconColor}
                        status={status}
                      />
                    );
                  })}
                </div>
              </div>
            ) : null}

            {/* Watering Recommendation */}
            <div className="mb-6">
              <WateringRecommendation />
            </div>

            {/* Weather Forecast */}
            <div className="mb-6">
              <WeatherForecast />
            </div>

            {/* Status Footer */}
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-600">System Active</span>
                </div>
                <div className="text-xs text-gray-500">
                  {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-green-600"><strong>Dashboard Sensor Management</strong></p>
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

              {dashboardSensors.length > 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-semibold text-slate-900">Configured Sensors</span>
                    {dashboardLoading ? <span className="text-xs text-slate-500">Loading…</span> : null}
                  </div>
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
                </div>
              ) : null}
            </div>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-green-600"><strong>Admin Audit</strong></p>
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
