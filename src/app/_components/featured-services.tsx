"use client";

import {
  AlertCircleIcon,
  BookOpenIcon,
  ShieldIcon,
  UsersIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: ShieldIcon,
    name: "Security Consulting",
    description:
      "Expert advice on security strategy, architecture, and best practices tailored to your organization's unique needs and risk profile.",
  },
  {
    icon: AlertCircleIcon,
    name: "Incident Response",
    description:
      "Rapid response to security incidents with expert analysis, containment, and recovery guidance to minimize damage and restore operations.",
  },
  {
    icon: BookOpenIcon,
    name: "Security Training",
    description:
      "Comprehensive training programs to educate your team on security practices, threat awareness, and compliance requirements.",
  },
  {
    icon: UsersIcon,
    name: "Managed Security",
    description:
      "Outsourced security operations with 24/7 monitoring, threat intelligence, and proactive security management and support.",
  },
];

export function FeaturedServices() {
  const { ref, isVisible } = useIntersectionObserver();
  const [activeService, setActiveService] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress >= 100) {
      setActiveService((current) => (current + 1) % services.length);
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

  const activeServiceData = services[activeService];
  const Icon = activeServiceData.icon;

  return (
    <section
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 border-b border-border"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="font-mono text-4xl sm:text-5xl text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Expert services to complement your security solutions
          </p>
        </div>

        <div className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-12">
          <div className="flex flex-col w-full lg:w-auto lg:min-w-[280px]">
            {services.map((service, index) => {
              const ServiceIcon = service.icon;
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
                    <ServiceIcon className="w-5 h-5" strokeWidth={1} />
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

            <a
              href="/services"
              className="inline-flex items-center gap-2 text-accent-foreground font-semibold hover:gap-3 transition-all w-fit"
            >
              View all services →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
