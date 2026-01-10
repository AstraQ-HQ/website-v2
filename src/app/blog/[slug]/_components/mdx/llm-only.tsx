interface LLMOnlyProps {
  data: string;
}

export function LLMOnly({ data }: LLMOnlyProps) {
  return (
    <pre className="hidden llm-use-only" aria-hidden="true">
      {data}
    </pre>
  );
}
