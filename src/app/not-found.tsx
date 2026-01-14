import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GoBackButton } from "./_components/go-back-button";

export default function NotFound() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-linear-to-b from-secondary via-background to-background">
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary blur-3xl" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col items-center max-w-2xl mx-auto">
          <h1 className="font-mono text-[8rem] sm:text-[12rem] md:text-[16rem] font-bold text-foreground leading-none select-none">
            404
          </h1>

          <h2 className="font-mono text-2xl sm:text-3xl md:text-4xl text-foreground mb-4">
            Page Not Found
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed max-w-md">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Let&apos;s get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              className="px-8 py-3 text-primary-foreground font-semibold hover:shadow-lg transition-all hover:scale-105"
              asChild
            >
              <Link href="/">
                <HomeIcon className="w-4 h-4 mr-2" />
                Go Home
              </Link>
            </Button>
            <GoBackButton />
          </div>
        </div>
      </div>
    </section>
  );
}
