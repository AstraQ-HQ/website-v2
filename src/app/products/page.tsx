"use client";

import { BrainIcon, CheckCircleIcon, LockIcon, RadarIcon, ShieldIcon, ZapIcon } from "lucide-react";
import { useState } from "react";
import { ProductCard } from "@/app/_components/product-card";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const allProducts = [
  {
    id: 1,
    name: "AI Threat Detection",
    tagline: "Detect threats before they happen",
    description:
      "Advanced machine learning algorithms analyze network behavior in real-time to identify anomalies and threats with 99.9% accuracy. Powered by neural networks trained on millions of attack patterns.",
    features: [
      "Real-time analysis",
      "ML-powered detection",
      "Zero false positives",
      "Behavioral analytics",
    ],
    icon: BrainIcon,
    category: "Detection",
  },
  {
    id: 2,
    name: "Security Operations Center",
    tagline: "Unified security command center",
    description:
      "Centralized dashboard for monitoring all security events, incidents, and responses across your entire infrastructure. Provides complete visibility and automated response orchestration.",
    features: [
      "24/7 monitoring",
      "Incident tracking",
      "Automated response",
      "Alert correlation",
    ],
    icon: ShieldIcon,
    category: "Response",
  },
  {
    id: 3,
    name: "Penetration Testing",
    tagline: "Proactive vulnerability discovery",
    description:
      "Professional penetration testing services to identify and remediate vulnerabilities before attackers can exploit them. Expert security researchers conduct comprehensive assessments.",
    features: [
      "Expert testing",
      "Detailed reports",
      "Remediation guidance",
      "Follow-up verification",
    ],
    icon: ZapIcon,
    category: "Testing",
  },
  {
    id: 4,
    name: "Compliance Management",
    tagline: "Stay compliant effortlessly",
    description:
      "Automated compliance monitoring and reporting for GDPR, HIPAA, SOC 2, and other industry standards. Eliminate manual compliance work with continuous monitoring.",
    features: [
      "Automated audits",
      "Real-time reports",
      "Policy management",
      "Evidence collection",
    ],
    icon: CheckCircleIcon,
    category: "Compliance",
  },
  {
    id: 5,
    name: "Zero Trust Platform",
    tagline: "Never trust, always verify",
    description:
      "Implement zero trust architecture across your organization. Every access request is verified regardless of source or location. Minimize attack surface and lateral movement.",
    features: [
      "Access control",
      "Device verification",
      "Network segmentation",
      "Continuous verification",
    ],
    icon: LockIcon,
    category: "Detection",
  },
  {
    id: 6,
    name: "Threat Intelligence",
    tagline: "Stay ahead of threats",
    description:
      "Real-time threat intelligence feeds with actionable insights. Know about emerging threats before they impact your organization. Curated by security experts.",
    features: [
      "Real-time feeds",
      "Threat indicators",
      "Attack patterns",
      "Expert analysis",
    ],
    icon: RadarIcon,
    category: "Compliance",
  },
];

const categories = ["All", "Detection", "Response", "Testing", "Compliance"];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { ref, isVisible } = useIntersectionObserver();

  const filteredProducts =
    activeCategory === "All"
      ? allProducts
      : allProducts.filter((p) => p.category === activeCategory);

  return (
    <>
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary via-background to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-mono text-5xl sm:text-6xl text-primary mb-4">
            Our Products
          </h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive cybersecurity solutions for enterprise protection
          </p>
        </div>
      </section>

      <section className="sticky top-16 backdrop-blur border-b border-border py-4 px-4 sm:px-6 lg:px-8 z-40">
        <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setActiveCategory(category)}
              variant={activeCategory === category ? "default" : "outline"}
              className="rounded-sm whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
