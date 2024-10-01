import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import { Pool } from "@neondatabase/serverless"
import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import authConfig from "./auth.config"

const neon = new Pool({
  connectionString: process.env.POSTGRES_PRISMA_URL,
});

const adapter = new PrismaNeon(neon);
const prisma = new PrismaClient({ adapter });

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