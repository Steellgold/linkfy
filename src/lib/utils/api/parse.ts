import { NextResponse } from "next/server";
import type { ZodObject } from "zod";

export const parseBody = <T>(schema: ZodObject<any>, body: any): T | NextResponse => {
  try {
    return schema.parse(body) as T;
  } catch (e) {
    return new NextResponse(JSON.stringify({ message: "Invalid Body", statusCode: 400 }), {
      status: 400
    });
  }
};