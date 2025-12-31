"use client";

import { useState } from "react";
import { ProductCard } from "@/app/_components/product-card";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { allProducts } from "@/lib/content";
import { cn } from "@/lib/utils";

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
                key={product.slug}
                className={cn(
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10",
                )}
                style={{
                  transition: `opacity 700ms ${index * 100}ms, transform 700ms ${index * 100}ms`,
                }}
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
