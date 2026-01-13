import { NextResponse } from "next/server";
import { allCaseStudiesByDate } from "@/lib/content";

export const dynamic = "force-static";
export const revalidate = false;

export async function generateStaticParams() {
  return allCaseStudiesByDate.map((caseStudy) => ({ slug: caseStudy.slug }));
}

export async function GET(
  _request: Request,
  { params }: RouteContext<"/case-studies/[slug]/mdx">,
) {
  const { slug } = await params;
  const caseStudy = allCaseStudiesByDate.find((c) => c.slug === slug);

  if (!caseStudy) {
    return NextResponse.json({ error: "Case study not found" }, { status: 404 });
  }

  return new NextResponse(caseStudy.content, {
    headers: {
      "Content-Type": "text/mdx; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable",
      "CDN-Cache-Control": "public, max-age=31536000, immutable",
      "Vercel-CDN-Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
