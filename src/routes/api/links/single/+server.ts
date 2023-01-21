import type { RequestEvent } from "./$types";
import z from "zod";
import prisma from "$lib/utils/db/Prisma";

export async function GET({ request }: RequestEvent): Promise<Response> {
  // url type?= and &id=
  const url = new URL(request.url);
  const type = url.searchParams.get("type");
  const id = url.searchParams.get("id");
  const shortUrl = url.searchParams.get("shortUrl");
  if (!type || !id || !shortUrl) return new Response("Bad Request: Missing type, id or shortUrl", { status: 400 });

  const schema = z.object({
    type: z.string().regex(/^(userId|visitorId)$/),
    id: z.string(),
    shortUrl: z.string()
  }).safeParse({ type, id, shortUrl });

  if (!schema.success) return new Response("Bad Request: " + schema.error.message, { status: 400 });

  const links = await prisma.links.findMany({
    where: {
      [schema.data.type === "userId" ? "userId" : "visitorId"]: schema.data.id,
      shortUrl: schema.data.shortUrl
    }
  });

  return new Response(JSON.stringify(links[0]), { status: 200 });
}