import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  isPaid: z.boolean()
});

export const linkSchema = z.object({
  slug: z.string().min(1).max(100).optional(),
  url: z.string().url(),
  disabled: z.boolean().default(false).optional(),
  password: z.string().min(1).max(32).optional(),
  expiration: z.number().int().positive().optional(),
  maxUses: z.number().int().positive().optional(),
  subdomain: z.string().min(1).max(32).optional()
});