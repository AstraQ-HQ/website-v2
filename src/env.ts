import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    TURSO_DATABASE_URL: z.url(),
    TURSO_AUTH_TOKEN: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
  },
  client: {},
  experimental__runtimeEnv: {},
});
