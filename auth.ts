import NextAuth, { DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import authConfig from "./auth.config"
import { prisma } from "./lib/db/prisma"
import { Workspace } from "@prisma/client"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      workspaces: Workspace[]
    } & DefaultSession["user"]
  }

  interface User {
    workspaces: Workspace[]
  }
}

export const {
  handlers,
  auth,
  signIn,
  signOut,
  unstable_update: update
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    async jwt({ token, user }): Promise<typeof token> {
      if (user) {
        const workspaces = await prisma.workspace.findMany({
          where: {
            members: {
              some: {
                userId: user.id,
              },
            },
          },
          select: {
            id: true,
            name: true,
            plan: true,
          },
        });

        token.id = user.id;
        token.workspaces = workspaces;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.workspaces = token.workspaces as Workspace[];
      }
      return session;
    }
  }
})