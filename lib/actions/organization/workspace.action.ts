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

export const createWorkspace = async(name: string, startTrial: boolean): Promise<void> => {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  
  await prisma.workspace.create({
    data: {
      name,
      plan: startTrial ? "PLUS" : "FREE",
      trial: startTrial ? {
        create: {
          end: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          start: new Date()
        }
      } : undefined,
      members: {
        create: {
          user: {
            connect: {
              id: session.user.id
            }
          },
          role: "ADMIN"
        }
      }
    }
  });
}