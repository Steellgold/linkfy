import { z } from "zod";

export const userSchemaResponse = z.object({
  id: z.string(),
  isPaid: z.boolean()
});

export const userSchema = z.object({
  id: z.string()
});

export const linkSchema = z.object({
  slug: z.string().min(1).max(100).optional(),
  url: z.string().url(),
  disabled: z.boolean().default(false).optional().nullable(),
  password: z.string().min(1).max(32).optional().nullable(),
  expireAt: z.number().int().positive().optional().nullable(),
  maxUses: z.number().int().positive().optional().nullable(),
  subdomain: z.string().min(1).max(32).optional().nullable()
});

export const historyLinkSchema = z.object({
  slug: z.string().min(1).max(100),
  url: z.string().url(),
  createdAt: z.date(),
  disabled: z.boolean().default(false),
  clicks: z.number().int().positive(),
  password: z.string().min(1).max(32).optional().nullable(),
  expireAt: z.number().int().positive().optional().nullable(),
  maxUses: z.number().int().positive().optional().nullable(),
  subdomain: z.string().min(1).max(32).optional().nullable()
});


export const linksSchema = z.object({
  userId: z.string().nullable(),
  links: z.array(linkSchema)
});

export const historylinksSchema = z.object({
  userId: z.string().nullable(),
  links: z.array(historyLinkSchema)
});

export type UserResponseSchema = z.infer<typeof userSchemaResponse>;
export type UserSchema = z.infer<typeof userSchema>;

export type HistoryLinkSchema = z.infer<typeof historyLinkSchema>;
export type HistoryLinksResponseSchema = z.infer<typeof historylinksSchema>;

export type LinksResponseSchema = z.infer<typeof linksSchema>;
export type LinkSchema = z.infer<typeof linkSchema>;