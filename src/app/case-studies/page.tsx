"use client";

import { formatDate } from "date-fns";
import {
  CalendarIcon,
  CheckIcon,
  FilterIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CaseStudyBannerImage } from "@/components/case-study-banner-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { allCaseStudiesByDate } from "@/lib/content";
import { cn } from "@/lib/utils";
import { AttackTypeBadges } from "./[slug]/_components/attack-type-badges";
import { SeverityBadge } from "./[slug]/_components/severity-badge";

export default function CaseStudiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAttackTypes, setSelectedAttackTypes] = useState<string[]>([]);
  const [selectedSeverities, setSelectedSeverities] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const { ref, isVisible } = useIntersectionObserver();

  const {
    categories,
    categoryCounts,
    attackTypes,
    attackTypeCounts,
    severities,
    severityCounts,
  } = useMemo(() => {
    const catCounts: Record<string, number> = {};
    const atCounts: Record<string, number> = {};
    const sevCounts: Record<string, number> = {};

    for (const caseStudy of allCaseStudiesByDate) {
      catCounts[caseStudy.category] = (catCounts[caseStudy.category] || 0) + 1;

      if (caseStudy.attackType) {
        for (const at of caseStudy.attackType) {
          atCounts[at] = (atCounts[at] || 0) + 1;
        }
      }

      if (caseStudy.severity) {
        sevCounts[caseStudy.severity] =
          (sevCounts[caseStudy.severity] || 0) + 1;
      }
    }

    return {
      categories: Object.keys(catCounts).sort(),
      categoryCounts: catCounts,
      attackTypes: Object.keys(atCounts).sort(),
      attackTypeCounts: atCounts,
      severities: Object.keys(sevCounts).sort(),
      severityCounts: sevCounts,
    };
  }, []);

  const filteredCaseStudies = useMemo(() => {
    return allCaseStudiesByDate.filter((caseStudy) => {
      const matchesSearch =
        caseStudy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseStudy.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseStudy.affectedOrganizations?.some((org) =>
          org.toLowerCase().includes(searchTerm.toLowerCase()),
        ) ||
        caseStudy.threatActors?.some((actor) =>
          actor.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(caseStudy.category);

      const matchesAttackType =
        selectedAttackTypes.length === 0 ||
        caseStudy.attackType.some((at) => selectedAttackTypes.includes(at));

      const matchesSeverity =
        selectedSeverities.length === 0 ||
        (caseStudy.severity && selectedSeverities.includes(caseStudy.severity));

      return (
        matchesSearch && matchesCategory && matchesAttackType && matchesSeverity
      );
    });
  }, [searchTerm, selectedCategories, selectedAttackTypes, selectedSeverities]);

  const featuredCaseStudy =
    selectedCategories.length === 0 &&
    selectedAttackTypes.length === 0 &&
    selectedSeverities.length === 0
      ? filteredCaseStudies[0]
      : null;
  const otherCaseStudies = featuredCaseStudy
    ? filteredCaseStudies.slice(1)
    : filteredCaseStudies;

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const toggleAttackType = (attackType: string) => {
    setSelectedAttackTypes((prev) =>
      prev.includes(attackType)
        ? prev.filter((at) => at !== attackType)
        : [...prev, attackType],
    );
  };

  const toggleSeverity = (severity: string) => {
    setSelectedSeverities((prev) =>
      prev.includes(severity)
        ? prev.filter((s) => s !== severity)
        : [...prev, severity],
    );
  };

  const removeCategory = (category: string) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== category));
  };

  const removeAttackType = (attackType: string) => {
    setSelectedAttackTypes((prev) => prev.filter((at) => at !== attackType));
  };

  const removeSeverity = (severity: string) => {
    setSelectedSeverities((prev) => prev.filter((s) => s !== severity));
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedAttackTypes([]);
    setSelectedSeverities([]);
  };

  const totalActiveFilters =
    selectedCategories.length +
    selectedAttackTypes.length +
    selectedSeverities.length;

  return (
    <>
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-secondary via-background to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-mono text-5xl sm:text-6xl text-primary mb-4">
            Case Studies
          </h1>
          <p className="text-lg text-muted-foreground">
            In-depth analyses of past cyber attacks and security incidents
          </p>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-3 items-center">
            <div className="flex-1 relative">
              <SearchIcon
                className="absolute left-3 top-3 text-muted-foreground"
                size={20}
                strokeWidth={1}
              />
              <input
                type="text"
                placeholder="Search case studies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
              />
            </div>

            <Popover open={filterOpen} onOpenChange={setFilterOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 shrink-0 relative border-border!"
                >
                  <FilterIcon size={20} strokeWidth={1.5} />
                  {totalActiveFilters > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs font-semibold flex items-center justify-center">
                      {totalActiveFilters}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-0" align="end">
                <Command>
                  <CommandInput placeholder="Search filters..." />
                  <CommandList>
                    <CommandEmpty>No filters found.</CommandEmpty>
                    <CommandGroup heading="Categories">
                      {categories.map((category) => (
                        <CommandItem
                          key={category}
                          value={category}
                          onSelect={() => toggleCategory(category)}
                          className="cursor-pointer"
                        >
                          <div
                            className={cn(
                              "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                              selectedCategories.includes(category)
                                ? "bg-primary text-primary-foreground"
                                : "opacity-50 [&_svg]:invisible",
                            )}
                          >
                            <CheckIcon className="h-3 w-3" />
                          </div>
                          <span className="flex-1">{category}</span>
                          <span className="text-muted-foreground text-xs">
                            {categoryCounts[category] || 0}
                          </span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                    <CommandGroup heading="Attack Types">
                      {attackTypes.map((attackType) => (
                        <CommandItem
                          key={attackType}
                          value={attackType}
                          onSelect={() => toggleAttackType(attackType)}
                          className="cursor-pointer"
                        >
                          <div
                            className={cn(
                              "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                              selectedAttackTypes.includes(attackType)
                                ? "bg-primary text-primary-foreground"
                                : "opacity-50 [&_svg]:invisible",
                            )}
                          >
                            <CheckIcon className="h-3 w-3" />
                          </div>
                          <span className="flex-1">{attackType}</span>
                          <span className="text-muted-foreground text-xs">
                            {attackTypeCounts[attackType] || 0}
                          </span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                    <CommandGroup heading="Severity">
                      {severities.map((severity) => (
                        <CommandItem
                          key={severity}
                          value={severity}
                          onSelect={() => toggleSeverity(severity)}
                          className="cursor-pointer"
                        >
                          <div
                            className={cn(
                              "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                              selectedSeverities.includes(severity)
                                ? "bg-primary text-primary-foreground"
                                : "opacity-50 [&_svg]:invisible",
                            )}
                          >
                            <CheckIcon className="h-3 w-3" />
                          </div>
                          <span className="flex-1">{severity}</span>
                          <span className="text-muted-foreground text-xs">
                            {severityCounts[severity] || 0}
                          </span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                  {totalActiveFilters > 0 && (
                    <div className="border-t p-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-muted-foreground hover:text-foreground"
                        onClick={clearAllFilters}
                      >
                        Clear all filters
                      </Button>
                    </div>
                  )}
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {(selectedCategories.length > 0 ||
            selectedAttackTypes.length > 0 ||
            selectedSeverities.length > 0) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedCategories.map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="pl-3 pr-1.5 py-1.5 gap-1.5 cursor-pointer rounded-none border-border"
                  onClick={() => removeCategory(category)}
                >
                  {category}
                  <XIcon className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
                </Badge>
              ))}
              {selectedAttackTypes.map((attackType) => (
                <Badge
                  key={attackType}
                  variant="secondary"
                  className="pl-3 pr-1.5 py-1.5 gap-1.5 cursor-pointer rounded-none border-border"
                  onClick={() => removeAttackType(attackType)}
                >
                  {attackType}
                  <XIcon className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
                </Badge>
              ))}
              {selectedSeverities.map((severity) => (
                <Badge
                  key={severity}
                  variant="secondary"
                  className="pl-3 pr-1.5 py-1.5 gap-1.5 cursor-pointer rounded-none border-border"
                  onClick={() => removeSeverity(severity)}
                >
                  {severity}
                  <XIcon className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
                </Badge>
              ))}
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </section>

      {featuredCaseStudy && (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Link
              href={`/case-studies/${featuredCaseStudy.slug}`}
              className="block group"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-card rounded-lg overflow-hidden border border-border p-8 transition-all group-hover:border-accent group-hover:shadow-lg">
                <div className="relative bg-linear-to-br from-accent/10 to-accent/5 rounded-lg overflow-hidden lg:min-h-[320px] aspect-3/2">
                  <CaseStudyBannerImage
                    slug={featuredCaseStudy.slug}
                    title={featuredCaseStudy.title}
                    fill
                    className="object-cover"
                    preload
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-accent-foreground font-semibold text-sm">
                      Latest
                    </span>
                    {featuredCaseStudy.severity && (
                      <SeverityBadge severity={featuredCaseStudy.severity} />
                    )}
                    {featuredCaseStudy.attackType &&
                      featuredCaseStudy.attackType.length > 0 && (
                        <AttackTypeBadges
                          attackTypes={featuredCaseStudy.attackType}
                        />
                      )}
                  </div>
                  <h2
                    className="font-mono text-3xl text-primary mb-3 group-hover:text-accent-foreground transition-colors"
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: This is trusted content from our CMS
                    dangerouslySetInnerHTML={{
                      __html: featuredCaseStudy.htmlTitle,
                    }}
                  />
                  <p className="text-muted-foreground mb-4">
                    {featuredCaseStudy.summary}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <CalendarIcon size={16} strokeWidth={1} />{" "}
                      {formatDate(featuredCaseStudy.attackDate, "MMM d, yyyy")}
                    </span>
                    <span>{featuredCaseStudy.readingTime}</span>
                  </div>
                  {featuredCaseStudy.affectedOrganizations &&
                    featuredCaseStudy.affectedOrganizations.length > 0 && (
                      <div className="text-xs text-muted-foreground">
                        Affected:{" "}
                        {featuredCaseStudy.affectedOrganizations
                          .slice(0, 3)
                          .join(", ")}
                        {featuredCaseStudy.affectedOrganizations.length > 3 &&
                          "..."}
                      </div>
                    )}
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section ref={ref} className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {otherCaseStudies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherCaseStudies.map((caseStudy, index) => (
                <Link
                  key={caseStudy.slug}
                  href={`/case-studies/${caseStudy.slug}`}
                  className={cn(
                    "group block p-6 bg-card border border-border rounded-lg hover:shadow-lg hover:border-accent hover:-translate-y-2",
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10",
                  )}
                  style={{
                    transition: `opacity 700ms ${index * 100}ms, transform 700ms ${index * 100}ms, box-shadow 300ms, border-color 300ms`,
                  }}
                >
                  <div className="relative w-full bg-linear-to-br from-accent/10 to-accent/5 rounded-lg mb-4 overflow-hidden aspect-3/2">
                    <CaseStudyBannerImage
                      slug={caseStudy.slug}
                      title={caseStudy.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-accent-foreground bg-accent/10 px-3 py-1 rounded-sm">
                      {caseStudy.category}
                    </span>
                    {caseStudy.severity && (
                      <SeverityBadge
                        severity={caseStudy.severity}
                        className="text-xs"
                      />
                    )}
                  </div>
                  {caseStudy.attackType && caseStudy.attackType.length > 0 && (
                    <div className="mb-3">
                      <AttackTypeBadges
                        attackTypes={caseStudy.attackType}
                        className="gap-1"
                      />
                    </div>
                  )}
                  <h3
                    className="font-mono text-lg text-primary mb-2 group-hover:text-accent-foreground transition-colors"
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: This is trusted content from our CMS
                    dangerouslySetInnerHTML={{ __html: caseStudy.htmlTitle }}
                  />
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {caseStudy.summary}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CalendarIcon size={14} strokeWidth={1} />{" "}
                      {formatDate(caseStudy.attackDate, "MMM d, yyyy")}
                    </span>
                    <span>{caseStudy.readingTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No case studies found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
