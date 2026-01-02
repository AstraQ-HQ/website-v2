import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";
import { Globe } from "./globe";

export function HeroSection() {
  const { title, description, cta, tags } = siteConfig.pages.home.hero;

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16 bg-gradient-to-b from-secondary via-background to-background">
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-accent blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="flex flex-col max-w-3xl ml-auto lg:pr-12">
            <h1 className="font-mono text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 text-primary leading-tight break-words">
              {title}
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Button className="px-8 py-3 text-primary-foreground rounded-sm font-semibold hover:shadow-lg transition-all hover:scale-105">
                {cta.primary}
              </Button>
              <Button
                variant="outline"
                className="px-8 py-3 border border-primary text-primary rounded-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all bg-transparent"
              >
                {cta.secondary}
              </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              {tags.map((tag) => (
                <p
                  key={tag}
                  className="text-sm font-semibold text-foreground border-l-2 border-accent pl-3"
                >
                  {tag}
                </p>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center h-fit my-auto">
            <Globe />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDownIcon className="w-6 h-6 text-accent" strokeWidth={1} />
      </div>
    </section>
  );
}
