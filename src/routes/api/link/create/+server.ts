import type { RequestEvent } from "./$types";
import z from "zod";
import prisma from "$lib/database/Prisma";

export async function POST({ request }: RequestEvent): Promise<Response> {
  if (!request.body) return new Response("Bad Request: Your request body is empty", { status: 400 });

  const body = await request.json();
  const schema = z.object({
    // TODO: Add validation for the URL
  }).safeParse(body);

  if (!schema.success) return new Response("Bad Request: " + schema.error.message, { status: 400 });
  return new Response("URL was shortened", { status: 201 });
}