import { prisma } from "#/lib/db/prisma";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async(request: Request): Promise<NextResponse> => {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);

    const user = (await supabase.auth.getSession()).data.session?.user;
    if (!user) return NextResponse.redirect(requestUrl.origin);

    const data = await prisma.user.findUnique({ where: { email: user.email } });
    if (!data && user.email) await prisma.user.create({ data: { email: user.email } });
  }

  return NextResponse.redirect(requestUrl.origin);
};