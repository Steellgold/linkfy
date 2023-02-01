import { PUBLIC_URL } from "$env/static/public";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async({ params, fetch }) => {
  if (!params.short) throw redirect(303, PUBLIC_URL);

  const data = await fetch(PUBLIC_URL + "api/link?slug=" + params.short);
  const dataJson = await data.json();

  if (data.status !== 200) throw redirect(303, PUBLIC_URL + params.short);

  await fetch(PUBLIC_URL + "api/links/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      slug: params.short,
      data: {
        clicks: dataJson.clicks + 1
      }
    })
  });

  return {
    url: dataJson.url
  };
}) satisfies PageServerLoad;