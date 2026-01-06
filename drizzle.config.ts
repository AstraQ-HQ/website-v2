import { config } from "dotenv";
import { type Config, defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

export default defineConfig({
  schema: "./src/db/schema.ts",
  dialect: "turso",
  dbCredentials: {
    // biome-ignore lint/style/noNonNullAssertion: This exists
    url: process.env.TURSO_DATABASE_URL!,
    // biome-ignore lint/style/noNonNullAssertion: This exists
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
}) satisfies Config;
