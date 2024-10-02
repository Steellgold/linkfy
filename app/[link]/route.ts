import { redis } from "@/lib/db/upstash";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

type Params = {
  params: {
    link: string;
  };
};

const linkSchema = z.object({
  baseUrl: z.string().url(),
  // TODO: Add more validations
});

export const GET = async(request: NextRequest, { params: { link } }: Params): Promise<NextResponse> => {
  const value = await redis.get(link);
  if (!value) {
    return NextResponse.redirect(process.env.PUBLIC_URL + "/not-found");
  }

  const body = linkSchema.safeParse(value);
  if (!body.success) {
    return NextResponse.redirect(process.env.PUBLIC_URL + "/not-found");
  }

  return NextResponse.redirect(body.data.baseUrl);
};