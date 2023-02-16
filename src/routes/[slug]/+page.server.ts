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

  await restRequest("get", PUBLIC_API_URL + "link/increment", {
    query: {
      slug: params.slug
    }
  });

  return {
    url: data.data.url,
    status: data.data.status
  };
}) satisfies PageServerLoad;