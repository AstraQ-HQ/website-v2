import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DotPattern } from "@/components/ui/dot-pattern";
import { siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const { title, description, cta } = siteConfig.pages.home.hero;
  const { backers } = siteConfig.pages.home.backedBy;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <DotPattern
        className={cn(
          "mask-[radial-gradient(700px_circle_at_center,white,transparent)]",
        )}
      />
      <div className="relative max-w-6xl mx-auto z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="font-mono text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 text-primary leading-tight">
            {title}
          </h1>

          <p className="text-lg sm:text-xl text-foreground/80 mb-8 leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
            <Button
              className="px-8 py-3 text-primary-foreground font-semibold hover:shadow-lg transition-all hover:scale-105"
              asChild
            >
              <Link href={cta.primary.href}>{cta.primary.text}</Link>
            </Button>
            <Button variant="outline" className="px-8 py-3" asChild>
              <Link href={cta.secondary.href}>{cta.secondary.text}</Link>
            </Button>
          </div>

          <div className="flex flex-row flex-wrap gap-8 items-center justify-center">
            {backers.map((backer) => (
              <div
                key={backer.name}
                className="h-12 rounded-sm p-1 bg-white flex items-center"
              >
                <Image
                  src={backer.logo}
                  alt={backer.name}
                  width={200}
                  height={40}
                  className="object-contain h-10"
                  style={{ width: "auto" }}
                />
                <span className="sr-only">{backer.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
