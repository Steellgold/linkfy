import type { LinkSchema } from "#/lib/utils/api/schema.user";
import { linkSchema, userSchema } from "#/lib/utils/api/schema.user";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { prisma } from "#/lib/db/prisma";
import { parseBody } from "#/lib/utils/api/parse";

const checkApiKey = async(apiKey: string | null): Promise<boolean | { id: string; isPaid: boolean }> => {
  if (!apiKey) return false;

  const data = await prisma.user.findUnique({ where: { apiKey } });
  if (!data) return false;

  const { id, isPaid } = data;
  return { id, isPaid };
};

/**
 * GET request handler for retrieving a link by slug.
 * @param request - The incoming request object.
 * @returns A NextResponse object containing the retrieved link or an error message.
 */
export const GET = async(request: NextRequest): Promise<NextResponse> => {
  if (!userSchema.safeParse(
    await checkApiKey(request.headers.get("api-key"))
  ).success) return NextResponse.json({ message: "Invalid API Key" }, { status: 401 });

  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");

  if (!slug) return NextResponse.json({ message: "Parameter `slug` is required" }, { status: 400 });

  const link = await prisma.link.findUnique({ where: { slug } });
  if (!link) return NextResponse.json({ message: "Invalid Slug" }, { status: 400 });

  return NextResponse.json({ link });
};

/**
 * POST request handler for creating a new link.
 * @param request - The incoming request object.
 * @returns A NextResponse object containing the created link or an error message.
 */
export const POST = async(request: NextRequest): Promise<NextResponse> => {
  const body = parseBody<LinkSchema>(linkSchema, await request.json());
  if (body instanceof NextResponse) return NextResponse.json({ message: "Invalid Body" }, { status: 400 });

  const origin = request.headers.get("origin");
  return NextResponse.json({ origin });

  // const env = z.object({ NEXT_PUBLIC_LINKFY_URL: z.string().url() }).safeParse(process.env);
  // if (!env.success) return NextResponse.json({ message: "Invalid Environment" }, { status: 500 });

  // const isSameDomain = request.headers.get("referer")?.includes(env.data.NEXT_PUBLIC_LINKFY_URL);
  // const apiKey = request.headers.get("api-key");
  // if (!isSameDomain && !apiKey) return NextResponse.json({ message: "Provide an API Key" }, { status: 401 });

  // const user = await checkApiKey(apiKey);
  // if (!user && !isSameDomain) return NextResponse.json({ message: "Invalid API Key" }, { status: 401 });

  // const { slug, url, disabled, password, expiration, maxUses, subdomain } = body;
  // if (!url) return NextResponse.json({ message: "Parameter `url` is required" }, { status: 400 });
  // if (!checkIfUrl(url)) return NextResponse.json({ message: "Invalid URL" }, { status: 400 });

  // const link = await prisma.link.create({
  //   data: {
  //     slug: slug || generateSlug(4),
  //     url,
  //     disabled: disabled || false,
  //     password: password || undefined,
  //     expiresAt: expiration || undefined,
  //     maxUses: maxUses || undefined,
  //     domain: subdomain || undefined,
  //     clicks: 0,
  //     user: (!isSameDomain && user) ? { connect: { id: "3db16185-c620-4aed-a9ca-2f49aa27a3ac" } } : undefined
  //   }
  // });
};

/**
 * DELETE request handler for deleting a link by slug.
 * @param request - The incoming request object.
 * @returns A NextResponse object containing the deleted link or an error message.
*/
export const DELETE = async(request: NextRequest): Promise<NextResponse> => {
  const data = userSchema.safeParse(await checkApiKey(request.headers.get("api-key")));
  if (!data.success) return NextResponse.json({ message: "Invalid API Key" }, { status: 401 });

  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");

  if (!slug) return NextResponse.json({ message: "Parameter `slug` is required" }, { status: 400 });

  const link = await prisma.link.findUnique({ where: { slug } });
  if (!link) return NextResponse.json({ message: "Invalid Slug" }, { status: 400 });

  await prisma.link.delete({ where: { slug } });
  return NextResponse.json({ link });
};