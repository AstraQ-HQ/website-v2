import { type NextRequest, NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const blogMatch = pathname.match(/^\/(blog|case-studies)\/(.+)\.mdx$/);
  if (blogMatch) {
    const resourceType = blogMatch[1];
    const slug = blogMatch[2];
    const url = request.nextUrl.clone();
    url.pathname = `/${resourceType}/${slug}/mdx`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/blog/(.+\\.mdx)", "/case-studies/(.+\\.mdx)"],
};
