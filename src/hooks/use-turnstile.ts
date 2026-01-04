import { type RefObject, useCallback, useEffect, useState } from "react";
import { env } from "@/env";

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: string | HTMLElement,
        options: {
          sitekey: string;
          language?: string;
          execution?: "render" | "execute";
          appearance?: "interaction-only" | "always" | "execute";
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => string;
      remove: (widgetId: string) => void;
      execute: (element: string | HTMLElement) => void;
      reset: (element: string | HTMLElement) => void;
      getResponse: (widgetId: string) => string | undefined;
    };
  }
}

export function useTurnstile(
  ref: RefObject<HTMLDivElement | null>,
  updateToken: (token: string) => void,
) {
  const [turnstileWidgetId, setTurnstileWidgetId] = useState<string | null>(
    null,
  );

  const buildTurnstile = useCallback(() => {
    if (!ref.current || !window.turnstile) {
      return;
    }

    if (turnstileWidgetId) {
      return;
    }

    try {
      const widgetId = window.turnstile.render(ref.current, {
        sitekey: env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
        language: "en",
        execution: "render",
        appearance: "interaction-only",
        callback: (token: string) => {
          updateToken(token);
        },
        "expired-callback": () => {
          updateToken("");
          if (ref.current && window.turnstile) {
            window.turnstile.reset(ref.current);
          }
        },
        "error-callback": () => {
          updateToken("");
          if (ref.current && window.turnstile) {
            window.turnstile.reset(ref.current);
          }
        },
      });
      setTurnstileWidgetId(widgetId);
    } catch (e) {
      console.error("Turnstile render error:", e);
    }
  }, [ref, updateToken, turnstileWidgetId]);

  const resetTurnstile = useCallback(() => {
    if (!ref.current || !window.turnstile) {
      return;
    }
    window.turnstile.reset(ref.current);
  }, [ref]);

  useEffect(() => {
    if (window.turnstile && !turnstileWidgetId) {
      buildTurnstile();
    }
  }, [buildTurnstile, turnstileWidgetId]);

  useEffect(() => {
    return () => {
      if (turnstileWidgetId && window.turnstile) {
        window.turnstile.remove(turnstileWidgetId);
        setTurnstileWidgetId(null);
      }
    };
  }, [turnstileWidgetId]);

  return { buildTurnstile, resetTurnstile };
}
