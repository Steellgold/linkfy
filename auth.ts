import NextAuth from "next-auth"
import Resend from "next-auth/providers/resend"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Resend({
      from: "Linkfy <no-reply@linkfy.fr>"
    }),
    Google,
    Github,
  ],
})