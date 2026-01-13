import {
  CodeIcon,
  ExternalLinkIcon,
  FileTextIcon,
  StarIcon,
} from "lucide-react";
import type { Metadata, Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GithubDark } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { env } from "@/env";
import { allOpenSources } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = allOpenSources.find((p) => p.slug === slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.name} | AstraQ Open Source`,
    description: project.description,
    keywords: [...project.tags, "open source", "astraq", "cybersecurity"],
    openGraph: {
      title: project.name,
      description: project.description,
      type: "website",
      url: `${env.NEXT_PUBLIC_BASE_URL}/open-source/${slug}`,
    },
    twitter: {
      card: "summary",
      title: project.name,
      description: project.description,
    },
  };
}

export async function generateStaticParams() {
  return allOpenSources.map((project) => ({
    slug: project.slug,
  }));
}

export default async function OpenSourceProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = allOpenSources.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row items-start gap-8 mb-8">
            {project.logo && (
              <div className="shrink-0">
                <Image
                  src={project.logo}
                  alt={project.name}
                  width={120}
                  height={120}
                  className="object-contain rounded-lg border border-border bg-card p-4"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h1 className="font-mono text-4xl sm:text-5xl lg:text-6xl text-primary mb-4 leading-tight">
                {project.name}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-6 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant="outline" className="text-sm px-3 py-1">
                  {project.language}
                </Badge>
                <Badge variant="outline" className="text-sm px-3 py-1">
                  {project.license}
                </Badge>
                {project.stars !== undefined && (
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <StarIcon
                      size={18}
                      className="fill-yellow-500 text-yellow-500"
                    />
                    <span className="font-medium">
                      {project.stars.toLocaleString()} stars
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs px-2.5 py-1"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link
                    href={project.repository as Route}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GithubDark className="mr-2 w-5 h-5" />
                    View on GitHub
                  </Link>
                </Button>
                {project.website && (
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    <Link
                      href={project.website as Route}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLinkIcon size={20} className="mr-2" />
                      Visit Website
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <CodeIcon size={20} className="text-primary" />
              <h2 className="font-mono text-xl text-primary">Features</h2>
            </div>
            <ul className="space-y-3">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <div className="mt-2 shrink-0">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                  <span className="text-muted-foreground text-sm leading-relaxed">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <FileTextIcon size={20} className="text-primary" />
              <h2 className="font-mono text-xl text-primary">Tech Stack</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="text-sm px-3 py-1.5"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
