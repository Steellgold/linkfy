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

  // order by createdAt
  const links = await prisma.links.findMany({
    where: {
      [schema.data.type === "userId" ? "userId" : "visitorId"]: schema.data.id
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  const paginatedList = [];
  for (let i = 0; i < links.length; i += 10) {
    paginatedList.push(links.slice(i, i + 10));
  }

  const total = links.length;

  return new Response(JSON.stringify({
    total,
    paginatedList
  }), { status: 200 });
}