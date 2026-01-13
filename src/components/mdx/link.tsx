import type { Route } from "next";
import NextLink from "next/link";
import { cn } from "@/lib/utils";

export function Link({
  className,
  ...props
}: React.HTMLAttributes<HTMLAnchorElement> & { href: string }) {
  try {
    new URL(props.href);

    return (
      <NextLink
        className={cn("underline underline-offset-4", className)}
        target="_blank"
        {...props}
        href={props.href as Route}
      />
    );
  } catch {
    return (
      <NextLink
        className={cn("underline underline-offset-4", className)}
        {...props}
        href={props.href as Route}
      />
    );
  }
}
