"use client";

import { MenuIcon, XIcon } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: { label: string; href: Route }[] = [
    { label: "Products", href: "/products" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "#why-astraq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-secondary shadow-sm" : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                A
              </span>
            </div>
            <span className="hidden sm:inline font-mono text-xl text-primary">
              AstraQ
            </span>
          </Link>

          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-foreground hover:text-accent-foreground transition-colors text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Button className="hidden md:block">Book Demo</Button>

          <Button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            variant="outline"
            className="md:hidden p-2 text-foreground"
          >
            {isMobileMenuOpen ? (
              <XIcon size={24} strokeWidth={1} />
            ) : (
              <MenuIcon size={24} strokeWidth={1} />
            )}
          </Button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block py-2 text-foreground hover:text-accent-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Button className="w-full mt-4">Book Demo</Button>
          </div>
        )}
      </div>
    </nav>
  );
}
