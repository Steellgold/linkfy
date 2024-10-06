"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { WorkspaceMember } from "@prisma/client";

export const getMembers = async (workspaceId: string): Promise<WorkspaceMember[]> => {
  const session = await auth();
  if (!session) return [];
  
  return prisma.workspaceMember.findMany({
    where: {
      workspaceId
    }
  });
}