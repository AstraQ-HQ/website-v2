"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { siteConfig } from "@/lib/constants";
import { allFeaturedProducts } from "@/lib/content";
import { cn } from "@/lib/utils";

export function FeaturedProducts() {
  const { ref, isVisible } = useIntersectionObserver();
  const [activeProduct, setActiveProduct] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress >= 100) {
      setActiveProduct((current) => (current + 1) % allFeaturedProducts.length);
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

  const activeProductData = allFeaturedProducts[activeProduct];

  return (
    <section
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-background border-b border-border"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="font-mono text-4xl sm:text-5xl text-foreground mb-4">
            {siteConfig.pages.home.featuredProducts.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {siteConfig.pages.home.featuredProducts.description}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="flex flex-col w-full lg:w-auto lg:min-w-70">
            {allFeaturedProducts.map((product, index) => {
              const isActive = activeProduct === index;
              return (
                <button
                  key={product.slug}
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
                  <Image
                    src={product.logo}
                    alt={product.name}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
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
              <Image
                src={activeProductData.logo}
                alt={activeProductData.name}
                width={48}
                height={48}
                className="object-contain"
              />
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

            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-accent-foreground font-semibold hover:gap-3 transition-all w-fit"
            >
              View all solutions →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
