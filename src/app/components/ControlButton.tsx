import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LucideIcon, Clock3 } from "lucide-react";

interface ControlButtonProps {
  title: string;
  icon: LucideIcon;
  showScheduleIcon?: boolean;
  onScheduleClick?: () => void;
  isActive: boolean;
  onToggle: () => void;
  disabled?: boolean;
  timerLabel?: string | null;
}

export function ControlButton({
  title,
  icon: Icon,
  showScheduleIcon = false,
  onScheduleClick,
  isActive,
  onToggle,
  disabled = false,
  timerLabel = null,
}: ControlButtonProps) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3 px-4 pt-4">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {showScheduleIcon ? (
            <button
              type="button"
              onClick={onScheduleClick}
              className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
              aria-label={`Add schedule for ${title}`}
            >
              <Clock3 className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <Button
          onClick={onToggle}
          disabled={disabled}
          className={`w-full h-20 ${
            isActive
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-300 hover:bg-gray-400 text-gray-700"
          }`}
        >
          <Icon className="h-8 w-8 mr-2" />
          {isActive ? "ON" : "OFF"}
        </Button>
        {timerLabel ? (
          <div className="mt-2 text-xs text-gray-500 text-center">
            {timerLabel}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
