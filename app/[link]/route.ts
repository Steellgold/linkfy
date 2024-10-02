import { redis } from "@/lib/db/upstash";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: {
    link: string;
  };
};

export const GET = async(request: NextRequest, { params: { link } }: Params): Promise<NextResponse> => {
  const value = await redis.get(link);
  if (!value) {
    return NextResponse.redirect(process.env.PUBLIC_URL + "/not-found");
  }

  return NextResponse.json({ link, value });
};