"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import type { Product } from "@/lib/content";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group p-8 bg-card border border-border rounded-sm hover:shadow-lg hover:border-accent transition-all duration-300 hover:-translate-y-2">
      <div className="w-12 h-12 bg-accent/10 rounded-sm flex items-center justify-center mb-4 group-hover:bg-accent/15 transition-colors">
        <Icon
          name={product.icon}
          className="w-6 h-6 text-accent-foreground"
          strokeWidth={1}
        />
      </div>
      <h3 className="font-mono text-2xl text-primary mb-1">{product.name}</h3>
      <p className="text-sm text-accent-foreground font-semibold mb-3">
        {product.tagline}
      </p>
      <p className="text-muted-foreground mb-4">{product.description}</p>

      <ul className="space-y-2 mb-6">
        {product.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm">
            <span className="w-1 h-1 bg-accent-foreground"></span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href="#"
        className="text-accent-foreground font-semibold hover:gap-2 inline-flex items-center gap-1 transition-all"
      >
        Learn More →
      </Link>
    </div>
  );
}
