"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { siteConfig } from "@/lib/constants";
import { allFeaturedServices } from "@/lib/content";
import { cn } from "@/lib/utils";

export function FeaturedServices() {
  const { ref, isVisible } = useIntersectionObserver();
  const [activeService, setActiveService] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress >= 100) {
      setActiveService((current) => (current + 1) % allFeaturedServices.length);
      setProgress(0);
    }
  }, [progress]);

  useEffect(() => {
    if (!isVisible) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => prev + 1.5);
    }, 100);

    return () => {
      clearInterval(progressInterval);
    };
  }, [isVisible]);

  const handleServiceClick = (index: number) => {
    setActiveService(index);
    setProgress(0);
  };

  const activeServiceData = allFeaturedServices[activeService];

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="font-mono text-4xl sm:text-5xl text-foreground mb-4">
            {siteConfig.pages.home.featuredServices.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {siteConfig.pages.home.featuredServices.description}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-12">
          <div className="flex flex-col w-full lg:w-auto lg:min-w-[280px]">
            {allFeaturedServices.map((service, index) => {
              const isActive = activeService === index;
              return (
                <button
                  key={service.name}
                  type="button"
                  onClick={() => handleServiceClick(index)}
                  className={cn(
                    "flex items-start gap-4 p-4 cursor-pointer text-left transition-all duration-300 relative",
                    isActive ? "bg-accent" : "hover:bg-muted/20",
                  )}
                >
                  {isActive && (
                    <div
                      className="absolute right-0 top-0 bottom-0 w-1 bg-primary transition-all duration-100"
                      style={{
                        height: `${progress}%`,
                        transition: "height 0.1s linear",
                      }}
                    />
                  )}
                  <div
                    className={cn(
                      "w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0 transition-colors",
                      isActive
                        ? "bg-accent/20 text-accent-foreground"
                        : "bg-border text-muted-foreground",
                    )}
                  >
                    <Icon
                      name={service.icon}
                      className="w-5 h-5"
                      strokeWidth={1}
                    />
                  </div>
                  <div className="flex-1">
                    <h3
                      className={cn(
                        "font-semibold text-sm mb-1 transition-colors",
                        isActive ? "text-foreground" : "text-foreground/70",
                      )}
                    >
                      {service.name}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex-1 flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-sm bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Icon
                  name={activeServiceData.icon}
                  className="w-6 h-6 text-accent-foreground"
                  strokeWidth={1}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-mono text-3xl sm:text-4xl text-foreground">
                  {activeServiceData.name}
                </h3>
              </div>
            </div>

            <p className="text-foreground/80 leading-relaxed text-lg">
              {activeServiceData.description}
            </p>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-accent-foreground font-semibold hover:gap-3 transition-all w-fit"
            >
              View all services →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
