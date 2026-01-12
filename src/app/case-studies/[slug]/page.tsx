import { formatDate } from "date-fns";
import { Share2Icon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Mdx } from "@/app/blog/[slug]/_components/mdx";
import {
  DesktopTableOfContents,
  MobileTableOfContents,
} from "@/app/blog/[slug]/_components/toc";
import { Linkedin, XDark } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { allCaseStudiesByDate } from "@/lib/content";
import "@/styles/mdx.css";
import "@/styles/shiki.css";
import "katex/dist/katex.min.css";
import { ScrollProgress } from "@/app/blog/[slug]/_components/scroll-progress";
import logo from "@/app/icon.svg";
import { CaseStudyBannerImage } from "@/components/case-study-banner-image";
import { env } from "@/env";
import { siteConfig } from "@/lib/constants";
import { AttackTypeBadges } from "./_components/attack-type-badges";
import { LessonsLearned } from "./_components/lessons-learned";
import { RelatedCVEs } from "./_components/related-cves";
import { SeverityBadge } from "./_components/severity-badge";

export async function generateMetadata({
  params,
}: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = allCaseStudiesByDate.find((cs) => cs.slug === slug);

  const ogImageUrl = `${env.NEXT_PUBLIC_BASE_URL}/case-studies/${slug}/opengraph-image`;

  return {
    title: `${caseStudy?.title} | AstraQ Case Studies`,
    description: caseStudy?.summary,
    keywords: caseStudy?.category && [
      caseStudy.category,
      "case study",
      "cyber attack",
      "astraq",
      "security",
    ],
    openGraph: {
      title: caseStudy?.title,
      description: caseStudy?.summary,
      type: "article",
      publishedTime: caseStudy?.publishedAt.toISOString(),
      authors: [caseStudy?.author.name ?? "AstraQ"],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: caseStudy?.title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: caseStudy?.title,
      description: caseStudy?.summary,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: caseStudy?.title,
          type: "image/png",
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  return allCaseStudiesByDate.map((caseStudy) => ({ slug: caseStudy.slug }));
}

export default async function Page({
  params,
}: PageProps<"/case-studies/[slug]">) {
  const { slug } = await params;
  const caseStudy = allCaseStudiesByDate.find((cs) => cs.slug === slug);

  if (!caseStudy) {
    notFound();
  }

  const path = `/case-studies/${caseStudy.slug}`;

  return (
    <div className="pt-20 md:pt-40 relative">
      <ScrollProgress className="mt-16 hidden sm:block" />
      <article className="container-custom px-4 section-spacing relative">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="mb-4 font-medium text-muted-foreground text-sm">
                <Badge variant="outline">{caseStudy.category}</Badge> •{" "}
                {formatDate(caseStudy.attackDate, "MMMM do, yyyy")} •{" "}
                {formatDate(caseStudy.publishedAt, "MMMM do, yyyy")} •{" "}
                {caseStudy.readingTime}
              </div>
              <h1
                className="mb-6 font-mono text-3xl lg:text-4xl"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: This is trusted content from our CMS
                dangerouslySetInnerHTML={{ __html: caseStudy.htmlTitle }}
              />
              <p className="mb-6 text-muted-foreground font-mono">
                {caseStudy.summary}
              </p>
              <div className="flex items-center gap-4 font-sm">
                <Image src={logo} alt={siteConfig.name} className="w-8 h-8" />
                <div>
                  By <span className="font-mono">{caseStudy.author.name}</span>
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
              <div className="aspect-3/2 overflow-hidden rounded-lg">
                <CaseStudyBannerImage
                  title={caseStudy.title}
                  slug={caseStudy.slug}
                  className="h-full w-full object-cover"
                  height={1024}
                  width={1536}
                  preload
                  unoptimized
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>

          {/* Metadata Section */}
          <div className="mb-12 p-6 border border-border rounded-lg bg-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseStudy.severity && (
                <div>
                  <h3 className="text-sm font-semibold mb-2">Severity</h3>
                  <SeverityBadge severity={caseStudy.severity} />
                </div>
              )}
              {caseStudy.attackType && caseStudy.attackType.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold mb-2">Attack Type</h3>
                  <AttackTypeBadges attackTypes={caseStudy.attackType} />
                </div>
              )}
              {caseStudy.affectedOrganizations &&
                caseStudy.affectedOrganizations.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold mb-2">
                      Affected Organizations
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {caseStudy.affectedOrganizations.map((org) => (
                        <li key={org}>• {org}</li>
                      ))}
                    </ul>
                  </div>
                )}
              {caseStudy.affectedIndustries &&
                caseStudy.affectedIndustries.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold mb-2">
                      Affected Industries
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {caseStudy.affectedIndustries.map((industry) => (
                        <li key={industry}>• {industry}</li>
                      ))}
                    </ul>
                  </div>
                )}
              {caseStudy.threatActors && caseStudy.threatActors.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold mb-2">Threat Actors</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {caseStudy.threatActors.map((actor) => (
                      <li key={actor}>• {actor}</li>
                    ))}
                  </ul>
                </div>
              )}
              {caseStudy.impact && (
                <div>
                  <h3 className="text-sm font-semibold mb-2">Impact</h3>
                  <p className="text-sm text-muted-foreground">
                    {caseStudy.impact}
                  </p>
                </div>
              )}
              {caseStudy.relatedCVEs && caseStudy.relatedCVEs.length > 0 && (
                <div>
                  <RelatedCVEs cves={caseStudy.relatedCVEs} />
                </div>
              )}
            </div>
          </div>

          <MobileTableOfContents headings={caseStudy.headings} />

          <div className="grid grid-cols-1 md:grid-cols-[1fr_250px] relative gap-8">
            <div className="prose prose-lg min-w-0">
              <Mdx code={caseStudy.html} />
              {caseStudy.lessonsLearned &&
                caseStudy.lessonsLearned.length > 0 && (
                  <LessonsLearned
                    lessons={caseStudy.lessonsLearned}
                    className="mt-12"
                  />
                )}
            </div>
            <DesktopTableOfContents headings={caseStudy.headings} />
          </div>
        </div>
      </article>
    </div>
  );
}
