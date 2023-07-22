import { NextResponse } from "next/server";

export function GET(request: Request): NextResponse {
  return NextResponse.json({ message: "GET/", origin: request.headers.get("origin") });
}

export function HEAD(request: Request): NextResponse {
  return NextResponse.json({ message: "HEAD/", origin: request.headers.get("origin") });
}

export function POST(request: Request): NextResponse {
  return NextResponse.json({ message: "POST/", origin: request.headers.get("origin") });
}

export function PUT(request: Request): NextResponse {
  return NextResponse.json({ message: "PUT/", origin: request.headers.get("origin") });
}

export function PATCH(request: Request): NextResponse {
  return NextResponse.json({ message: "PATCH/", origin: request.headers.get("origin") });
}

export function DELETE(request: Request): NextResponse {
  return NextResponse.json({ message: "DELETE/", origin: request.headers.get("origin") });
}

export function OPTIONS(request: Request): NextResponse {
  return NextResponse.json({ message: "OPTIONS/", origin: request.headers.get("origin") });
}