import { prisma } from "#/lib/db/prisma";
import { NextResponse } from "next/server";
import type { ZodObject } from "zod";
import { generateSlug } from "../url";

export const PREPARED_MESSAGES: Record<string, { message: string }> = {
  UNAUTHORIZED: { message: "Unauthorized" },
  INVALID_BODY: { message: "Invalid Body" },
  LINK_NOT_FOUND: { message: "Link not found" },
  PARAMETER_URL_REQUIRED: { message: "Parameter `slug` is required" }
};

export const parseBody = <T>(schema: ZodObject<any>, body: any): T | NextResponse => {
  try {
    return schema.parse(body) as T;
  } catch (e) {
    return NextResponse.json(PREPARED_MESSAGES.INVALID_BODY, { status: 400 });
  }
};

export const checkSlugExists = async(slug: string): Promise<string> => {
  const link = await prisma.link.findFirst({ where: { slug } });
  if (!link) return slug;

  const newSlug = generateSlug(4);
  return checkSlugExists(newSlug);
};