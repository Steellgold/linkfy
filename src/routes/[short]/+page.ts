import type { PageLoad } from "./$types";
import { error as SvelteKitError, redirect } from "@sveltejs/kit";
import { PUBLIC_URL } from "$env/static/public";

export const load = (async({ params, fetch }) => {
  const link = await fetch(PUBLIC_URL + "api/links/single?shortUrl=" + params.short, {
    method: "GET", headers: { "Content-Type": "application/json" }
  });

  const dataNow = await link.json();
  if (link.status != 200) throw SvelteKitError(404, { message: "Link not found", code: link.status });

  const res = await fetch("http://ip-api.com/json/");
  const data = await res.json();

  const country = data.countryCode ?? "Unknown";
  const countries = dataNow.countries ?? {};

  if (countries[country]) countries[country] += 1; else countries[country] = 1;

  await fetch(PUBLIC_URL + "api/links/update", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      shortUrl: params.short,
      data: {
        clicks: dataNow.clicks + 1,
        countries: countries
      }
    })
  });

  throw redirect(303, dataNow.baseUrl);
}) satisfies PageLoad;