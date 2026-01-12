import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Severity = "Low" | "Medium" | "High" | "Critical";

interface SeverityBadgeProps {
  severity: Severity;
  className?: string;
}

export function SeverityBadge({ severity, className }: SeverityBadgeProps) {
  const colorMap: Record<Severity, string> = {
    Critical: "bg-red-500/10 text-red-500 border-red-500/20",
    High: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    Medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    Low: "bg-green-500/10 text-green-500 border-green-500/20",
  };

  return (
    <Badge
      variant="outline"
      className={cn("font-semibold", colorMap[severity], className)}
    >
      {severity}
    </Badge>
  );
}
