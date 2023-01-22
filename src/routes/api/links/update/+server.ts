import type { RequestEvent } from "./$types";
import z from "zod";
import prisma from "$lib/utils/db/Prisma";

export async function PUT({ request }: RequestEvent): Promise<Response> {
  if (!request.body) return new Response("Bad Request: Your request body is empty", { status: 400 });

  const body = await request.json();
  const schema = z.object({
    shortUrl: z.string(),
    data: z.object({
      userId: z.string().optional(),
      visitorId: z.string().optional(),
      baseUrl: z.string().regex(/^https?:\/\//).optional(),
      shortUrl: z.string().optional(),
      clicks: z.number().optional(),
      countries: z.record(z.number()).optional(),
      browsers: z.record(z.number()).optional(),
      platforms: z.record(z.number()).optional(),
      status: z.boolean().optional()
    })
  }).safeParse(body);

  if (!schema.success) return new Response("Bad Request: " + schema.error.message, { status: 400 });
  console.log(schema.data);

  const link = await prisma.links.update({
    where: {
      shortUrl: schema.data.shortUrl
    },
    data: schema.data.data
  });

  return new Response(JSON.stringify(link), { status: 200 });
}