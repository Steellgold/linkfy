import { error, redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load = (async({ data }) => {
  if (!data.status) throw error(423, { message: "This link has been disabled", code: 423 });

  throw redirect(303, data.url);
}) satisfies PageLoad;