import { redirect } from "next/navigation";

export const GET = (): void => {
  redirect("/dashboard");
};