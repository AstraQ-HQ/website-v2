"use client";

import { CalendarIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

const blogPosts = [
  {
    id: 1,
    title: "The Future of AI-Powered Cybersecurity",
    excerpt:
      "Exploring how artificial intelligence is transforming threat detection and response capabilities.",
    category: "Technology",
    date: "Dec 20, 2024",
    readTime: "8 min",
    featured: true,
  },
  {
    id: 2,
    title: "Zero Trust Architecture: A Complete Guide",
    excerpt:
      "Understanding the principles of zero trust and how to implement them in your organization.",
    category: "Security",
    date: "Dec 18, 2024",
    readTime: "12 min",
    featured: false,
  },
  {
    id: 3,
    title: "GDPR Compliance: Common Mistakes and How to Avoid Them",
    excerpt:
      "A comprehensive look at GDPR compliance challenges and practical solutions for enterprises.",
    category: "Compliance",
    date: "Dec 15, 2024",
    readTime: "10 min",
    featured: false,
  },
  {
    id: 4,
    title: "Incident Response Best Practices",
    excerpt:
      "Learn the critical steps for effective incident response and minimizing security breach damage.",
    category: "Security",
    date: "Dec 12, 2024",
    readTime: "9 min",
    featured: false,
  },
  {
    id: 5,
    title: "Machine Learning in Threat Detection",
    excerpt:
      "How machine learning algorithms improve threat detection accuracy and reduce false positives.",
    category: "Technology",
    date: "Dec 10, 2024",
    readTime: "11 min",
    featured: false,
  },
  {
    id: 6,
    title: "Insider Threats: Prevention and Detection",
    excerpt:
      "Strategies for identifying and mitigating insider threats within your organization.",
    category: "Security",
    date: "Dec 8, 2024",
    readTime: "8 min",
    featured: false,
  },
];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const { ref, isVisible } = useIntersectionObserver();

  const categories = ["All", "Technology", "Security", "Compliance"];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost =
    filteredPosts.find((p) => p.featured) || filteredPosts[0];
  const otherPosts = filteredPosts.filter((p) => p.id !== featuredPost?.id);

  return (
    <>
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary via-background to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-mono text-5xl sm:text-6xl text-primary mb-4">
            Security Blog
          </h1>
          <p className="text-lg text-muted-foreground">
            Insights, news, and best practices in cybersecurity
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-secondary rounded-lg overflow-hidden border border-border p-8">
              <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg flex items-center justify-center">
                <div className="text-6xl">📰</div>
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-accent-foreground font-semibold text-sm mb-2">
                  Featured
                </span>
                <h2 className="font-mono text-3xl text-primary mb-3">
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <CalendarIcon size={16} strokeWidth={1} />{" "}
                    {featuredPost.date}
                  </span>
                  <span>{featuredPost.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section ref={ref} className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {otherPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPosts.map((post, index) => (
                <div
                  key={post.id}
                  className={cn(
                    "group p-6 bg-card border border-border rounded-lg hover:shadow-lg hover:border-accent hover:-translate-y-2",
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10",
                  )}
                  style={{
                    transition: `opacity 700ms ${index * 100}ms, transform 700ms ${index * 100}ms, box-shadow 300ms, border-color 300ms`,
                  }}
                >
                  <div className="w-full h-40 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-4xl">📝</div>
                  </div>
                  <span className="text-xs font-semibold text-accent-foreground bg-accent/10 px-3 py-1 rounded-sm inline-block mb-3">
                    {post.category}
                  </span>
                  <h3 className="font-mono text-lg text-primary mb-2 group-hover:text-accent-foreground transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CalendarIcon size={14} strokeWidth={1} /> {post.date}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
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
