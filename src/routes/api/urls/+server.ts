import type { RequestEvent } from "./$types";
import z from "zod";
import prisma from "$lib/utils/Prisma";

export async function POST({ request }: RequestEvent): Promise<Response> {
  const values = await request.json();

  const schema = z.object({
    baseUrl: z.string().url(),
    shortUrl: z.string().regex(/^[a-zA-Z0-9]+$/),
    clicksCount: z.number().int(),
    fromClicks: z.array(z.object({ key: z.string(), value: z.number() })) ?? [],
    userId: z.string().optional(),
    visitorId: z.string(),
  }).safeParse(values);

  if (!schema.success) return new Response("Invalid data: " + schema.error.message, { status: 400 });

  let send = await prisma.links_dev.create({ data: schema.data });
  return new Response("OK", { status: 200 });
}