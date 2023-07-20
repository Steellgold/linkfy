import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { prisma } from "#/lib/db/prisma";
import * as z from "zod";

const VALID_API_KEY = "lkfy-p11d1SOLYIk5D6vGDqjpRGHKVbjWp5RHMrdYvwBdqVp7360776fmXVrJ5hn";

const getKeyInfos = (): { email: string; isPaid: boolean; id: string } => {
  return {
    email: "john@company.com",
    isPaid: false,
    id: "d16d074e-e3d8-484b-a191-ccdb43098806"
  };
};

/**
 * GET request handler for retrieving a link by slug.
 * @param request - The incoming request object.
 * @returns A NextResponse object containing the retrieved link or an error message.
 */
export const GET = async(request: NextRequest): Promise<NextResponse> => {
  if (request.headers.get("api-key") !== VALID_API_KEY) return NextResponse.json({ message: "Invalid API Key" }, { status: 401 });

  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");

  if (!slug) return NextResponse.json({ message: "Invalid Slug" }, { status: 400 });

  const link = await prisma.link.findUnique({ where: { slug } });
  if (!link) return NextResponse.json({ message: "Invalid Slug" }, { status: 400 });

  return NextResponse.json({ link });
};

/**
 * POST request handler for creating a new link.
 * @param request - The incoming request object.
 * @returns A NextResponse object containing the created link or an error message.
 * @todo Add validation for the body.
 * @todo Add validation for the API key.
 * @todo Add validation for the user.
 * @todo Add validation for the user's plan.
 */
export const POST = async(request: NextRequest): Promise<NextResponse> => {
  if (request.headers.get("api-key") !== VALID_API_KEY) return NextResponse.json({ message: "Invalid API Key" }, { status: 401 });

  const schema = z.object({
    slug: z.string().min(1).max(32),
    url: z.string().url(),
    clicks: z.number().int().min(0).default(0).optional(),
    isDisabled: z.boolean().default(false).optional()
  }).safeParse(await request.json());

  if (!schema.success) return NextResponse.json({ message: "Invalid Body" }, { status: 400 });

  const { slug, url } = schema.data;

  const link = await prisma.link.create({ data: {
    slug, url,
    user: { connect: { id: getKeyInfos().id } }
  } });
  return NextResponse.json({ link });
};