import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Clock, Trash2, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";

export interface Schedule {
  id: string;
  device: "pest" | "waterpump";
  days: number[]; // 0 = Monday, 1 = Tuesday, ... 6 = Sunday
  time: string; // HH:MM format
}

interface SchedulerProps {
  device: "pest" | "waterpump";
  deviceName: string;
  schedules: Schedule[];
  onAddSchedule: (schedule: Omit<Schedule, "id">) => void;
  onDeleteSchedule: (id: string) => void;
}

const DAYS = [
  { value: 0, label: "Mon" },
  { value: 1, label: "Tue" },
  { value: 2, label: "Wed" },
  { value: 3, label: "Thu" },
  { value: 4, label: "Fri" },
  { value: 5, label: "Sat" },
  { value: 6, label: "Sun" },
];

export function Scheduler({
  device,
  deviceName,
  schedules,
  onAddSchedule,
  onDeleteSchedule,
}: SchedulerProps) {
  const [open, setOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [selectedTime, setSelectedTime] = useState("08:00");

  const deviceSchedules = schedules.filter((s) => s.device === device);

  const toggleDay = (day: number) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleAddSchedule = () => {
    if (selectedDays.length === 0) {
      alert("Please select at least one day");
      return;
    }

    onAddSchedule({
      device,
      days: selectedDays,
      time: selectedTime,
    });

    setSelectedDays([]);
    setSelectedTime("08:00");
    setOpen(false);
  };

  const getDaysLabel = (days: number[]) => {
    if (days.length === 7) return "Every day";
    if (days.length === 0) return "No days";
    return days
      .sort()
      .map((d) => DAYS[d].label)
      .join(", ");
  };

  return (
    <Card className="mt-3 w-full">
      <CardHeader className="pb-3 px-4 pt-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Schedules
          </CardTitle>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="inline-flex items-center justify-center h-7 px-3 text-xs rounded-md border border-gray-300 bg-white hover:bg-gray-50 transition-colors">
                <Plus className="h-3 w-3 mr-1" />
                Add
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>Add Schedule - {deviceName}</DialogTitle>
                <DialogDescription>
                  Schedule automatic device actions for the selected garden area.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label className="text-sm mb-2 block">Select Days</Label>
                  <div className="grid grid-cols-7 gap-2">
                    {DAYS.map((day) => (
                      <button
                        key={day.value}
                        onClick={() => toggleDay(day.value)}
                        className={`p-2 text-xs rounded-lg border-2 transition-colors ${
                          selectedDays.includes(day.value)
                            ? "bg-green-500 text-white border-green-500"
                            : "bg-white text-gray-600 border-gray-300 hover:border-green-400"
                        }`}
                      >
                        {day.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="time" className="text-sm mb-2 block">
                    Select Time
                  </Label>
                  <input
                    id="time"
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <Button onClick={handleAddSchedule} className="w-full bg-green-600 hover:bg-green-700">
                  Add Schedule
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        {deviceSchedules.length === 0 ? (
          <p className="text-xs text-gray-500 text-center py-2">
            No schedules set
          </p>
        ) : (
          <div className="space-y-2">
            {deviceSchedules.map((schedule) => (
              <div
                key={schedule.id}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex-1">
                  <div className="text-xs font-medium text-gray-900">
                    {schedule.time}
                  </div>
                  <div className="text-xs text-gray-600">
                    {getDaysLabel(schedule.days)}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDeleteSchedule(schedule.id)}
                  className="h-7 w-7 p-0"
                >
                  <Trash2 className="h-3 w-3 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}