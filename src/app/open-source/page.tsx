"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { allOpenSources } from "@/lib/content";
import { cn } from "@/lib/utils";
import { OpenSourceCard } from "./_components/open-source-card";

const allTags = Array.from(
  new Set(allOpenSources.flatMap((p) => p.tags)),
).sort();

export default function OpenSourcePage() {
  const [activeTag, setActiveTag] = useState("All");
  const { ref, isVisible } = useIntersectionObserver();

  const filteredProjects = useMemo(() => {
    if (activeTag === "All") {
      return allOpenSources;
    }
    return allOpenSources.filter((p) => p.tags.includes(activeTag));
  }, [activeTag]);

  return (
    <>
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-secondary via-background to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-mono text-5xl sm:text-6xl text-foreground mb-4">
            Open Source
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore our open source projects and contribute to the cybersecurity
            community
          </p>
        </div>
      </section>

      <section className="sticky top-16 backdrop-blur border-b border-border py-4 px-4 sm:px-6 lg:px-8 z-40">
        <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto">
          <Button
            onClick={() => setActiveTag("All")}
            variant={activeTag === "All" ? "default" : "outline"}
            className="rounded-sm whitespace-nowrap"
          >
            All
          </Button>
          {allTags.map((tag) => (
            <Button
              key={tag}
              onClick={() => setActiveTag(tag)}
              variant={activeTag === tag ? "default" : "outline"}
              className="rounded-sm whitespace-nowrap"
            >
              {tag}
            </Button>
          ))}
        </div>
      </section>

      <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.slug}
                className={cn(
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10",
                )}
                style={{
                  transition: `opacity 700ms ${index * 100}ms, transform 700ms ${index * 100}ms`,
                }}
              >
                <OpenSourceCard project={project} />
              </div>
            ))}
          </div>
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No projects found matching your filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
