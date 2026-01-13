import Link from "next/link";
import { GithubDark } from "@/components/icons";

export function GithubLink({
  owner,
  repo = "",
}: {
  owner: string;
  repo?: string;
}) {
  const path = repo ? `${owner}/${repo}` : owner;

  return (
    <Link
      className="inline-flex items-center gap-1.5 rounded-lg bg-muted px-1.5 py-1 text-foreground/80 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
      href={`https://github.com/${path}`}
      rel="nofollow noopener noreferrer"
      target="_blank"
    >
      <span className="flex items-center gap-2">
        <GithubDark className="size-3.5" />
        {path}
      </span>
    </Link>
  );
}
