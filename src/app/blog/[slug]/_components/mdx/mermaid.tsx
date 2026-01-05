"use client";

import mermaid, { type MermaidConfig } from "mermaid";
import { useEffect, useId, useRef, useState } from "react";
import { useDarkMode } from "@/hooks/use-dark-mode";

export function Mermaid({ chart }: { chart: string }) {
  const id = useId();
  const [svgString, setSvgString] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const isDarkMode = useDarkMode();

  useEffect(() => {
    void renderChart();

    async function renderChart() {
      const lightThemeVariables = {
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
      };

      const darkThemeVariables = {
        background: "#0d0d0d",
        primaryColor: "#262626",
        primaryTextColor: "#f2f2f2",
        primaryBorderColor: "#595959",
        secondaryColor: "#262626",
        tertiaryColor: "#262626",
        lineColor: "#f2f2f2",
        textColor: "#f2f2f2",
        mainBkg: "#141414",
        nodeBorder: "#595959",
        clusterBkg: "#262626",
        titleColor: "#f2f2f2",
        edgeLabelBackground: "#0d0d0d",
        nodeRadius: 0,
      };

      const mermaidConfig: MermaidConfig = {
        startOnLoad: false,
        securityLevel: "loose",
        fontFamily: "Space Mono, monospace",
        theme: "base",
        look: "classic",
        themeVariables: isDarkMode ? darkThemeVariables : lightThemeVariables,
      };

      try {
        mermaid.initialize(mermaidConfig);
        if (!containerRef.current) return;

        const { svg } = await mermaid.render(
          id.replaceAll(":", ""),
          chart.replaceAll("\\n", "\n"),
        );
        setSvgString(svg);
      } catch (error) {
        console.error(error);
        throw new Error("Error while rendering mermaid");
      }
    }
  }, [chart, id, isDarkMode]);

  return (
    <div
      // biome-ignore lint/security/noDangerouslySetInnerHtml: svg is safe
      dangerouslySetInnerHTML={{ __html: svgString }}
      ref={containerRef}
      className="flex justify-center py-2"
    />
  );
}
