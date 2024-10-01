import prisma from "$lib/database/Prisma";
import { rateLimit } from "$lib/RateLimit";
import type { RequestEvent } from "./$types";

export async function GET({ request, getClientAddress }: RequestEvent): Promise<Response> {
  if (rateLimit(getClientAddress())) {
    return new Response("Too Many Requests: You have exceeded the rate limit", { status: 429 });
  }

  const links = await prisma.link.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

  if (!links) return new Response("Internal Server Error: Failed to get links", { status: 500 });
  return new Response(JSON.stringify(links), { status: 200 });
}
