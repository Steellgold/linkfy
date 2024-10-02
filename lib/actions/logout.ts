"use server";

import { signOut } from "@/auth";
import { redirect } from "next/navigation";

export const userLogout = async () => {
  await signOut();
  redirect("/");
}