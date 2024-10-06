import { Prisma } from "@prisma/client";

export type GetWorkspaceType = Prisma.WorkspaceGetPayload<{
  include: {
    members: {
      include: {
        user: {
          select: {
            name: true,
            image: true,
            id: true
          }
        }
      }
    },
    tags: true
  }
}>;

export type CreateWorkspaceMutation = {
  name: string;
  startTrial: boolean;
}