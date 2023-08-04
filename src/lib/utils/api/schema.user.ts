import { z } from "zod";

export const userSchemaResponse = z.object({
  id: z.string(),
  isPaid: z.boolean()
});

export const userSchema = z.object({
  id: z.string()
});

export const linkSchema = z.object({
  slug: z.string().min(1).max(100),
  url: z.string().url(),
  createdAt: z.date().default(() => new Date()).optional().nullable(),  // Is only defined by the API not User Input
  disabled: z.boolean().default(false).optional().nullable(),
  clicks: z.number().default(0).optional().nullable(), // Is only defined by the API not User Input
  password: z.string().min(1).max(32).optional().nullable(),
  expireAt: z.number().int().positive().optional().nullable(),
  maxUses: z.number().int().positive().optional().nullable(),
  subdomain: z.string().min(1).max(32).optional().nullable()
});

export const linksSchema = z.object({
  userId: z.string().nullable(),
  user: userSchemaResponse.optional().nullable(),
  links: z.array(linkSchema)
});


export type UserResponseSchema = z.infer<typeof userSchemaResponse>;
export type UserSchema = z.infer<typeof userSchema>;

export type LinksResponseSchema = z.infer<typeof linksSchema>;
export type LinkSchema = z.infer<typeof linkSchema>;