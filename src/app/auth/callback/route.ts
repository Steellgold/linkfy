import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "#/lib/db/database.types";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import type { NextRequest } from "next/server";

export const GET = async(request: NextRequest): Promise<NextResponse> => {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(requestUrl.origin);
};