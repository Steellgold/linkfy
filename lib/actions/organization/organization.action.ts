"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Organization } from "@prisma/client";

export const getOrganizations = async (): Promise<Organization[]> => {
  const session = await auth();
  if (!session) return [];
  
  return prisma.organization.findMany({
    where: {
      members: {
        some: {
          userId: session.user.id
        }
      }
    }
  });
}