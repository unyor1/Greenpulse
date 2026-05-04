import { useEffect, useState } from "react";
import { Cloud, CloudRain, Sun, CloudSnow, Wind, Droplets, MapPin } from "lucide-react";
import { useSensor } from "../context/SensorContext";

interface GeocodingResult {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface WeatherDay {
  day: string;
  temp: number;
  condition: "sunny" | "cloudy" | "rainy" | "snowy";
  humidity: number;
  windSpeed: number;
}

const conditionPatterns: WeatherDay["condition"][] = ["sunny", "cloudy", "rainy", "cloudy", "sunny"];

const buildForecastForRegion = (seed: number): WeatherDay[] => {
  const today = new Date();

  return Array.from({ length: 5 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);
    const day = index === 0
      ? "Today"
      : date.toLocaleDateString("en-US", { weekday: "short" });
    const tempBase = 27 + ((seed + index) % 5);
    const humidityBase = 66 + ((seed * 3 + index * 4) % 24);
    const windBase = 10 + ((seed * 2 + index * 3) % 11);
    const condition = conditionPatterns[(index + seed) % conditionPatterns.length];

    return {
      day,
      temp: tempBase,
      condition,
      humidity: humidityBase,
      windSpeed: windBase,
    };
  });
};

const fallbackForecast: WeatherDay[] = buildForecastForRegion(1);

const rainyCodes = new Set([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99]);
const snowyCodes = new Set([71, 73, 75, 77, 85, 86]);

const getConditionFromWeatherCode = (code: number): WeatherDay["condition"] => {
  if (snowyCodes.has(code)) return "snowy";
  if (rainyCodes.has(code)) return "rainy";
  if ([1, 2, 3, 45, 48].includes(code)) return "cloudy";
  return "sunny";
};

const getWeatherIcon = (condition: string) => {
  switch (condition) {
    case "sunny":
      return <Sun className="w-8 h-8 text-yellow-500" />;
    case "cloudy":
      return <Cloud className="w-8 h-8 text-gray-400" />;
    case "rainy":
      return <CloudRain className="w-8 h-8 text-blue-500" />;
    case "snowy":
      return <CloudSnow className="w-8 h-8 text-blue-300" />;
    default:
      return <Sun className="w-8 h-8 text-yellow-500" />;
  }
};

export function WeatherForecast() {
  const { weatherLocation, setWeatherLocation } = useSensor();
  const [forecast, setForecast] = useState<WeatherDay[]>(fallbackForecast);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [geoResults, setGeoResults] = useState<GeocodingResult[]>([]);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const REFRESH_INTERVAL_MS = 60 * 60 * 1000;

    const fetchForecast = async () => {
      setIsLoading(true);

      try {
        const params = new URLSearchParams({
          latitude: String(weatherLocation.lat),
          longitude: String(weatherLocation.lon),
          timezone: "auto",
          forecast_days: "5",
          daily: "weather_code,temperature_2m_max,relative_humidity_2m_mean,wind_speed_10m_max",
        });

        const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          return;
        }

        const data = await response.json();
        const daily = data?.daily;
        const dates: string[] = daily?.time ?? [];
        const codes: number[] = daily?.weather_code ?? [];
        const temperatures: number[] = daily?.temperature_2m_max ?? [];
        const humidities: number[] = daily?.relative_humidity_2m_mean ?? [];
        const winds: number[] = daily?.wind_speed_10m_max ?? [];

        const forecast = dates.slice(0, 5).map((date, index) => ({
          day: index === 0 ? "Today" : new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
          temp: Math.round(temperatures[index] ?? 0),
          condition: getConditionFromWeatherCode(codes[index] ?? 0),
          humidity: Math.round(humidities[index] ?? 0),
          windSpeed: Math.round(winds[index] ?? 0),
        }));

        if (forecast.length === 5) {
          setForecast(forecast);
        }
      } catch {
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchForecast();
    const interval = setInterval(fetchForecast, REFRESH_INTERVAL_MS);

    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, [weatherLocation.lat, weatherLocation.lon]);

  const searchLocation = async () => {
    const query = searchText.trim();
    if (query.length < 2) {
      setGeoError("Enter at least 2 characters.");
      return;
    }

    setGeoError("");
    setGeoLoading(true);

    try {
      const params = new URLSearchParams({
        name: query,
        count: "5",
        language: "en",
        format: "json",
        countryCode: "PH",
      });

      const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${params.toString()}`);
      if (!response.ok) {
        setGeoError("Location search failed. Try again.");
        return;
      }

      const data = await response.json();
      const rows = Array.isArray(data?.results) ? data.results : [];
      const mapped: GeocodingResult[] = rows
        .map((row: any) => {
          const adminParts = [row.admin4, row.admin3, row.admin2, row.admin1].filter(Boolean);
          const area = adminParts.length > 0 ? String(adminParts[0]).trim() : String(row.country ?? "Philippines").trim();
          const rawName = String(row.name ?? "").trim();
          let displayName = rawName || area;
          if (rawName && area && rawName !== area && !rawName.includes(area)) {
            displayName = `${rawName}, ${area}`;
          }

          return {
            id: `${row.id ?? `${row.latitude}-${row.longitude}`}`,
            name: displayName,
            latitude: Number(row.latitude),
            longitude: Number(row.longitude),
          };
        })
        .filter((row: any) => Number.isFinite(row.latitude) && Number.isFinite(row.longitude));

      setGeoResults(mapped);
      if (mapped.length === 0) {
        setGeoError("No Philippine location found.");
      }
    } catch {
      setGeoError("Location search failed. Check your internet.");
    } finally {
      setGeoLoading(false);
    }
  };

  const applyLocation = (result: GeocodingResult) => {
    setWeatherLocation({
      name: result.name,
      lat: result.latitude,
      lon: result.longitude,
    });
    setGeoResults([]);
    setSearchText(result.name);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
          Weather Forecast
        </h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <MapPin className="w-3 h-3 text-gray-500" />
            <span>{weatherLocation.name}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Wind className="w-3 h-3" />
            <span>{isLoading ? "Updating..." : "5-Day"}</span>
          </div>
        </div>
      </div>

      <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search city/barangay (e.g., Taguig, Baguio)"
            className="h-8 w-full rounded-md border border-gray-300 px-2 text-xs"
          />
          <button
            type="button"
            onClick={() => {
              void searchLocation();
            }}
            className="h-8 rounded-md border border-gray-300 bg-white px-3 text-xs hover:bg-gray-100"
            disabled={geoLoading}
          >
            {geoLoading ? "Searching" : "Search"}
          </button>
        </div>
        {geoError ? <p className="mt-2 text-xs text-red-600">{geoError}</p> : null}
        {geoResults.length > 0 ? (
          <div className="mt-2 space-y-1">
            {geoResults.map((result) => (
              <button
                key={result.id}
                type="button"
                onClick={() => applyLocation(result)}
                className="w-full rounded-md border border-gray-200 bg-white px-2 py-1 text-left text-xs text-gray-700 hover:bg-green-50"
              >
                {result.name} ({result.latitude.toFixed(4)}, {result.longitude.toFixed(4)})
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="grid grid-cols-5 gap-2">
        {forecast.map((weather, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-2 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 hover:from-green-50 hover:to-green-100 transition-colors"
          >
            <div className="text-xs font-medium text-gray-700 mb-2">
              {weather.day}
            </div>
            <div className="mb-2">{getWeatherIcon(weather.condition)}</div>
            <div className="font-semibold text-gray-900 mb-1">
              {weather.temp}°C
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Droplets className="w-3 h-3" />
              <span>{weather.humidity}%</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-start gap-2">
          <Sun className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-green-700">
            <span className="font-medium">Optimal conditions</span> expected today in {weatherLocation.name}{' '}
            for plant growth. Maintain current watering schedule.
          </div>
        </div>
      </div>
    </div>
  );
}
