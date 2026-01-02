"use client";

import { ChevronLeftIcon, ChevronRightIcon, QuoteIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";
import { allTestimonials } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % allTestimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const next = () => {
    setCurrent((prev) => (prev + 1) % allTestimonials.length);
    setAutoPlay(false);
  };

  const prev = () => {
    setCurrent(
      (prev) => (prev - 1 + allTestimonials.length) % allTestimonials.length,
    );
    setAutoPlay(false);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-mono text-4xl sm:text-5xl text-primary mb-16 text-center">
          {siteConfig.pages.home.testimonials.title}
        </h2>

        <div className="relative bg-background rounded-sm p-8 md:p-12 border border-border">
          <div className="min-h-48 flex flex-col justify-center">
            <QuoteIcon
              className="w-8 h-8 text-accent-foreground mb-4 opacity-50"
              strokeWidth={1}
            />
            <blockquote className="text-xl md:text-2xl font-mono mb-6 text-primary leading-relaxed">
              "{allTestimonials[current].quote}"
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-sm flex items-center justify-center font-semibold text-accent-foreground">
                {allTestimonials[current].initials}
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {allTestimonials[current].author}
                </p>
                <p className="text-sm text-muted-foreground">
                  {allTestimonials[current].company}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {allTestimonials.map((testimonial, index) => (
                <button
                  key={`${index}-${testimonial.author}`}
                  type="button"
                  onClick={() => {
                    setCurrent(index);
                    setAutoPlay(false);
                  }}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    index === current
                      ? "bg-accent-foreground w-8"
                      : "bg-border",
                  )}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <Button
                onClick={prev}
                variant="outline"
                className="p-2 hover:bg-border rounded-sm transition-colors"
              >
                <ChevronLeftIcon size={20} strokeWidth={1} />
              </Button>
              <Button
                onClick={next}
                variant="outline"
                className="p-2 hover:bg-border rounded-sm transition-colors"
              >
                <ChevronRightIcon size={20} strokeWidth={1} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
