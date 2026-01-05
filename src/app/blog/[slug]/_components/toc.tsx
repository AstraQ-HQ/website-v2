"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useActiveHeading } from "@/hooks/use-active-heading";
import type { Blog } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";

interface TableOfContentsProps {
  headings: Blog["headings"];
  className?: string;
}

export function MobileTableOfContents({ headings }: TableOfContentsProps) {
  return (
    <div className="my-8 w-full rounded-lg border md:hidden">
      <div className="rounded-t-lg border-b bg-muted p-4 font-medium text-xl">
        Table of Contents
      </div>
      <div className="max-h-[320px] overflow-y-auto pr-2">
        <ul className="space-y-1">
          {headings.map((heading) => (
            <li key={heading.slug}>
              <Link
                className="flex items-center truncate py-1 text-lg text-muted-foreground transition-colors hover:text-primary"
                href={`#${heading.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(heading.slug)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{ paddingLeft: `${heading.depth * 10}px` }}
              >
                <span className="mr-2">•</span>
                <span className="truncate text-base font-medium">
                  {heading.value}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function DesktopTableOfContents({ headings }: TableOfContentsProps) {
  const activeId = useActiveHeading(headings);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkOverflow = () => {
      setIsOverflowing(container.scrollHeight > container.clientHeight);
    };

    checkOverflow();
    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const activeElement = document.getElementById(`toc-${activeId}`);
    if (!activeId || !container || !activeElement) return;

    const containerRect = container.getBoundingClientRect();
    const elementRect = activeElement.getBoundingClientRect();
    const offset = 40;

    if (elementRect.top < containerRect.top + offset) {
      container.scrollBy({
        top: elementRect.top - containerRect.top - offset,
        behavior: "smooth",
      });
    } else if (elementRect.bottom > containerRect.bottom - offset) {
      container.scrollBy({
        top: elementRect.bottom - containerRect.bottom + offset,
        behavior: "smooth",
      });
    }
  }, [activeId]);

  return (
    <div className="hidden md:block sticky top-24 h-fit space-y-4">
      <div
        ref={containerRef}
        className="relative overflow-y-auto rounded-lg p-4 max-h-[calc(100vh-16rem)]"
      >
        <p className="text-xl font-mono mb-2">On this page</p>
        <ul className="space-y-1">
          {headings.map((heading) => (
            <li key={heading.slug} id={`toc-${heading.slug}`}>
              <Link
                className={cn(
                  "flex items-center truncate py-1 text-lg transition-colors hover:text-primary",
                  activeId === heading.slug
                    ? "text-primary font-semibold"
                    : "text-muted-foreground",
                )}
                href={`#${heading.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(heading.slug)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{ paddingLeft: `${(heading.depth - 1) * 10}px` }}
              >
                <ChevronRightIcon className="size-3 text-foreground mr-2" strokeWidth={1} />
                <span
                  className={cn(
                    "truncate text-base font-medium",
                    activeId === heading.slug && "underline",
                  )}
                >
                  {heading.value}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {isOverflowing && (
          <div className="sticky -bottom-4 -mx-4 left-0 right-0 rounded-b-lg h-12 bg-linear-to-t from-card to-transparent pointer-events-none" />
        )}
      </div>
    </div>
  );
}
