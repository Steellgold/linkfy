import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load = (async ({ data }) => {
  throw redirect(303, data.url);
}) satisfies PageLoad;
