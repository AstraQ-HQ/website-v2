"use client";

import mermaid, { type MermaidConfig } from "mermaid";
import { useEffect, useId, useRef, useState } from "react";

export function Mermaid({ chart }: { chart: string }) {
  const id = useId();
  const [svgString, setSvgString] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    void renderChart();

    async function renderChart() {
      const mermaidConfig: MermaidConfig = {
        startOnLoad: false,
        securityLevel: "loose",
        fontFamily: "Space Mono, monospace",
        theme: "base",
        look: "classic",
        themeVariables: {
          background: "#ffffff",
          primaryColor: "#e6e6e6",
          primaryTextColor: "#1a1a1a",
          primaryBorderColor: "#d9d9d9",
          secondaryColor: "#f2f2f2",
          tertiaryColor: "#fafafa",
          lineColor: "#1a1a1a",
          textColor: "#1a1a1a",
          mainBkg: "#fafafa",
          nodeBorder: "#d9d9d9",
          clusterBkg: "#f2f2f2",
          titleColor: "#1a1a1a",
          edgeLabelBackground: "#ffffff",
          nodeRadius: 0,
        },
      };

      try {
        mermaid.initialize(mermaidConfig);
        const { svg } = await mermaid.render(
          id.replaceAll(":", ""),
          chart.replaceAll("\\n", "\n"),
          // biome-ignore lint/style/noNonNullAssertion: ref is guaranteed to be defined
          containerRef.current!,
        );
        setSvgString(svg);
      } catch (error) {
        throw new Error("Error while rendering mermaid", { cause: error });
      }
    }
  }, [chart, id]);

  return (
    <div
      // biome-ignore lint/security/noDangerouslySetInnerHtml: svg is safe
      dangerouslySetInnerHTML={{ __html: svgString }}
      ref={containerRef}
      className="flex justify-center py-2"
    />
  );
}
