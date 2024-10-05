import { Color, Prisma } from "@prisma/client";

export type GetLinkType = Prisma.LinkGetPayload<{
  include: {
    createdBy: {
      select: {
        user: {
          select: {
            name: true,
            image: true,
            email: true
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

export type GetLinksType = Prisma.LinkGetPayload<{
  include: {
    createdBy: {
      select: {
        user: {
          select: {
            name: true,
            image: true,
            email: true
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
}>[];

export type LinkTag = {
  name: string;
  color: Color;
}