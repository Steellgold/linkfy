import prisma from "$lib/database/Prisma";
import { rateLimit } from "$lib/RateLimit";
import type { RequestEvent } from "./$types";

export async function GET({ request, getClientAddress }: RequestEvent): Promise<Response> {
  if (rateLimit(getClientAddress())) {
    return new Response("Too Many Requests: You have exceeded the rate limit", { status: 429 });
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") || null;
  const visitorId = searchParams.get("visitorId") || null;

  if (!userId && !visitorId) {
    return new Response("Bad Request: You must provide a userId or a visitorId", { status: 400 });
  }

  const links = await prisma.link.findMany({
    where: {
      [userId ? "userId" : "visitorId"]: userId || visitorId
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  if (!links) return new Response("Internal Server Error: Failed to get links", { status: 500 });
  return new Response(JSON.stringify(links), { status: 200 });
}