"use client";

import { BrainIcon, CheckCircleIcon, ShieldIcon, ZapIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

const products = [
  {
    id: 1,
    name: "AI Threat Detection",
    tagline: "Detect threats before they happen",
    description:
      "Advanced machine learning algorithms analyze network behavior in real-time to identify anomalies and threats with 99.9% accuracy.",
    features: [
      "Real-time analysis",
      "ML-powered detection",
      "Zero false positives",
    ],
    icon: BrainIcon,
  },
  {
    id: 2,
    name: "Security Operations Center",
    tagline: "Unified security command center",
    description:
      "Centralized dashboard for monitoring all security events, incidents, and responses across your entire infrastructure.",
    features: ["24/7 monitoring", "Incident tracking", "Automated response"],
    icon: ShieldIcon,
  },
  {
    id: 3,
    name: "Penetration Testing",
    tagline: "Proactive vulnerability discovery",
    description:
      "Professional penetration testing services to identify and remediate vulnerabilities before attackers can exploit them.",
    features: ["Expert testing", "Detailed reports", "Remediation guidance"],
    icon: ZapIcon,
  },
  {
    id: 4,
    name: "Compliance Management",
    tagline: "Stay compliant effortlessly",
    description:
      "Automated compliance monitoring and reporting for GDPR, HIPAA, SOC 2, and other industry standards.",
    features: ["Automated audits", "Real-time reports", "Policy management"],
    icon: CheckCircleIcon,
  },
];

export function FeaturedProducts() {
  const { ref, isVisible } = useIntersectionObserver();
  const [activeProduct, setActiveProduct] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress >= 100) {
      setActiveProduct((current) => (current + 1) % products.length);
      setProgress(0);
    }
  }, [progress]);

  useEffect(() => {
    if (!isVisible) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => prev + 2);
    }, 100);

    return () => {
      clearInterval(progressInterval);
    };
  }, [isVisible]);

  const handleProductClick = (index: number) => {
    setActiveProduct(index);
    setProgress(0);
  };

  const activeProductData = products[activeProduct];
  const Icon = activeProductData.icon;

  return (
    <section
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-background border-b border-border"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="font-mono text-4xl sm:text-5xl text-foreground mb-4">
            Our Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Comprehensive cybersecurity solutions powered by artificial
            intelligence
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="flex flex-col w-full lg:w-auto lg:min-w-70">
            {products.map((product, index) => {
              const Icon = product.icon;
              const isActive = activeProduct === index;
              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => handleProductClick(index)}
                  className={cn(
                    "flex items-start gap-4 cursor-pointer p-4 text-left transition-all duration-300 relative",
                    isActive ? "bg-accent" : "hover:bg-muted/20",
                  )}
                >
                  {isActive && (
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1 bg-primary transition-all duration-100"
                      style={{
                        height: `${progress}%`,
                        transition: "height 0.1s linear",
                      }}
                    />
                  )}
                  <div
                    className={cn(
                      "w-10 h-10 rounded-sm flex items-center justify-center shrink-0 transition-colors",
                      isActive
                        ? "bg-accent/20 text-accent-foreground"
                        : "bg-border text-muted-foreground",
                    )}
                  >
                    <Icon className="w-5 h-5" strokeWidth={1} />
                  </div>
                  <div className="flex-1">
                    <h3
                      className={cn(
                        "font-semibold text-sm mb-1 transition-colors",
                        isActive ? "text-foreground" : "text-foreground/70",
                      )}
                    >
                      {product.name}
                    </h3>
                    <p
                      className={cn(
                        "text-xs transition-colors",
                        isActive
                          ? "text-accent-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      {product.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex-1 flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-sm bg-accent/10 flex items-center justify-center shrink-0">
                <Icon
                  className="w-6 h-6 text-accent-foreground"
                  strokeWidth={1}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-mono text-3xl sm:text-4xl text-foreground mb-2">
                  {activeProductData.name}
                </h3>
                <p className="text-accent-foreground font-semibold">
                  {activeProductData.tagline}
                </p>
              </div>
            </div>

            <p className="text-foreground/80 leading-relaxed">
              {activeProductData.description}
            </p>

            <div className="flex flex-col gap-3 mb-6">
              {activeProductData.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  <span className="text-sm text-foreground/80">{feature}</span>
                </div>
              ))}
            </div>

            <a
              href="/products"
              className="inline-flex items-center gap-2 text-accent-foreground font-semibold hover:gap-3 transition-all w-fit"
            >
              View all solutions →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
