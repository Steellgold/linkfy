"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { Workspace } from "@prisma/client";

export const getWorkspaces = async (): Promise<Workspace[]> => {
  const session = await auth();
  if (!session) return [];
  
  return prisma.workspace.findMany({
    where: {
      members: {
        some: {
          userId: session.user.id
        }
      }
    }
  });
}