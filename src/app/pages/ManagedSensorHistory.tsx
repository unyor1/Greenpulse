import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getDashboardSensors,
  getDashboardSensorLogs,
  DashboardSensorConfig,
} from "../services/backend";
import { getCurrentUserProfile } from "../services/auth";
import { PlantbotWidget } from "../components/PlantbotWidget";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Clock } from "lucide-react";

export function ManagedSensorHistory({ showWidget = true, showHeader = true }: { showWidget?: boolean; showHeader?: boolean }) {
  const [username, setUsername] = useState("");
  const [dashboardSensors, setDashboardSensors] = useState<DashboardSensorConfig[]>([]);
  const [dashboardSensorLogs, setDashboardSensorLogs] = useState<Record<string, Array<{ value: number; createdAt: string }>>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadDashboardSensorHistory = async () => {
    setLoading(true);
    setError("");

    try {
      const sensors = await getDashboardSensors();
      setDashboardSensors(sensors);

      const logEntries = await Promise.all(
        sensors.map(async (sensor) => {
          const rows = await getDashboardSensorLogs(sensor.id, 100);
          return [
            sensor.id,
            rows.map((row) => ({ value: row.value, createdAt: row.createdAt })),
          ] as const;
        })
      );

      setDashboardSensorLogs(Object.fromEntries(logEntries));
    } catch (err) {
      console.error("Unable to load managed sensor history", err);
      setError("Unable to load managed sensor history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    const load = async () => {
      await loadDashboardSensorHistory();
    };
    if (active) void load();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    const loadProfile = async () => {
      const profile = await getCurrentUserProfile();
      if (active && profile?.username) {
        setUsername(profile.username);
      }
    };
    void loadProfile();
    return () => {
      active = false;
    };
  }, []);

  const getChartData = (sensorId: string) => {
    const rows = dashboardSensorLogs[sensorId] ?? [];
    return rows
      .slice()
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      .map((row) => ({
        time: new Date(row.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        value: row.value,
      }));
  };

  return (
    <div className="space-y-4 flex flex-col min-h-0">
      {showHeader && (
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Managed Sensor History</h2>
            <p className="text-lg font-bold text-gray-900">{username ? `Hi, ${username}` : "Hi there"}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/history/switch"
              className="rounded-full border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Switch / Pest History
            </Link>
            <button
              type="button"
              onClick={loadDashboardSensorHistory}
              disabled={loading}
              className="rounded-full border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Refreshing…" : "Refresh history"}
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-slate-600" />
          <h3 className="text-sm font-semibold text-gray-700">Managed sensor logs</h3>
        </div>

        {loading ? (
          <div className="text-xs text-gray-500">Loading managed sensor history...</div>
        ) : error ? (
          <div className="text-xs text-red-600">{error}</div>
        ) : dashboardSensors.length === 0 ? (
          <div className="text-xs text-gray-500">No managed sensors configured yet.</div>
        ) : (
          <div className="space-y-6">
            {dashboardSensors.map((sensor) => {
              const chartData = getChartData(sensor.id);
              return (
                <div key={sensor.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{sensor.name}</div>
                      <div className="text-xs text-slate-500">
                        {sensor.key} · {sensor.sensorType === "soil_moisture" ? "Soil Moisture" : "Light"}
                      </div>
                    </div>
                    <div className="text-xs text-slate-500">{chartData.length} entries</div>
                  </div>
                  {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={180}>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="time" tick={{ fontSize: 10 }} stroke="#9ca3af" />
                        <YAxis tick={{ fontSize: 10 }} stroke="#9ca3af" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#fff",
                            border: "1px solid #e5e7eb",
                            borderRadius: "8px",
                            fontSize: "12px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke={sensor.sensorType === "soil_moisture" ? "#2563eb" : "#f59e0b"}
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[180px] flex items-center justify-center text-gray-500 text-sm">
                      No history logged yet for this sensor.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showWidget && <PlantbotWidget />}
    </div>
  );
}
