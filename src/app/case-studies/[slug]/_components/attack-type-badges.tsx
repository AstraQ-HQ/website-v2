import { Badge } from "@/components/ui/badge";

interface AttackTypeBadgesProps {
  attackTypes: string[];
  className?: string;
}

export function AttackTypeBadges({
  attackTypes,
  className,
}: AttackTypeBadgesProps) {
  if (!attackTypes || attackTypes.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className || ""}`}>
      {attackTypes.map((type) => (
        <Badge key={type} variant="outline" className="text-xs font-semibold">
          {type}
        </Badge>
      ))}
    </div>
  );
}
