import { useEffect, useMemo, useState } from "react";
import { AlertCircle, CloudRain, Droplet, Sun } from "lucide-react";
import { useSensor } from "../context/SensorContext";

type RecommendationColor = "red" | "orange" | "blue" | "green";

interface Recommendation {
  icon: typeof Droplet;
  color: RecommendationColor;
  message: string;
  routine: string | null;
}

interface WeatherSnapshot {
  willRainToday: boolean;
  rainProbability: number;
  maxTemp: number;
  isLoading: boolean;
}

const RAIN_WEATHER_CODES = new Set([
  51, 53, 55, 56, 57,
  61, 63, 65, 66, 67,
  71, 73, 75, 77,
  80, 81, 82, 85, 86,
  95, 96, 99,
]);

const PUMP_ON_THRESHOLD = 60;
const PUMP_OFF_THRESHOLD = 70;
const MID_MOISTURE_THRESHOLD = Math.round((PUMP_ON_THRESHOLD + PUMP_OFF_THRESHOLD) / 2);

export function WateringRecommendation() {
  const {
    weatherLocation,
    soilMoisture,
  } = useSensor();
  const [weather, setWeather] = useState<WeatherSnapshot>({
    willRainToday: false,
    rainProbability: 0,
    maxTemp: 0,
    isLoading: true,
  });

  useEffect(() => {
    const controller = new AbortController();

    const fetchWeather = async () => {
      setWeather((prev) => ({ ...prev, isLoading: true }));

      try {
        const params = new URLSearchParams({
          latitude: String(weatherLocation.lat),
          longitude: String(weatherLocation.lon),
          timezone: "auto",
          forecast_days: "1",
          daily: "weather_code,precipitation_probability_max,temperature_2m_max",
        });

        const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          return;
        }

        const data = await response.json();
        const code = Number(data?.daily?.weather_code?.[0] ?? 0);
        const rainProbability = Math.round(Number(data?.daily?.precipitation_probability_max?.[0] ?? 0));
        const maxTemp = Math.round(Number(data?.daily?.temperature_2m_max?.[0] ?? 0));

        setWeather({
          willRainToday: RAIN_WEATHER_CODES.has(code),
          rainProbability,
          maxTemp,
          isLoading: false,
        });
      } catch {
        if (!controller.signal.aborted) {
          setWeather((prev) => ({ ...prev, isLoading: false }));
        }
      }
    };

    void fetchWeather();

    return () => {
      controller.abort();
    };
  }, [weatherLocation.lat, weatherLocation.lon]);

  const recommendation = useMemo<Recommendation>(() => {
    const shouldSkipForRain = weather.willRainToday && weather.rainProbability >= 50;

    if (soilMoisture > PUMP_OFF_THRESHOLD) {
      return {
        icon: Droplet,
        color: "blue",
        message: `Soil is already wet (${Math.round(soilMoisture)}%). Skip watering for 24-48 hours.`,
        routine: `Keep monitoring moisture and wait until it drops below ${PUMP_ON_THRESHOLD}% before watering again.`,
      };
    }

    if (shouldSkipForRain) {
      return {
        icon: CloudRain,
        color: "blue",
        message: `Rain chance is ${weather.rainProbability}% in ${weatherLocation.name}. Delay watering for now.`,
        routine: "Re-check soil after rainfall before turning on the pump.",
      };
    }

    if (soilMoisture < PUMP_ON_THRESHOLD) {
      return {
        icon: AlertCircle,
        color: "red",
        message: `Soil moisture is ${Math.round(soilMoisture)}%. Water immediately.`,
        routine: "Run pump briefly, then check again in 10-15 minutes.",
      };
    }

    if (soilMoisture < MID_MOISTURE_THRESHOLD) {
      return {
        icon: Sun,
        color: "orange",
        message: `Soil is getting dry (${Math.round(soilMoisture)}%). Water within 6-12 hours.`,
        routine: "Use moderate watering and avoid overwatering if humidity is high.",
      };
    }

    return {
      icon: Droplet,
      color: "green",
      message: `Soil moisture is stable at ${Math.round(soilMoisture)}%. Keep current schedule.`,
      routine: "No immediate action needed. Continue monitoring through the day.",
    };
  }, [weatherLocation.name, soilMoisture, weather.rainProbability, weather.willRainToday]);

  const getBackgroundColor = () => {
    if (!recommendation) {
      return "bg-gray-50 border-gray-200";
    }

    switch (recommendation.color) {
      case "red":
        return "bg-red-50 border-red-200";
      case "orange":
        return "bg-orange-50 border-orange-200";
      case "blue":
        return "bg-blue-50 border-blue-200";
      case "green":
        return "bg-green-50 border-green-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getTextColor = () => {
    if (!recommendation) {
      return "text-gray-700";
    }

    switch (recommendation.color) {
      case "red":
        return "text-red-700";
      case "orange":
        return "text-orange-700";
      case "blue":
        return "text-blue-700";
      case "green":
        return "text-green-700";
      default:
        return "text-gray-700";
    }
  };

  const getIconColor = () => {
    if (!recommendation) {
      return "text-gray-600";
    }

    switch (recommendation.color) {
      case "red":
        return "text-red-600";
      case "orange":
        return "text-orange-600";
      case "blue":
        return "text-blue-600";
      case "green":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className={`rounded-xl border p-4 ${getBackgroundColor()}`}>
      <h3 className={`font-semibold text-sm mb-3 ${getTextColor()}`}>
        Smart Watering Recommendation
      </h3>

      <div className="rounded-md border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700">
        {weather.isLoading
          ? `Loading weather for ${weatherLocation.name}...`
          : `Location: ${weatherLocation.name} | Rain chance: ${weather.rainProbability}% | Max temp: ${weather.maxTemp} C`}
      </div>

      <div className="mt-3 flex items-start gap-3">
        <recommendation.icon className={`mt-0.5 h-5 w-5 flex-shrink-0 ${getIconColor()}`} />
        <div className="flex-1">
          <p className={`text-xs font-medium ${getTextColor()}`}>{recommendation.message}</p>
          {recommendation.routine ? (
            <p className={`mt-1 text-xs ${getTextColor()}`}>{recommendation.routine}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
