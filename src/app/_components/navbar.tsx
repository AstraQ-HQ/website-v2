"use client";

import { ChevronDownIcon, MenuIcon, XIcon } from "lucide-react";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "@/app/icon.svg";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  type NavItemType,
  type NavItemWithDropdown,
  siteConfig,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

function isNavItemWithDropdown(item: NavItemType): item is NavItemWithDropdown {
  return "items" in item;
}

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const router = useRouter();

  const handleMobileLinkClick = (href: Route) => {
    setIsOpen(false);
    router.push(href);
  };

  useEffect(() => {
    let lastScrollTime = 0;
    const throttleMs = 100;

    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime < throttleMs) return;
      lastScrollTime = now;
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
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
            <Image src={logo} alt={siteConfig.name} className="w-8 h-8" />
            <span className="font-mono text-xl text-primary">
              {siteConfig.name}
            </span>
          </Link>

          <div className="hidden md:flex gap-8">
            {siteConfig.header.navItems.map((item) => {
              if (isNavItemWithDropdown(item)) {
                return (
                  // biome-ignore lint/a11y: Required
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <Popover
                      open={openDropdown === item.label}
                      onOpenChange={(open) =>
                        setOpenDropdown(open ? item.label : null)
                      }
                    >
                      <PopoverTrigger asChild>
                        <p
                  className="text-foreground hover:text-accent-foreground transition-colors text-sm font-medium gap-1 flex items-center cursor-pointer"
                        >
                          {item.label}
                          <ChevronDownIcon size={16} />
                        </p>
                      </PopoverTrigger>
                      <PopoverContent className="w-48 p-2" align="start">
                        <div className="flex flex-col gap-1">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href as Route}
                              className="px-3 py-2 rounded-sm text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                );
              }
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-foreground hover:text-accent-foreground transition-colors text-sm font-medium"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <Button className="hidden md:block" asChild>
            <Link href={siteConfig.header.cta.href}>
              {siteConfig.header.cta.text}
            </Link>
          </Button>

          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <MenuIcon size={24} strokeWidth={1} />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="p-6">
                <SheetHeader className="p-0 flex flex-row items-center justify-between space-y-0">
                  <SheetTitle className="text-left flex items-center gap-2">
                    <Image
                      src={logo}
                      alt={siteConfig.name}
                      className="w-8 h-8"
                    />
                    {siteConfig.name}
                  </SheetTitle>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="-mr-2">
                      <XIcon size={24} strokeWidth={1} />
                      <span className="sr-only">Close</span>
                    </Button>
                  </SheetClose>
                  <SheetDescription className="sr-only">
                    Mobile navigation menu
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  {siteConfig.header.navItems.map((item) => {
                    if (isNavItemWithDropdown(item)) {
                      return (
                        <div key={item.label} className="flex flex-col gap-2">
                          <div className="text-foreground text-lg font-medium">
                            {item.label}
                          </div>
                          <div className="flex flex-col gap-2 pl-4">
                            {item.items.map((subItem) => (
                              // biome-ignore lint/a11y: Required
                              <div
                                key={subItem.label}
                                onClick={() =>
                                  handleMobileLinkClick(subItem.href as Route)
                                }
                                className="text-foreground hover:text-accent-foreground transition-colors text-base cursor-pointer"
                              >
                                {subItem.label}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return (
                      // biome-ignore lint/a11y: Required
                      <div
                        key={item.label}
                        onClick={() =>
                          handleMobileLinkClick(item.href as Route)
                        }
                        className="text-foreground hover:text-accent-foreground transition-colors text-lg font-medium cursor-pointer"
                      >
                        {item.label}
                      </div>
                    );
                  })}
                </div>
                <SheetFooter className="p-0 mt-4">
                  <Button className="w-full" asChild>
                    <Link href={siteConfig.header.cta.href}>
                      {siteConfig.header.cta.text}
                    </Link>
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
