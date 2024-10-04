import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { NextAuthRequest } from "next-auth/lib";
import { NextResponse } from "next/server";

export const GET = auth(async(req: NextAuthRequest) => {
  if (!req) {
    return NextResponse.json(
      { error: "You must be signed in to view this page." },
      { status: 401 }
    );
  }

  const url = new URL(req.url);
  const organizationId = url.searchParams.get("id");
  if (!organizationId) return NextResponse.json(req.auth?.user.workspaces);

  const organization = req.auth?.user.workspaces.find((org) => org.id === organizationId);
  if (organization) return NextResponse.json(organization);

  const prismaOrganization = await prisma.workspace.findFirst({
    where: {
      id: organizationId,
      members: {
        some: {
          userId: req.auth?.user.id,
        },
      },
    },
  });

  if (!prismaOrganization) {
    return NextResponse.json(
      { error: "You are not a member of this organization." },
      { status: 401 }
    );
  }

  return NextResponse.json(prismaOrganization);
})