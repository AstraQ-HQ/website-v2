"use client";

import { CloudIcon, DatabaseIcon, LockIcon, ZapIcon } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export function TechStack() {
  const { ref, isVisible } = useIntersectionObserver();

  const techs = [
    { icon: ZapIcon, name: "Advanced ML", desc: "Neural networks" },
    { icon: DatabaseIcon, name: "Big Data", desc: "Real-time processing" },
    { icon: CloudIcon, name: "Cloud Native", desc: "Scalable architecture" },
    { icon: LockIcon, name: "Zero Trust", desc: "Security framework" },
  ];

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="font-mono text-4xl sm:text-5xl text-primary mb-4">
          Powered by Advanced AI
        </h2>
        <p className="text-lg text-muted-foreground mb-16 max-w-2xl mx-auto">
          Our platform leverages state-of-the-art technologies
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {techs.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <div
                key={tech.name}
                className={`transition-all duration-700 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-sm flex items-center justify-center">
                    <Icon className="w-6 h-6 text-accent-foreground" strokeWidth={1} />
                  </div>
                  <p className="font-semibold text-primary">{tech.name}</p>
                  <p className="text-sm text-muted-foreground">{tech.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
