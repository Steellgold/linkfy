import type { RequestEvent } from "./$types";
import z from "zod";
import prisma from "$lib/utils/db/Prisma";

export async function POST({ request }: RequestEvent): Promise<Response> {
  if (!request.body) return new Response("Bad Request: Your request body is empty", { status: 400 });

  const body = await request.json();
  const schema = z.object({
    userId: z.string().optional(),
    visitorId: z.string(),
    baseUrl: z.string().regex(/^https?:\/\//),
    shortUrl: z.string(),
    clicks: z.number().default(0),
    countries: z.record(z.number()).default({}),
    browsers: z.record(z.number()).default({}),
    platforms: z.record(z.number()).default({}),
    status: z.boolean().default(true)
  }).safeParse(body);

  if (!schema.success) return new Response("Bad Request: " + schema.error.message, { status: 400 });
  const link = await prisma.links.create({ data: schema.data });

  return new Response(JSON.stringify(link), { status: 201 });
}