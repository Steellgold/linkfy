import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

import type { NextAuthConfig } from "next-auth"
 
export default {
  providers: [
    // Resend({
    //   from: "Linkfy <no-reply@linkfy.fr>"
    // }),
    GitHub, Google
  ],
} satisfies NextAuthConfig