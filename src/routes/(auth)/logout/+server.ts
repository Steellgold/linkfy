import { error, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async({ locals }) => {
  const { error: err } = await locals.sb.auth.signOut();

  if (err) {
    throw error(500, {
      message: "Something went wrong logging you out.",
      code: 500
    });
  }

  throw redirect(303, "/");
};