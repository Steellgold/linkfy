import { PREPARED_MESSAGES, checkSlugExists, parseBody } from "#/lib/utils/api/parse";
import { authenticateRequest, isPaidUser } from "#/lib/utils/api/keys";
import type { LinkSchema } from "#/lib/utils/api/schema.user";
import { linkSchema } from "#/lib/utils/api/schema.user";
import { generateSlug } from "#/lib/utils/url";
import { NextResponse } from "next/server";
import { prisma } from "#/lib/db/prisma";
import { z } from "zod";

/**
 * Retrieves a link with the specified slug, if it exists and the authenticated user has permission to access it.
 * @param request - The incoming request object.
 * @returns A NextResponse object with a JSON payload containing the link data, or an error message if the link was not found (or perms error)
 */
export async function GET(request: Request): Promise<NextResponse> {
  const data = await authenticateRequest(request);
  if (!data.success) return NextResponse.json(PREPARED_MESSAGES.UNAUTHORIZED, { status: 401 });

  const schema = z.object({ userId: z.string().optional(), success: z.boolean() }).safeParse(data);

  if (!schema.success) return NextResponse.json(PREPARED_MESSAGES.UNAUTHORIZED, { status: 401 });

  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");

  if (!slug) return NextResponse.json({ message: "Parameter `slug` is required" }, { status: 400 });

  const link = await prisma.link.findFirst({ where: { slug, userId: schema.data.userId } });
  if (!link) return NextResponse.json(PREPARED_MESSAGES.LINK_NOT_FOUND, { status: 404 });

  return NextResponse.json({ link });
}

/**
 * Creates a new link with the specified data, if the authenticated user has permission to create it.
 * @param request - The incoming request object.
 * @returns A NextResponse object with a JSON payload containing the newly created link data, or an error message if the operation failed.
 */
export async function POST(request: Request): Promise<NextResponse> {
  const data = await authenticateRequest(request);
  if (!data.success) return NextResponse.json(PREPARED_MESSAGES.UNAUTHORIZED, { status: 401 });

  let isServer = false;
  if (!data.userId) isServer = true;

  const schema = z.object({ userId: z.string().optional(), success: z.boolean() }).safeParse(data);
  if (!schema.success) return NextResponse.json(PREPARED_MESSAGES.UNAUTHORIZED, { status: 401 });

  const body = parseBody<LinkSchema>(linkSchema, await request.json());
  if (body instanceof NextResponse) return body;

  const { url, disabled, slug, expireAt, maxUses, password, subdomain } = body;

  if (!url) return NextResponse.json(PREPARED_MESSAGES.PARAMETER_URL_REQUIRED, { status: 400 });

  let isPaid = false;
  if (!isServer && data.userId) isPaid = await isPaidUser(data.userId);

  const linkData = await prisma.link.create({
    data: {
      slug: ((isPaid || isServer) && slug) ? await checkSlugExists(slug) : await checkSlugExists(generateSlug(4)),
      url,
      disabled: disabled || false,
      password: ((isPaid || isServer) && password) ? password : undefined,
      expireAt: ((isPaid || isServer) && expireAt) ? expireAt : undefined,
      maxUses: ((isPaid || isServer) && maxUses) ? maxUses : undefined,
      subdomain: ((isPaid || isServer) && subdomain) ? subdomain : undefined,
      clicks: 0,
      user: (data.userId) ? { connect: { id: data.userId } } : undefined
    }
  });

  return NextResponse.json({ link: linkData }, { status: 201 });
}

/**
 * Deletes a link with the specified slug, if it exists and the authenticated user has permission to delete it.
 * @param request - The incoming request object.
 * @returns A NextResponse object with a JSON payload indicating whether the operation was successful.
 */
export async function DELETE(request: Request): Promise<NextResponse> {
  const data = await authenticateRequest(request);
  if (!data.success) return NextResponse.json(PREPARED_MESSAGES.UNAUTHORIZED, { status: 401 });

  const schema = z.object({ userId: z.string().optional(), success: z.boolean() }).safeParse(data);
  if (!schema.success) return NextResponse.json(PREPARED_MESSAGES.UNAUTHORIZED, { status: 401 });

  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");

  if (!slug) return NextResponse.json(PREPARED_MESSAGES.PARAMETER_SLUG_REQUIRED, { status: 400 });

  const link = await prisma.link.findFirst({ where: { slug, userId: schema.data.userId || undefined } });
  if (!link) return NextResponse.json(PREPARED_MESSAGES.LINK_NOT_FOUND, { status: 404 });

  await prisma.link.delete({ where: { slug } });

  return NextResponse.json({ success: true }, { status: 200 });
}