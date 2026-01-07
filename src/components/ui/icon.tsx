import {
  AlertCircleIcon,
  BookOpenIcon,
  BookSearchIcon,
  BrainIcon,
  CheckCircleIcon,
  ClipboardCheckIcon,
  GraduationCapIcon,
  type LucideIcon,
  ShieldCheckIcon,
  ShieldIcon,
  ShipIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  ShieldIcon,
  AlertCircleIcon,
  BookOpenIcon,
  UsersIcon,
  BrainIcon,
  ZapIcon,
  CheckCircleIcon,
  GraduationCapIcon,
  ClipboardCheckIcon,
  ShieldCheckIcon,
  BookSearchIcon,
  ShipIcon,
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
