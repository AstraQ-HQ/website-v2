import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

interface RelatedCVEsProps {
  cves: string[];
  className?: string;
}

export function RelatedCVEs({ cves, className }: RelatedCVEsProps) {
  if (!cves || cves.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <h3 className="text-sm font-semibold mb-2">Related CVEs</h3>
      <div className="flex flex-wrap gap-2">
        {cves.map((cve) => (
          <Link
            key={cve}
            href={`https://cve.mitre.org/cgi-bin/cvename.cgi?name=${cve}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-primary hover:text-accent-foreground underline-offset-4 hover:underline"
          >
            {cve}
            <ExternalLinkIcon className="size-3" strokeWidth={1.5} />
          </Link>
        ))}
      </div>
    </div>
  );
}
