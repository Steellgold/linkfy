import { NextRequest, NextResponse } from "next/server";
import { ipAddress } from "@vercel/functions";
import { ratelimit, redis } from "@/lib/db/upstash";
import { randomString } from "@/lib/link";
import { z } from "zod";

const schema = z.object({
  baseUrl: z.string().regex(/^(https?:\/\/)?([a-zA-Z0-9-_]+(\.[a-zA-Z0-9-_]+)+)(\/[a-zA-Z0-9-_\/?.=&]*)?$/)
});

export const POST = async(req: NextRequest): Promise<NextResponse> => {
  const ip = ipAddress(req) || "unknown";
  const { success } = await ratelimit(20, "1 d").limit(`${ip}:demo`);
  if (!success) {
    return NextResponse.json({
      message: "You cannot create more than 20 demo links per day",
      success: false
    }, { status: 429 });
  }

  const body = schema.safeParse(await req.json());
  if (!body.success) {
    return NextResponse.json({ message: "Invalid URL", success: false }, { status: 400 });
  }

  const short = randomString(4);

  redis.set(short, {
    baseUrl: body.data.baseUrl,
    createdAt: new Date().toISOString()
  }, {
    ex: 60 * 30
  });

  return NextResponse.json({ shortUrl: `${process.env.PUBLIC_URL}/${short}`, success: true });
};