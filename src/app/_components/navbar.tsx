"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleMobileLinkClick = (href: Route) => {
    setIsOpen(false);
    router.push(href);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
                {siteConfig.name.charAt(0)}
              </span>
            </div>
            <span className="hidden sm:inline font-mono text-xl text-primary">
              {siteConfig.name}
            </span>
          </Link>

          <div className="hidden md:flex gap-8">
            {siteConfig.header.navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-foreground hover:text-accent-foreground transition-colors text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Button className="hidden md:block">{siteConfig.header.cta}</Button>

          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <MenuIcon size={24} strokeWidth={1} />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="p-6">
                <SheetHeader className="p-0">
                  <SheetTitle className="text-left flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-lg">
                        {siteConfig.name.charAt(0)}
                      </span>
                    </div>
                    {siteConfig.name}
                  </SheetTitle>
                  <SheetDescription className="hidden">
                    Mobile navigation menu
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  {siteConfig.header.navItems.map((item) => (
                    <div
                      key={item.label}
                      onClick={() => handleMobileLinkClick(item.href)}
                      className="text-foreground hover:text-accent-foreground transition-colors text-lg font-medium cursor-pointer"
                    >
                      {item.label}
                    </div>
                  ))}
                  <Button className="w-full mt-4">{siteConfig.header.cta}</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
