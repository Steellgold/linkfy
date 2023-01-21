import type { RequestEvent } from "./$types";
import z from "zod";
import prisma from "$lib/utils/db/Prisma";

export async function GET({ request }: RequestEvent): Promise<Response> {
  const url = new URL(request.url);
  const type = url.searchParams.get("type");
  const id = url.searchParams.get("id");
  if (!type || !id) return new Response("Bad Request: Missing type or id", { status: 400 });

  const schema = z.object({
    type: z.string().regex(/^(userId|visitorId)$/),
    id: z.string()
  }).safeParse({ type, id });

  if (!schema.success) return new Response("Bad Request: " + schema.error.message, { status: 400 });
  const links = await prisma.links.findMany({ where: { [schema.data.type === "userId" ? "userId" : "visitorId"]: schema.data.id } });
  return new Response(JSON.stringify(links), { status: 200 });
}