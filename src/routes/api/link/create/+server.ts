import type { RequestEvent } from "./$types";
import z from "zod";
import prisma from "$lib/database/Prisma";

export async function POST({ request }: RequestEvent): Promise<Response> {
  if (!request.body) return new Response("Bad Request: Your request body is empty", { status: 400 });

  const body = await request.json();
  const schema = z.object({
    url: z.string().url(),
    slug: z.string(),
    userId: z.string().optional(),
    visitorId: z.string()
  }).safeParse(body);

  if (!schema.success) return new Response("Bad Request: Your request body is invalid", { status: 400 });
  const link = await prisma.link.create({
    data: {
      url: schema.data.url,
      slug: schema.data.slug,
      userId: schema.data.userId,
      visitorId: schema.data.visitorId
  });

  return new Response("Link", { status: 200 });
}