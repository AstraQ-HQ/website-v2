import { formatDate } from "date-fns";
import { NotepadText } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { allBlogsByDate, allCaseStudiesByDate } from "@/lib/content";

export function EmbedResource({
  slug,
  placeholder,
  resourceType,
}: {
  slug: string;
  placeholder?: string;
  resourceType: "blog" | "case-study";
}) {
  const href =
    resourceType === "blog"
      ? (`/blog/${slug}` as Route)
      : (`/case-studies/${slug}` as Route);
  const resource =
    resourceType === "blog"
      ? allBlogsByDate.find((blog) => blog.slug === slug)
      : allCaseStudiesByDate.find((caseStudy) => caseStudy.slug === slug);

  if (!resource) return null;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link
          className="no-underline! mx-1 inline-flex cursor-pointer items-center gap-1 rounded-sm border border-border bg-card px-1 py-0.5 text-foreground text-xs transition-colors duration-200 hover:bg-accent"
          href={href}
        >
          <NotepadText className="mr-1 size-3.5" strokeWidth={1} />
          {placeholder ?? resource.title}
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-sm md:w-lg">
        <div className="flex flex-col gap-2">
          <div className="text-muted-foreground text-sm">
            <Badge variant="outline">{resource.category}</Badge> •{" "}
            {formatDate(resource.publishedAt, "MMMM do, yyyy")} •{" "}
            {resource.readingTime}
          </div>
          <div className="font-semibold">{resource.title}</div>
          <div className="line-clamp-5 text-sm">{resource.summary}</div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
