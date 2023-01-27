import { redirect } from "@sveltejs/kit";

export const load = async(locals: any) => {
  const { session } = await locals;
  if (session) throw redirect(303, "/app");
};