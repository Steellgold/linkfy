import type { RequestEvent } from "./$types";
import z from "zod";
import { db } from "$lib/utils/Supabase";

export async function POST({ request }: RequestEvent): Promise<Response> {
  const values = await request.json();

  const schema = z.object({
    url: z.string().url(),
    shortUrl: z.string().max(6),
  }).safeParse(values);

  if (!schema.success) {
    return new Response("Invalid data", {
      status: 400,
    });
  }

  const { url, shortUrl } = schema.data;

  const { data, error } = await db
  .from('links')
  .insert([
    { url: url, shorted: shortUrl },
  ])

  if (error) {
    return new Response(error.message, {
      status: 500,
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
  });
}