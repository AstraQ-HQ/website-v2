import { NextResponse } from "next/server";
import { allBlogsByDate } from "@/lib/content";

export const dynamic = "force-static";
export const revalidate = false;

export async function generateStaticParams() {
  return allBlogsByDate.map((blog) => ({ slug: blog.slug }));
}

export async function GET(
  _request: Request,
  { params }: RouteContext<"/blog/[slug]/mdx">,
) {
  const { slug } = await params;
  const blog = allBlogsByDate.find((b) => b.slug === slug);

  if (!blog) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  return new NextResponse(blog.content, {
    headers: {
      "Content-Type": "text/mdx; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable",
      "CDN-Cache-Control": "public, max-age=31536000, immutable",
      "Vercel-CDN-Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
