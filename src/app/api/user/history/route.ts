import { prisma } from "#/lib/db/prisma";
import { linksSchema } from "#/lib/utils/api/schema.user";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ userId: null, links: null }, { status: 200 });

  const data = await prisma.link
    .findMany({
      where: { userId: user.id },
      select: {
        slug: true,
        url: true,
        createdAt: true,
        disabled: true,
        clicks: true,
        password: true,
        expireAt: true,
        subdomain: true,
        maxUses: true
      }
    });

  const result = linksSchema.safeParse({ userId: user.id, links: data });

  if (!result.success) return NextResponse.json({ result });
  return NextResponse.json({ userId: user.id, links: result.data.links }, { status: 200 });
}