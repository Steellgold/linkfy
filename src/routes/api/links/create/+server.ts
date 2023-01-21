import type { RequestEvent } from "./$types";
import z from "zod";

const browsers = { chrome: 0, firefox: 0, safari: 0, opera: 0, edge: 0, other: 0 };
const platforms = { windows: 0, android: 0, linux: 0, ios: 0, macos: 0, other: 0 };

export async function POST({ request }: RequestEvent): Promise<Response> {
  if (!request.body) return new Response("Bad Request: Your request body is empty", { status: 400 });

  const body = await request.json();
  const schema = z.object({
    userId: z.string().optional(),
    visitorId: z.string(),
    baseUrl: z.string().regex(/^https?:\/\//),
    shortUrl: z.string(),
    clicks: z.number(),
    countries: z.record(z.number()).default({/** bruh */}),
    browsers: z.record(z.number()).default(browsers),
    platforms: z.record(z.number()).default(platforms),
    status: z.boolean().default(true)
  }).safeParse(body);

  if (!schema.success) return new Response("Bad Request: " + schema.error.message, { status: 400 });
  return new Response(JSON.stringify([
    "succès"
  ]), { status: 200 });
}