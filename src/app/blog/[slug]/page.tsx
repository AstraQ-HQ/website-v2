import { formatDate } from "date-fns";
import { Share2Icon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Linkedin, XDark } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { allBlogsByDate } from "@/lib/content";
import { Mdx } from "./_components/mdx";
import {
  DesktopTableOfContents,
  MobileTableOfContents,
} from "./_components/toc";
import "@/styles/mdx.css";
import "@/styles/shiki.css";
import "katex/dist/katex.min.css";
import logo from "@/app/icon.svg";
import { env } from "@/env";
import { siteConfig } from "@/lib/constants";

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const blog = allBlogsByDate.find((blog) => blog.slug === slug);

  const ogImageUrl = `${env.NEXT_PUBLIC_BASE_URL}/blog/${slug}/opengraph-image`;

  return {
    title: `${blog?.title} | AstraQ Blog`,
    description: blog?.summary,
    keywords: blog?.category && [blog.category, "blog", "astraq", "technology"],
    openGraph: {
      title: blog?.title,
      description: blog?.summary,
      type: "article",
      publishedTime: blog?.publishedAt.toISOString(),
      authors: [blog?.author.name ?? "AstraQ"],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: blog?.title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog?.title,
      description: blog?.summary,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: blog?.title,
          type: "image/png",
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  return allBlogsByDate.map((blog) => ({ slug: blog.slug }));
}

export default async function Page({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const blog = allBlogsByDate.find((blog) => blog.slug === slug);

  if (!blog) {
    notFound();
  }

  const path = `/blog/${blog.slug}`;

  return (
    <div className="pt-20 md:pt-40">
      <article className="container-custom px-4 section-spacing relative">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="mb-4 font-medium text-muted-foreground text-sm">
                <Badge variant="outline">{blog.category}</Badge> •{" "}
                {formatDate(blog.publishedAt, "MMMM do, yyyy")} •{" "}
                {blog.readingTime}
              </div>
              <h1
                className="mb-6 font-mono text-4xl md:text-5xl lg:text-5xl"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: This is trusted content from our CMS
                dangerouslySetInnerHTML={{ __html: blog.htmlTitle }}
              />
              <p className="mb-6 text-muted-foreground font-mono">
                {blog.summary}
              </p>
              <div className="flex items-center gap-4 font-sm">
                <Image src={logo} alt={siteConfig.name} className="w-8 h-8" />
                <div>
                  By <span className="font-mono">{blog.author.name}</span>
                </div>
                <div className="grow" />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Share2Icon className="size-4" strokeWidth={1} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-fit p-0">
                    <div className="flex flex-col">
                      <Link
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(path)}`}
                        className="flex flex-row items-center gap-2 p-4"
                      >
                        <Linkedin className="size-4" />
                      </Link>
                      <Link
                        href={`https://x.com/intent/post?url=${encodeURIComponent(path)}`}
                        className="flex flex-row items-center gap-2 p-4"
                      >
                        <XDark className="size-4" />
                      </Link>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="aspect-16/9 overflow-hidden rounded-lg">
                <Image
                  alt={blog.title}
                  className="h-full w-full object-cover"
                  height={600}
                  src={blog.banner ?? `/images/blogs/${blog.slug}.png`}
                  width={1200}
                  priority
                  unoptimized
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>

          <MobileTableOfContents headings={blog.headings} />

          <div className="grid grid-cols-1 md:grid-cols-[1fr_250px] relative gap-8">
            <div className="prose prose-lg min-w-0">
              <Mdx code={blog.html} />
            </div>
            <DesktopTableOfContents headings={blog.headings} />
          </div>
        </div>
      </article>
    </div>
  );
}
