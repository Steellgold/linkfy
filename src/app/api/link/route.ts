import { linkSchema, userSchema } from "#/lib/utils/api/schema.user";
import { checkIfUrl, generateSlug } from "#/lib/utils/url";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { prisma } from "#/lib/db/prisma";

const checkApiKey = async(apiKey: string | null): Promise<boolean | { id: string; isPaid: boolean }> => {
  if (!apiKey) return false;

  const data = await prisma.user.findUnique({ where: { apiKey } });
  if (!data) return false;

  return {
    id: data.id,
    isPaid: data.isPaid
  };
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
  const data = userSchema.safeParse(await checkApiKey(request.headers.get("api-key")));
  if (!data.success) return NextResponse.json({ message: "Invalid API Key" }, { status: 401 });

  const schema = linkSchema.safeParse(await request.json());
  if (!schema.success) return NextResponse.json({ message: "Invalid Body" }, { status: 400 });
  if (!checkIfUrl(schema.data.url)) return NextResponse.json({ message: "Invalid URL" }, { status: 400 });

  const { slug, url, disabled, expiration, maxUses, password, subdomain } = schema.data;

  if (slug || expiration || maxUses || password || subdomain) {
    if (!data.data.isPaid) return NextResponse.json({ message: "You must be a paid user to use this feature" }, { status: 402 });
  }

  let slugExists = false;
  if (slug) {
    const link = await prisma.link.findUnique({ where: { slug } });
    if (link) slugExists = true;
  }

  let domainExists = false;
  if (subdomain) {
    const domain = await prisma.subdomain.findFirst({ where: { name: subdomain, userId: data.data.id } });
    if (domain) domainExists = true;
  }

  const link = await prisma.link.create({
    data: {
      url,
      slug: generateSlug(6),
      disabled: disabled || false,
      expiresAt: expiration || null,
      maxUses: maxUses || null,
      password: password || null,
      domain: domainExists ? subdomain : null,
      user: { connect: { id: data.data.id } }
    }
  });

  if (slugExists) return NextResponse.json({ message: "The given slug already exists, so a new one was generated", link }, { status: 201 });
  return NextResponse.json({ link });
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