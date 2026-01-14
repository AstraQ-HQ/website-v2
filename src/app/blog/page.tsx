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
import { BlogBannerImage } from "@/components/blog-banner-image";
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
import { allBlogsByDate } from "@/lib/content";
import { cn } from "@/lib/utils";

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const { ref, isVisible } = useIntersectionObserver();

  const { categories, categoryCounts } = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const blog of allBlogsByDate) {
      counts[blog.category] = (counts[blog.category] || 0) + 1;
    }
    return {
      categories: Object.keys(counts).sort(),
      categoryCounts: counts,
    };
  }, []);

  const filteredPosts = useMemo(() => {
    return allBlogsByDate.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.summary.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(blog.category);
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategories]);

  const featuredPost =
    selectedCategories.length === 0 ? filteredPosts[0] : null;
  const otherPosts = featuredPost ? filteredPosts.slice(1) : filteredPosts;

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const removeCategory = (category: string) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== category));
  };

  const clearAllCategories = () => {
    setSelectedCategories([]);
  };

  return (
    <>
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-secondary via-background to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-mono text-5xl sm:text-6xl text-foreground mb-4">
            Blog
          </h1>
          <p className="text-lg text-muted-foreground">
            Insights, news, and best practices from AstraQ
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
                placeholder="Search posts..."
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
                  {selectedCategories.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs font-semibold flex items-center justify-center">
                      {selectedCategories.length}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-0" align="end">
                <Command>
                  <CommandInput placeholder="Search categories..." />
                  <CommandList>
                    <CommandEmpty>No categories found.</CommandEmpty>
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
                  </CommandList>
                  {selectedCategories.length > 0 && (
                    <div className="border-t p-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-muted-foreground hover:text-foreground"
                        onClick={clearAllCategories}
                      >
                        Clear all filters
                      </Button>
                    </div>
                  )}
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {selectedCategories.length > 0 && (
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
              <button
                type="button"
                onClick={clearAllCategories}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </section>

      {featuredPost && (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Link href={`/blog/${featuredPost.slug}`} className="block group">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-card rounded-lg overflow-hidden border border-border p-8 transition-all group-hover:border-accent group-hover:shadow-lg">
                <div className="relative bg-linear-to-br from-accent/10 to-accent/5 rounded-lg overflow-hidden lg:min-h-[320px] aspect-3/2">
                  <BlogBannerImage
                    slug={featuredPost.slug}
                    title={featuredPost.title}
                    fill
                    className="object-cover"
                    preload
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-accent-foreground font-semibold text-sm">
                      Latest
                    </span>
                    {featuredPost.series && (
                      <span className="text-xs font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-sm">
                        {featuredPost.series.name} • Part{" "}
                        {featuredPost.series.part}
                      </span>
                    )}
                  </div>
                  <h2
                    className="font-mono text-3xl text-foreground mb-3 group-hover:text-accent-foreground transition-colors"
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: This is trusted content from our CMS
                    dangerouslySetInnerHTML={{ __html: featuredPost.htmlTitle }}
                  />
                  <p className="text-muted-foreground mb-4">
                    {featuredPost.summary}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CalendarIcon size={16} strokeWidth={1} />{" "}
                      {formatDate(featuredPost.publishedAt, "MMM d, yyyy")}
                    </span>
                    <span>{featuredPost.readingTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section ref={ref} className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {otherPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPosts.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
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
                    <BlogBannerImage
                      slug={post.slug}
                      title={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-accent-foreground bg-accent/10 px-3 py-1 rounded-sm">
                      {post.category}
                    </span>
                    {post.series && (
                      <span className="text-xs font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-sm">
                        {post.series.name} • Part {post.series.part}
                      </span>
                    )}
                  </div>
                  <h3
                    className="font-mono text-lg text-foreground mb-2 group-hover:text-accent-foreground transition-colors"
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: This is trusted content from our CMS
                    dangerouslySetInnerHTML={{ __html: post.htmlTitle }}
                  />
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {post.summary}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CalendarIcon size={14} strokeWidth={1} />{" "}
                      {formatDate(post.publishedAt, "MMM d, yyyy")}
                    </span>
                    <span>{post.readingTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No posts found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
