import prisma from "$lib/database/Prisma";
import { rateLimit } from "$lib/RateLimit";
import z from "zod";
import type { RequestEvent } from "./$types";

export async function GET({ request, getClientAddress }: RequestEvent): Promise<Response> {
  if (rateLimit(getClientAddress().slice(7))) {
    return new Response("Too Many Requests: You have exceeded the rate limit", { status: 429 });
  }

  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");

  if (!slug) return new Response("Bad Request: Missing slug", { status: 400 });

  const schema = z
    .object({
      slug: z.string()
    })
    .safeParse({ slug });

  if (!schema.success) return new Response("Bad Request: " + schema.error.message, { status: 400 });
  const link = await prisma.link.findUnique({
    where: {
      slug: schema.data.slug
    }
  });

  if (!link) return new Response("Not Found", { status: 404 });
  return new Response(JSON.stringify(link), { status: 200 });
}