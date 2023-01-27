import { AuthApiError } from "@supabase/supabase-js";
import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const load = async(locals: any) => {
  const { session } = await locals;
  if (session) throw redirect(303, "/app");
};

export const actions: Actions = {
  login: async({ request, locals }) => {
    const body = Object.fromEntries(await request.formData());

    const { data, error: err } = await locals.sb.auth.signInWithPassword({
      email: body.email as string,
      password: body.password as string
    });

    if (err) {
      if (err instanceof AuthApiError && err.status === 400) {
        return {
          status: 400,
          message: "Invalid email or password."
        };
      }

      return {
        status: 500,
        message: "Server error. Try again later."
      };
    }

    throw redirect(303, "/app");
  }
};