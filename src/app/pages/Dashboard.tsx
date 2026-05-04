import { useEffect, useState } from "react";
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
import { Sun, Droplets, Info } from "lucide-react";
import { getCurrentUserProfile } from "../services/auth";
import { getBackendDeviceState, getDashboardSensors, DashboardSensorConfig } from "../services/backend";

export function Dashboard() {
  const { lightIntensity, soilMoisture, getLightStatus, getMoistureStatus } = useSensor();
  const [username, setUsername] = useState("");
  const [dashboardSensors, setDashboardSensors] = useState<DashboardSensorConfig[]>([]);
  const [deviceState, setDeviceState] = useState<Record<string, unknown>>({});
  const [openInfoDialog, setOpenInfoDialog] = useState(false);

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

  return (
    <div className="space-y-4 flex flex-col min-h-0">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Welcome</h2>
          <p className="text-lg font-bold text-gray-900">
            {username ? `Hi, ${username}` : "Hi there"}
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
              <strong>Managed Sensors</strong> display backend-connected devices and additional custom sensor readings.
            </div>
            <div>
              <strong>Watering Recommendation</strong> suggests whether plants need water based on the latest sensor readings.
            </div>
            <div>
              <strong>Weather Forecast</strong> previews upcoming weather so you can compare outdoor conditions with your system.
            </div>
            <div>
              <strong>Status Footer</strong> confirms the dashboard is active and shows the current refresh time.
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
      {/* Monitoring Section */}
      <div>
        <h2 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
          Environmental Sensors
        </h2>
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

      {dashboardSensors.length > 0 ? (
        <div>
          <h2 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
            Managed Sensors
          </h2>
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

      {/* Smart Watering Recommendation */}
      <div>
        <WateringRecommendation />
      </div>

      {/* Weather Forecast */}
      <div>
        <WeatherForecast />
      </div>

      {/* Status Footer */}
      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 mt-auto">
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
      <PlantbotWidget />
    </div>
  );
}
