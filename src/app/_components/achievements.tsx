"use client";

import { ChevronLeftIcon, ChevronRightIcon, AwardIcon, TrophyIcon, ArrowRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { allAchievements } from "@/lib/content";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ICON_MAP = {
    Trophy: TrophyIcon,
    Award: AwardIcon,
};

export function Achievements() {
    const [current, setCurrent] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);

    useEffect(() => {
        if (!autoPlay || allAchievements.length <= 1) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % allAchievements.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [autoPlay]);

    if (allAchievements.length === 0) {
        return null;
    }

    const next = () => {
        setCurrent((prev) => (prev + 1) % allAchievements.length);
        setAutoPlay(false);
    };

    const prev = () => {
        setCurrent(
            (prev) => (prev - 1 + allAchievements.length) % allAchievements.length,
        );
        setAutoPlay(false);
    };

    const achievement = allAchievements[current];
    const Icon = ICON_MAP[achievement.icon as keyof typeof ICON_MAP] || AwardIcon;

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
            <div className="max-w-6xl mx-auto">
                <h2 className="font-mono text-4xl sm:text-5xl text-foreground mb-16 text-center">
                    Our Achievements
                </h2>

                <div className="relative bg-background rounded-sm p-8 md:p-12 border border-border">
                    <div className="min-h-48 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-accent/10 rounded-sm text-accent-foreground">
                                <Icon size={24} />
                            </div>
                            <span className="font-mono text-sm uppercase tracking-wider text-muted-foreground">
                                {new Date(achievement.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </span>
                        </div>

                        <h3 className="text-xl md:text-2xl font-mono mb-4 text-foreground leading-tight">
                            {achievement.title}
                        </h3>

                        <p className="text-muted-foreground mb-6 max-w-3xl leading-relaxed">
                            {achievement.description}
                        </p>

                        {achievement.blogSlug && (
                            <div>
                                <Button asChild variant="link" className="px-0 text-accent-foreground hover:text-accent font-mono group h-auto py-0">
                                    <Link href={`/blog/${achievement.blogSlug}`} className="flex items-center gap-2">
                                        Read Story <ArrowRightIcon size={16} className="transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-between mt-8">
                        <div className="flex gap-2">
                            {allAchievements.map((_, index) => (
                                <button
                                    key={index}
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
                                disabled={allAchievements.length <= 1}
                            >
                                <ChevronLeftIcon size={20} strokeWidth={1} />
                            </Button>
                            <Button
                                onClick={next}
                                variant="outline"
                                className="p-2 hover:bg-border rounded-sm transition-colors"
                                disabled={allAchievements.length <= 1}
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
