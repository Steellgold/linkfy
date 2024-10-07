import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    // General
    AUTH_RESEND_KEY: z.string(),
    PUBLIC_URL: z.string(),

    // Security
    ENCRYPTION_KEY: z.string(),
    ENCRYPTION_IV: z.string(),
    ENCRYPTION_ALGORITHM: z.string(),

    // Postgres
    DATABASE_URL: z.string(),
    DIRECT_URL: z.string(),
    
    // Redis
    UPSTASH_REDIS_REST_URL: z.string(),
    UPSTASH_REDIS_REST_TOKEN: z.string(),
    
    // Auth
    AUTH_SECRET: z.string(),

    AUTH_GITHUB_ID: z.string(),
    AUTH_GITHUB_SECRET: z.string(),
    
    AUTH_GOOGLE_ID: z.string(),
    AUTH_GOOGLE_SECRET: z.string(),
  },
  client: {
    PUBLIC_URL: z.string(),
  },
  runtimeEnv: {
    AUTH_RESEND_KEY: process.env.AUTH_RESEND_KEY,
    PUBLIC_URL: process.env.PUBLIC_URL,

    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    ENCRYPTION_IV: process.env.ENCRYPTION_IV,
    ENCRYPTION_ALGORITHM: process.env.ENCRYPTION_ALGORITHM,

    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,

    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,

    AUTH_SECRET: process.env.AUTH_SECRET,

    AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
    AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,

    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,

    PUBLIC_URL: process.env.PUBLIC_URL,
  },
});