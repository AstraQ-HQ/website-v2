"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { useDarkMode } from "@/hooks/use-dark-mode";

export function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDark = useDarkMode();

  useEffect(() => {
    if (!canvasRef.current) return;

    let phi = 0;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 500 * 2,
      height: 500 * 2,
      phi: 0,
      theta: 0,
      diffuse: 0,
      mapSamples: 18000,
      mapBrightness: 12,
      mapBaseBrightness: 0,
      dark: isDark ? 1 : 0,
      baseColor: [1, 1, 1],
      markerColor: [1, 1, 1],
      glowColor: isDark ? [0, 0, 0] : [1, 1, 1],
      markers: [],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.003;
      },
    });

    return () => {
      globe.destroy();
    };
  }, [isDark]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        style={{
          width: 500,
          height: 500,
          aspectRatio: "1",
        }}
      />
    </div>
  );
}
