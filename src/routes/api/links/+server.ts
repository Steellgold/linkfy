import type { RequestEvent } from "./$types";
import z from "zod";
import prisma from "$lib/utils/db/Prisma";

export async function GET({ request }: RequestEvent): Promise<Response> {
  const url = new URL(request.url);
  const shortUrl = url.searchParams.get("shortUrl");
  if (!shortUrl) return new Response("Bad Request: Missing shortUrl", { status: 400 });

  const schema = z.object({ shortUrl: z.string() }).safeParse({ shortUrl });
  if (!schema.success) return new Response("Bad Request: " + schema.error.message, { status: 400 });

  const link = await prisma.links.findMany({ where: { shortUrl: schema.data.shortUrl } });
  return new Response(JSON.stringify(link[0]), { status: 200 });
}