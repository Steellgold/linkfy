"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { GetLinksType, GetLinkType } from "./link.types";
import { decryptData, encryptData } from "@/lib/password";

export const getLink = async (id: string): Promise<GetLinkType> => {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const link = await prisma.link.findUniqueOrThrow({
    where: { id },
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

  return {
    ...link,
    password: link.password ? decryptData(link.password) : null
  };
};

export const getLinks = async (workspaceId: string): Promise<GetLinksType> => {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const links = await prisma.link.findMany({
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

  return links.map((link) => {
    return {
      ...link,
      password: link.password ? decryptData(link.password) : null
    };
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

// Archive and unarchive link

export const archiveLink = async (id: string): Promise<void> => {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  await prisma.link.update({ where: { id }, data: { archived: true } });
}

export const unarchiveLink = async (id: string): Promise<void> => {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  await prisma.link.update({ where: { id }, data: { archived: false } });
}

// Password
export const setPassword = async (linkId: string, password: string | null): Promise<void> => {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  await prisma.link.update({
    where: { id: linkId },
    data: {
      password: password ? encryptData(password) : null
    }
  });
}