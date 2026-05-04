import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LucideIcon } from "lucide-react";

interface MonitoringCardProps {
  title: string;
  value: number;
  unit: string;
  icon: LucideIcon;
  iconColor: string;
  status: "good" | "warning" | "critical";
}

export function MonitoringCard({
  title,
  value,
  unit,
  icon: Icon,
  iconColor,
  status,
}: MonitoringCardProps) {
  const statusColors = {
    good: "bg-green-500/10 text-green-600 border-green-500/20",
    warning: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    critical: "bg-red-500/10 text-red-600 border-red-500/20",
  };

  return (
    <Card className={`border-2 ${statusColors[status]}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">
          {value}
          <span className="text-lg ml-1">{unit}</span>
        </div>
      </CardContent>
    </Card>
  );
}
