"use client";

import {
  AlertCircleIcon,
  BookOpenIcon,
  BriefcaseIcon,
  ShieldIcon,
  TargetIcon,
  UsersIcon,
} from "lucide-react";
import { ServiceCard } from "@/app/_components/service-card";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const allServices = [
  {
    icon: ShieldIcon,
    name: "Security Consulting",
    description:
      "Expert advice on security strategy, architecture, and best practices tailored to your organization.",
  },
  {
    icon: AlertCircleIcon,
    name: "Incident Response",
    description:
      "Rapid response to security incidents with expert analysis, containment, and recovery guidance.",
  },
  {
    icon: BookOpenIcon,
    name: "Security Training",
    description:
      "Comprehensive training programs to educate your team on security practices and threat awareness.",
  },
  {
    icon: UsersIcon,
    name: "Managed Security",
    description:
      "Outsourced security operations with 24/7 monitoring, threat intelligence, and management.",
  },
  {
    icon: BriefcaseIcon,
    name: "Risk Assessment",
    description:
      "Comprehensive risk assessments identifying vulnerabilities and providing remediation roadmaps.",
  },
  {
    icon: TargetIcon,
    name: "Threat Hunting",
    description:
      "Proactive threat hunting to uncover hidden threats and attack infrastructure in your environment.",
  },
];

export default function ServicesPage() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <>
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary via-background to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-mono text-5xl sm:text-6xl text-primary mb-4">
            Our Services
          </h1>
          <p className="text-lg text-muted-foreground">
            Expert services complementing your security infrastructure
          </p>
        </div>
      </section>

      <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allServices.map((service, index) => (
              <div
                key={service.name}
                className={`transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>

          <div className="mt-16 text-center p-12 bg-secondary rounded-lg border border-border">
            <h2 className="font-mono text-3xl text-primary mb-4">
              Get Expert Support
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Contact our team to discuss which services are right for your
              organization
            </p>
            <Button className="text-primary-foreground rounded-sm font-semibold hover:shadow-lg">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
