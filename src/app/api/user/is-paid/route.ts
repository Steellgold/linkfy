import { userSchemaResponse } from "#/lib/utils/api/schema.user";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ userId: null, isPaid: false }, { status: 200 });

  const { data, error } = await supabase.from("User").select("isPaid,id").eq("id", user.id).single();
  if (error) return NextResponse.json({ userId: user.id, isPaid: false }, { status: 200 });

  const schema = userSchemaResponse.safeParse(data);
  if (!schema.success) return NextResponse.json({ userId: user.id, isPaid: false }, { status: 200 });

  return NextResponse.json({ userId: user.id, isPaid: schema.data.isPaid }, { status: 200 });
}