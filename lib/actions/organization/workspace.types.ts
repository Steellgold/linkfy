import { Color, Prisma } from "@prisma/client";

export type GetLinksType = Prisma.LinkGetPayload<{
  include: {
    createdBy: {
      select: {
        user: {
          select: {
            name: true,
            image: true
          }
        }
      }
    },
    tags: {
      select: {
        name: true,
        color: true
      }
    }
  }
}>;

export type LinkTag = {
  name: string;
  color: Color;
}

export type CreateWorkspaceMutation = {
  name: string;
  startTrial: boolean;
}