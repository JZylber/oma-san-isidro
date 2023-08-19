import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
  },
  client: {
    DATABASE_URL: z.string().min(1) 
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
  },
});