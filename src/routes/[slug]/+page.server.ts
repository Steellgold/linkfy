import { PUBLIC_URL } from "$env/static/public";
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

  await fetch(PUBLIC_URL + "api/link/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      slug: params.slug,
      data: {
        clicks: data.data.clicks + 1
      }
    })
  });

  return {
    url: data.data.url,
    status: data.data.status
  };
}) satisfies PageServerLoad;