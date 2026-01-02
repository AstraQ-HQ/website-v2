import { formatDate } from "date-fns";
import { NotepadText } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { allBlogsByDate } from "@/lib/content";

export function EmbedBlog({
  slug,
  placeholder,
}: {
  slug: string;
  placeholder?: string;
}) {
  const blog = allBlogsByDate.find((blog) => blog.slug === slug);
  if (!blog) return null;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link
          className="no-underline! mx-1 inline-flex cursor-pointer items-center gap-1 rounded-sm border border-border bg-secondary px-1 py-0.5 text-foreground text-sm transition-colors duration-200 hover:bg-accent"
          href={`/blog/${blog.slug}`}
        >
          <NotepadText className="mr-1 h-4 w-4" />
          {placeholder ?? blog.title}
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-sm md:w-lg">
        <div className="flex flex-col gap-2">
          <div className="text-muted-foreground text-sm">
            <Badge variant="outline">{blog.category}</Badge> •{" "}
            {formatDate(blog.publishedAt, "MMMM do, yyyy")} • {blog.readingTime}
          </div>
          <div className="font-semibold">{blog.title}</div>
          <div className="line-clamp-5 text-sm">{blog.summary}</div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
