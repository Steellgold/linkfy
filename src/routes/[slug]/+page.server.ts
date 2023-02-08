import { PUBLIC_URL } from "$env/static/public";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async({ params, fetch }) => {
  if (!params.slug) throw redirect(303, PUBLIC_URL);

  const data = await fetch(PUBLIC_URL + "api/link?slug=" + params.slug);
  const dataJson = await data.json();

  if (data.status !== 200) throw redirect(303, PUBLIC_URL);

  await fetch(PUBLIC_URL + "api/link/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      slug: params.slug,
      data: {
        clicks: dataJson.clicks + 1
      }
    })
  });

  return {
    url: dataJson.url
  };
}) satisfies PageServerLoad;