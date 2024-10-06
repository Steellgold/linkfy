"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { GetLinksType, GetLinkType } from "./link.types";

export const getLink = async (id: string): Promise<GetLinkType> => {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  return prisma.link.findUniqueOrThrow({
    where: {
      id
    },
    include: {
      createdBy: {
        select: {
          user: {
            select: {
              name: true,
              image: true,
              email: true,
              id: true
            }
          }
        }
      },
      tags: {
        select: {
          name: true,
          color: true,
          id: true
        }
      }
    }
  });
}

export const getLinks = async (workspaceId: string): Promise<GetLinksType> => {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  return prisma.link.findMany({
    where: {
      workspaceId
    },
    include: {
      createdBy: {
        select: {
          user: {
            select: {
              name: true,
              image: true,
              email: true,
              id: true
            }
          }
        }
      },
      tags: {
        select: {
          name: true,
          color: true,
          id: true
        }
      }
    }
  });
}

export const deleteLink = async (id: string): Promise<void> => {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  await prisma.link.delete({
    where: {
      id
    }
  });
}