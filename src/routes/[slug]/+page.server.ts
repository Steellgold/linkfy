import { PUBLIC_URL, PUBLIC_API_URL } from "$env/static/public";
import type { Link } from "$lib/types/link.type";
import { restRequest } from "$lib/utils/request/request";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

// eslint-disable-next-line
export const load = (async({ params }) => {
  if (!params.slug) throw redirect(303, PUBLIC_URL);

  const data = await restRequest<Link>("get", PUBLIC_URL + "api/link", {
    query: {
      slug: params.slug
    }
  }, [], true);

  if (!data.success) {
    throw error(404, { message: "This link not exist or has been disabled", code: 404 });
  }

  fetch(PUBLIC_API_URL + "link/" + params.slug);

  if (!data.data.status) throw error(423, { message: "This link has been disabled", code: 423 });
  throw redirect(303, data.data.url);
}) satisfies PageServerLoad;