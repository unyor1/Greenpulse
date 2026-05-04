import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Calendar } from "../components/ui/calendar";
import { useSensor } from "../context/SensorContext";
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
import { TrendingUp, Sun, Droplets, Calendar as CalendarIcon } from "lucide-react";
import { ManagedSensorHistory } from "./ManagedSensorHistory";

export function History() {
  const { historicalData, mergedHistoricalData, lightIntensity, soilMoisture } = useSensor();
  const [username, setUsername] = useState("");
  const [range, setRange] = useState<{ from?: Date | null; to?: Date | null }>({});

  // Filter historical data by selected calendar range (if any).
  const filteredHistorical = (() => {
    const source = mergedHistoricalData && mergedHistoricalData.length > 0 ? mergedHistoricalData : historicalData;
    if (!range?.from && !range?.to) return source;
    const from = range.from ? new Date(range.from) : new Date(0);
    from.setHours(0, 0, 0, 0);
    const to = range.to ? new Date(range.to) : new Date();
    to.setHours(23, 59, 59, 999);
    return source.filter((d) => {
      const ts = typeof d.timestamp === "number" ? d.timestamp : Number(d.timestamp);
      const dt = new Date(ts);
      return dt >= from && dt <= to;
    });
  })();

  const chartData = filteredHistorical
    .slice()
    .sort((a, b) => a.timestamp - b.timestamp)
    .map((entry) => ({
      time: new Date(entry.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      light: Math.round(entry.lightIntensity),
      moisture: entry.soilMoisture,
    }));

  const getStats = () => {
    if (filteredHistorical.length === 0) {
      return {
        avgLight: 0,
        avgMoisture: 0,
        minLight: 0,
        maxLight: 0,
        minMoisture: 0,
        maxMoisture: 0,
      };
    }

    const lights = filteredHistorical.map((d) => Math.round(d.lightIntensity));
    const moistures = filteredHistorical.map((d) => d.soilMoisture);

    return {
      avgLight: Math.round(lights.reduce((a, b) => a + b, 0) / lights.length),
      avgMoisture: Math.round(moistures.reduce((a, b) => a + b, 0) / moistures.length),
      minLight: Math.min(...lights),
      maxLight: Math.max(...lights),
      minMoisture: Math.min(...moistures),
      maxMoisture: Math.max(...moistures),
    };
  };

  const stats = getStats();
  const formatLabel = () => {
    if (range.from && range.to) {
      const fromDate = new Date(range.from);
      const toDate = new Date(range.to);
      const sameDay = fromDate.toDateString() === toDate.toDateString();
      if (sameDay) return fromDate.toLocaleDateString();
      return `${fromDate.toLocaleDateString()} — ${toDate.toLocaleDateString()}`;
    }
    if (range.from && !range.to) return new Date(range.from).toLocaleDateString();
    return null;
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

  return (
    <div className="space-y-4 flex flex-col min-h-0">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Sensor History</h2>
          <p className="text-lg font-bold text-gray-900">{username ? `Hi, ${username}` : "Hi there"}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/history/switch"
            className="rounded-full border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            Switch History
          </Link>
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger>
                <button
                  aria-label="Select date range"
                  title="Select date range"
                  className="rounded-full border border-slate-300 bg-white p-2 text-slate-700 hover:bg-slate-50"
                >
                  <CalendarIcon className="w-4 h-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <div className="p-2">
                  <Calendar
                    mode="range"
                    // disable future dates
                    disabled={{ after: new Date() }}
                    selected={range}
                    onSelect={(r) => {
                      // r can be a Date, Range, or null/undefined
                      if (!r) {
                        setRange({});
                        return;
                      }

                      // If DayPicker returns a single Date (some configs), treat it
                      // as a single-day selection. If the clicked date equals the
                      // currently-selected single date, clear the selection.
                      // @ts-ignore
                      if (r instanceof Date) {
                        const clicked = new Date(r);
                        if (
                          range.from &&
                          range.to &&
                          new Date(range.from).toDateString() === clicked.toDateString() &&
                          new Date(range.to).toDateString() === clicked.toDateString()
                        ) {
                          setRange({});
                          return;
                        }
                        setRange({ from: clicked, to: clicked });
                        return;
                      }

                      // When mode=range, r is an object with { from, to }
                      // @ts-ignore
                      const from: Date | null = r.from ?? null;
                      // @ts-ignore
                      const to: Date | null = r.to ?? null;

                      if (from && !to) {
                        // First click: show only that date (from == to).
                        const clicked = new Date(from);
                        if (
                          range.from &&
                          range.to &&
                          new Date(range.from).toDateString() === clicked.toDateString() &&
                          new Date(range.to).toDateString() === clicked.toDateString()
                        ) {
                          setRange({});
                          return;
                        }
                        setRange({ from: clicked, to: clicked });
                        return;
                      }

                      if (from && to) {
                        // Normal range selection
                        setRange({ from: new Date(from), to: new Date(to) });
                        return;
                      }

                      // Fallback: clear
                      setRange({});
                    }}
                  />
                  <div className="mt-2 flex gap-2 justify-end">
                    <button
                      className="rounded px-3 py-1 text-xs border text-slate-600"
                      onClick={() => setRange({})}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <div className="text-xs text-slate-700">{formatLabel() ?? "Date range"}</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-gray-600" />
          <h3 className="text-sm font-semibold text-gray-700">Current Sensor Overview</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sun className="w-4 h-4 text-yellow-600" />
              <span className="text-xs font-medium text-yellow-700">Light</span>
            </div>
            <div className="text-2xl font-bold text-yellow-900 mb-1">{Math.round(lightIntensity)}</div>
            <div className="text-xs text-yellow-600">%</div>
          </div>
          <div className="bg-blue-50 rounded-xl border border-blue-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-medium text-blue-700">Moisture</span>
            </div>
            <div className="text-2xl font-bold text-blue-900 mb-1">{Math.round(soilMoisture)}</div>
            <div className="text-xs text-blue-600">%</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-gray-600" />
            <h3 className="text-sm font-semibold text-gray-700">Sensor History</h3>
          </div>
          {filteredHistorical.length > 0 ? (
            <div className="text-xs text-gray-500">
              Avg light {stats.avgLight}% · Avg moisture {stats.avgMoisture}%
            </div>
          ) : null}
        </div>
        {chartData.length === 0 ? (
          <div className="text-xs text-gray-500">No light or moisture history available yet.</div>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData} margin={{ top: 10, right: 15, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" tick={{ fontSize: 10 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 10 }} stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "12px" }}
              />
              <Line type="monotone" dataKey="light" stroke="#f59e0b" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="moisture" stroke="#2563eb" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <ManagedSensorHistory showWidget={false} showHeader={false} />
      <PlantbotWidget />
    </div>
  );
}
