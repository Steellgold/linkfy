import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { AuthApiError } from "@supabase/supabase-js";

export const actions: Actions = {
  register: async({ request, locals }) => {
    const body = Object.fromEntries(await request.formData());

    if (!body.email || !body.password || !body.confirmPassword) {
      return fail(400, {
        error: "Please fill out all fields"
      });
    }

    if (body.password !== body.confirmPassword) {
      return fail(400, {
        error: "Passwords do not match"
      });
    }

    const { error: err } = await locals.sb.auth.signUp({
      email: body.email as string,
      password: body.password as string
    });

    if (err) {
      if (err instanceof AuthApiError && err.status === 400) {
        return fail(400, {
          error: err.message
        });
      }

      return fail(500, {
        error: err.message
      });
    }

    throw redirect(303, "/");
  }
};