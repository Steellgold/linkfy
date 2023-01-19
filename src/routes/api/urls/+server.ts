import type { RequestEvent } from "./$types";
import z from "zod";
import { createLink, db } from "$lib/utils/db/Supabase";

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

  await createLink({
    visitorId: schema.data.visitorId,
    baseUrl: schema.data.baseUrl,
    shortUrl: schema.data.shortUrl,
    clicksCount: schema.data.clicksCount,
    fromClicks: schema.data.fromClicks,
  });

  return new Response("OK", { status: 200 });
}

// get all data from an visitorId/userId/shortUrl
export async function GET({ request }: RequestEvent): Promise<any> {
  const { searchParams } = new URL(request.url);

  const visitorId = searchParams.get("visitorId") ?? null;
  const userId = searchParams.get("userId") ?? null;

  if (!visitorId) {
    if (!userId) {
      return new Response("Invalid data", { status: 400 });
    } else {
      const { data, error } = await db.from("links").select("*").eq("userId", userId);
      if (error) return new Response("Error: " + error.message, { status: 500 });
      return new Response(JSON.stringify(data), { status: 200 });
    }
  } else {
    const { data, error } = await db.from("links").select("*").eq("visitorId", visitorId);
    if (error) return new Response("Error: " + error.message, { status: 500 });
    return new Response(JSON.stringify(data), { status: 200 });
  }
}