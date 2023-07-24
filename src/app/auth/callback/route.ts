import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "#/lib/db/database.types";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import type { NextRequest } from "next/server";
import { prisma } from "#/lib/db/prisma";

export const GET = async(request: NextRequest): Promise<NextResponse> => {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    await supabase.auth.exchangeCodeForSession(code);

    const user = (await supabase.auth.getSession()).data.session?.user;
    if (!user) return NextResponse.redirect(requestUrl.origin);

    const data = await prisma.user.findUnique({ where: { email: user.email } });
    if (!data && user.email) await prisma.user.create({ data: {
      id: user.id,
      email: user.email
    } });
  }

  return NextResponse.redirect(requestUrl.origin);
};