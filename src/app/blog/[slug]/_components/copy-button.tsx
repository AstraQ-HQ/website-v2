"use client";

import { useCopyToClipboard } from "@uidotdev/usehooks";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CopyButton({
  code,
  className,
}: {
  code: string;
  className?: string;
}) {
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const handleCopy = () => {
    copyToClipboard(code).catch(() => console.error("Could not copy"));
  };

  return (
    <Button
      className={cn("cursor-pointer", className)}
      onClick={handleCopy}
      size="icon"
      variant="ghost"
      aria-label="Copy to clipboard"
    >
      {copiedText ? (
        <Check className="size-4 text-green-400" />
      ) : (
        <Copy className="size-4" />
      )}
    </Button>
  );
}
