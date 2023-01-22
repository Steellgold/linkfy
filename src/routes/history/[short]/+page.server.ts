import { error as SvelteKitError, type LoadEvent } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, fetch }: LoadEvent) {
  const { short } = params;
  const link = await fetch(`/api/links/single?shortUrl=${short}`);

  const linkData = await link.json();

  if (!linkData) {
    throw SvelteKitError(404, {
      message: "Not found",
      code: 404
    });
  }

  return {
    linkData
  };
}