import { PUBLIC_URL } from "$env/static/public";
import prisma from "$lib/database/Prisma";
import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load = (async({ locals })  => {
  if (locals.session?.user) {
    throw redirect(303, "/");
  }

  return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
  login: async({ request, locals, cookies }) => {
    const body = Object.fromEntries(await request.formData());

    const { error: err, data } = await locals.sb.auth.signInWithPassword({
      email: body.email as string,
      password: body.password as string
    });

    if (err) {
      if (err instanceof AuthApiError && err.status === 400) {
        return fail(400, { error: err.message });
      }
      return fail(500, { message: err.message });
    }

    const res = await fetch(PUBLIC_URL + "api/links/sync?visitorId=" + cookies.get("fpVisitorId") + "&userId=" + data.user?.id);
    if (!res.ok) return fail(500, { message: "Failed to synchronize links" });

    if (data.user?.id && data.user?.email) {
      const user = await prisma.user.findUnique({
        where: {
          id: data.user.id
        }
      });

      if (user) {
        locals.user = {
          email: user.email,
          isPremium: user.isPremium,
          role: user.role as "user" | "admin"
        };
      } else {
        const user = await prisma.user.create({
          data: {
            id: data.user.id,
            email: data.user.email
          }
        });


        locals.user = {
          email: data.user.email,
          isPremium: user?.isPremium ?? false,
          role: user?.role as "user" | "admin" ?? "user"
        };
      }
    } else {
      console.error("User ID or email not found");
    }

    throw redirect(303, "/");
  }
};