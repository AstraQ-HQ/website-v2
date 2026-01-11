import { type NextRequest, NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const match = pathname.match(/^\/blog\/(.+)\.mdx$/);
  if (match) {
    const slug = match[1];
    const url = request.nextUrl.clone();
    url.pathname = `/blog/${slug}/mdx`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/blog/(.+\\.mdx)",
};
