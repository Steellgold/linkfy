import { getLink } from "$lib/utils/db/Supabase";
import { error as SvelteKitError, type LoadEvent } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }: LoadEvent) {
  const { short } = params;
  const link = await getLink(short as string);

  if (!link) {
    throw SvelteKitError(404, {
      message: "Not found",
      code: 404
    });
  }

  return {
    link
  };
}