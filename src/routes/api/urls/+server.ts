import type { RequestEvent } from "./$types";
import z from "zod";
import { createLink, db, getLinks } from "$lib/utils/db/Supabase";

export async function POST({ request }: RequestEvent): Promise<Response> {
  const values = await request.json();

  const schema = z.object({
    baseUrl: z.string().url(),
    shortUrl: z.string().regex(/^[a-zA-Z0-9]+$/),
    clicksCount: z.number().int(),
    fromClicks: z.array(z.object({ key: z.string(), value: z.number() })) ?? [],
    userId: z.string().optional(),
    visitorId: z.string()
  }).safeParse(values);

  if (!schema.success) return new Response("Invalid data: " + schema.error.message, { status: 400 });

  await createLink({
    visitorId: schema.data.visitorId,
    baseUrl: schema.data.baseUrl,
    shortUrl: schema.data.shortUrl,
    clicksCount: schema.data.clicksCount,
    fromClicks: schema.data.fromClicks
  });

  return new Response("OK", { status: 200 });
}

export async function GET({ request }: RequestEvent): Promise<any> {
  const { searchParams } = new URL(request.url);

  const visitorId = searchParams.get("visitorId") ?? null;
  const userId = searchParams.get("userId") ?? null;

  if (!visitorId && !userId) return new Response("Invalid data", { status: 400 });

  const type = visitorId ? "visitorId" : "userId";
  const id = visitorId ?? userId;
  const { data, error } = await db
    .from("links")
    .select("*")
    .eq(type, id)
    .order("createdAt", { ascending: false });

  if (error) return new Response(error.message, { status: 500 });
  return new Response(JSON.stringify(data), { status: 200 });
}