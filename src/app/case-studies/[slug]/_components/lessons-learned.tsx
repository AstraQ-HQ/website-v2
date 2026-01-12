import { CheckCircle2Icon } from "lucide-react";
import { Callout } from "@/app/blog/[slug]/_components/mdx/callout";

interface LessonsLearnedProps {
  lessons: string[];
  className?: string;
}

export function LessonsLearned({ lessons, className }: LessonsLearnedProps) {
  if (!lessons || lessons.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <Callout variant="info" title="Lessons Learned" icon="lightbulb">
        <ul className="space-y-2 mt-4">
          {lessons.map((lesson) => (
            <li key={lesson} className="flex items-start gap-2">
              <CheckCircle2Icon
                className="size-5 text-primary mt-0.5 shrink-0"
                strokeWidth={1.5}
              />
              <span className="text-sm">{lesson}</span>
            </li>
          ))}
        </ul>
      </Callout>
    </div>
  );
}
