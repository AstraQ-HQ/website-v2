import {
  AlertCircleIcon,
  BookOpenIcon,
  BrainIcon,
  CheckCircleIcon,
  type LucideIcon,
  ShieldIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react";

type IconName =
  | "ShieldIcon"
  | "AlertCircleIcon"
  | "BookOpenIcon"
  | "UsersIcon"
  | "BrainIcon"
  | "ZapIcon"
  | "CheckCircleIcon";

const iconMap: Record<string, LucideIcon> = {
  ShieldIcon,
  AlertCircleIcon,
  BookOpenIcon,
  UsersIcon,
  BrainIcon,
  ZapIcon,
  CheckCircleIcon,
};

export function Icon({
  name,
  className,
  strokeWidth,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const IconComponent = iconMap[name] || ShieldIcon; // Fallback to ShieldIcon
  return <IconComponent className={className} strokeWidth={strokeWidth} />;
}
