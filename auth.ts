import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import authConfig from "./auth.config"
import { prisma } from "./lib/prisma"

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
})