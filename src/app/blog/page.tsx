"use client";

import { formatDate } from "date-fns";
import { CalendarIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { BlogBannerImage } from "@/components/blog-banner-image";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { allBlogsByDate } from "@/lib/content";
import { cn } from "@/lib/utils";

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const { ref, isVisible } = useIntersectionObserver();

  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      allBlogsByDate.map((blog) => blog.category),
    );
    return ["All", ...Array.from(uniqueCategories)];
  }, []);

  const filteredPosts = useMemo(() => {
    return allBlogsByDate.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.summary.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || blog.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const featuredPost = activeCategory === "All" ? filteredPosts[0] : null;
  const otherPosts = featuredPost
    ? filteredPosts.filter((p) => p.slug !== featuredPost.slug)
    : filteredPosts;

  return (
    <>
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-secondary via-background to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-mono text-5xl sm:text-6xl text-primary mb-4">
            Blog
          </h1>
          <p className="text-lg text-muted-foreground">
            Insights, news, and best practices from AstraQ
          </p>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 relative">
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

          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setActiveCategory(category)}
                variant={activeCategory === category ? "default" : "outline"}
                className={cn(
                  "px-4 py-2 rounded-sm font-semibold whitespace-nowrap",
                  activeCategory === category ? "text-primary-foreground" : "",
                )}
              >
                {category}
              </Button>
            ))}
          </div>
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
                    className="font-mono text-3xl text-primary mb-3 group-hover:text-accent-foreground transition-colors"
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
                    className="font-mono text-lg text-primary mb-2 group-hover:text-accent-foreground transition-colors"
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
