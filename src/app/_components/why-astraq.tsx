"use client";

import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function WhyAstraQ() {
  const { ref, isVisible } = useIntersectionObserver();
  const { title, description, stats, features } =
    siteConfig.pages.home.whyAstraQ;

  return (
    <section
      id="why-astraq"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-background"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-mono text-4xl sm:text-5xl text-foreground mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={cn(
                  "text-center",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10",
                )}
                style={{
                  transition: `opacity 700ms ${index * 150}ms, transform 700ms ${index * 150}ms`,
                }}
              >
                <div className="w-14 h-14 bg-accent/10 rounded-sm flex items-center justify-center mx-auto mb-4">
                  <Icon
                    className="w-7 h-7 text-accent-foreground"
                    strokeWidth={1}
                  />
                </div>
                <p className="font-mono text-4xl text-foreground mb-2">
                  {stat.value}
                </p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={item.title}
              className={cn(
                "p-8 border border-border rounded-sm bg-card hover:shadow-lg hover:border-accent",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10",
              )}
              style={{
                transition: `opacity 700ms ${(index + 3) * 150}ms, transform 700ms ${(index + 3) * 150}ms, box-shadow 300ms, border-color 300ms`,
              }}
            >
              <h3 className="font-mono text-xl text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
