import { cn } from "@/lib/utils";
import { CopyButton } from "../copy-button";

export function Shell({
  code,
  children,
}: {
  code: string;
  meta: Record<string, string | undefined>;
  children: React.ReactNode;
}) {
  return (
    <pre
      className={cn(
        "bg-card border relative max-h-[650px] overflow-x-auto px-2 py-3 my-4",
      )}
    >
      <CopyButton className="top-1.5 right-1 absolute" code={code} />
      <span className="text-cyan-800 select-none text-sm">$&gt;</span>{" "}
      {children}
    </pre>
  );
}
