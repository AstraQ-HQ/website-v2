"use client";

import type { LucideIcon } from "lucide-react";

interface Service {
  icon: LucideIcon;
  name: string;
  description: string;
}

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <div className="group p-6 bg-card border border-border rounded-sm hover:shadow-lg hover:border-accent transition-all duration-300 text-center">
      <div className="w-10 h-10 bg-accent/10 rounded-sm flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/15 transition-colors">
        <Icon className="w-5 h-5 text-accent-foreground" strokeWidth={1} />
      </div>
      <h3 className="font-mono text-lg text-primary mb-2">{service.name}</h3>
      <p className="text-sm text-muted-foreground">{service.description}</p>
    </div>
  );
}
