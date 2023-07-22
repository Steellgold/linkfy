import type { LinkSchema } from "#/lib/utils/api/schema.user";
import { linkSchema } from "#/lib/utils/api/schema.user";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { parseBody } from "#/lib/utils/api/parse";

export const POST = async(request: NextRequest): Promise<NextResponse> => {
  const body = parseBody<LinkSchema>(linkSchema, await request.json());
  if (body instanceof NextResponse) return NextResponse.json({ message: "Invalid Body" }, { status: 400 });

  const origin = request.headers.get("origin");
  return NextResponse.json({ origin });
};