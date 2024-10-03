import { auth, signOut } from "@/auth";
import { NextAuthRequest } from "next-auth/lib";

export const GET = auth(async (req: NextAuthRequest) => {
  if (req.auth) {
    await signOut({
      redirectTo: "/outed"
    });
  }
});