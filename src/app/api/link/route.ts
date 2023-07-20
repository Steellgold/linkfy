import { prisma } from "#/lib/db/prisma";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/** TEMPORARY */
const VALID_API_KEY = "lkfy-p11d1SOLYIk5D6vGDqjpRGHKVbjWp5RHMrdYvwBdqVp7360776fmXVrJ5hn";
/** TEMPORARY */

export const GET = async(request: NextRequest): Promise<NextResponse> => {
  if (request.headers.get("api-key") !== VALID_API_KEY) return NextResponse.json({ message: "Invalid API Key" }, { status: 401 });

  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");

  if (!slug) return NextResponse.json({ message: "Invalid Slug" }, { status: 400 });

  const link = await prisma.link.findUnique({ where: { slug } });
  if (!link) return NextResponse.json({ message: "Invalid Slug" }, { status: 400 });

  return NextResponse.json({ link });
};