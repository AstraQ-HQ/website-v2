"use client";

import { ExternalLinkIcon, StarIcon } from "lucide-react";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { GithubDark } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { OpenSource } from "@/lib/content";

interface OpenSourceCardProps {
  project: OpenSource;
}

export function OpenSourceCard({ project }: OpenSourceCardProps) {
  return (
    <div className="group p-8 bg-card border border-border rounded-sm hover:shadow-lg hover:border-accent transition-all duration-300 hover:-translate-y-2">
      <div className="flex items-start justify-start gap-4 mb-4">
        {project.logo && (
          <Image
            src={project.logo}
            alt={project.name}
            width={48}
            height={48}
            className="object-contain"
          />
        )}
        <div className="flex-1">
          <h3 className="font-mono text-2xl text-foreground mb-1">
            {project.name}
          </h3>
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <Badge variant="outline" className="text-xs">
              {project.language}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {project.license}
            </Badge>
            {project.stars !== undefined && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <StarIcon
                  size={14}
                  className="fill-yellow-500 text-yellow-500"
                />
                <span>{project.stars}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <p className="text-muted-foreground mb-4">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.slice(0, 3).map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
        {project.tags.length > 3 && (
          <Badge variant="secondary" className="text-xs">
            +{project.tags.length - 3}
          </Badge>
        )}
      </div>

      <div className="flex gap-2">
        <Button asChild variant="outline" size="sm" className="flex-1">
          <Link
            href={project.repository as Route}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubDark className="mr-2 w-4 h-4" />
            GitHub
          </Link>
        </Button>
        {project.website && (
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link
              href={project.website as Route}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLinkIcon size={16} className="mr-2" />
              Website
            </Link>
          </Button>
        )}
        <Button asChild variant="default" size="sm" className="flex-1">
          <Link href={`/open-source/${project.slug}`}>Learn More</Link>
        </Button>
      </div>
    </div>
  );
}
