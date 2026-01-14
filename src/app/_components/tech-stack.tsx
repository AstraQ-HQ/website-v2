"use client";

import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function TechStack() {
  const { ref, isVisible } = useIntersectionObserver();
  const { title, description, techs } = siteConfig.pages.home.techStack;

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="font-mono text-4xl sm:text-5xl text-foreground mb-4">
          {title}
        </h2>
        <p className="text-lg text-muted-foreground mb-16 max-w-2xl mx-auto">
          {description}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {techs.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <div
                key={tech.name}
                className={cn(
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90",
                )}
                style={{
                  transition: `opacity 700ms ${index * 100}ms, transform 700ms ${index * 100}ms`,
                }}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-sm flex items-center justify-center">
                    <Icon
                      className="w-6 h-6 text-accent-foreground"
                      strokeWidth={1}
                    />
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
