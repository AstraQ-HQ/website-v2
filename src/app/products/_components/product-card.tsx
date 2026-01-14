"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/content";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group p-8 bg-card border border-border rounded-sm hover:shadow-lg hover:border-accent transition-all duration-300 hover:-translate-y-2">
      <div className="flex items-start justify-start gap-4">
        <Image
          src={product.logo}
          alt={product.name}
          width={48}
          height={48}
          className="object-contain"
        />
        <div>
          <h3 className="font-mono text-2xl text-foreground mb-1">
            {product.name}
          </h3>
          <p className="text-sm text-accent-foreground font-semibold mb-3">
            {product.tagline}
          </p>
        </div>
      </div>
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
