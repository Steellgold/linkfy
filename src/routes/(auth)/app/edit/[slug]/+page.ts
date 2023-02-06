import { PUBLIC_URL } from "$env/static/public";
import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load = (async({ params })  => {
  const { slug } = params;

  // Check if the slug is valid
  if (!slug) {
    throw redirect(303, "/");
  }

  const data = await fetch(PUBLIC_URL + "api/link?slug=" + slug, { method: "GET" });
  if (data.status !== 200 || !data.ok) {
    throw redirect(303, "/");
  }

  const link = await data.json();
  return {
    slugData: {
      slug: link.slug,
      url: link.url
    }
  };
}) satisfies PageLoad;