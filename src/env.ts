import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    TURSO_DATABASE_URL: z.url(),
    TURSO_AUTH_TOKEN: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    TURNSTILE_SECRET_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  },
});
