import type { PageLoad } from "./$types";
import { error as SvelteKitError, redirect } from "@sveltejs/kit";
import { PUBLIC_FINGERPRINT_API_KEY, PUBLIC_URL } from "$env/static/public";
import FingerprintJS from "@fingerprintjs/fingerprintjs-pro";
import { browser as SvelteBrowser } from "$app/environment";

export const ssr = false;

export const load = (async({ params, fetch }) => {
  const link = await fetch(PUBLIC_URL + "api/links/single?shortUrl=" + params.short, {
    method: "GET", headers: { "Content-Type": "application/json" }
  });

  const dataNow = await link.json();

  if (link.status != 200) throw SvelteKitError(404, { message: "Link not found", code: link.status });
  const countries: { [key: string]: number } = dataNow.countries ?? {};
  const platforms: { [key: string]: number } = dataNow.platforms ?? {};
  const browsers: { [key: string]: number } = dataNow.browsers ?? {};
  const newClicks = dataNow.clicks + 1;

  let country = "";
  let platform = "";
  let browser = "";

  if (!SvelteBrowser) {
    throw redirect(301, dataNow.baseUrl);
  }

  const fpPromise = FingerprintJS.load({ apiKey: PUBLIC_FINGERPRINT_API_KEY, region: "eu" });
  await fpPromise.then(fp => fp.get({ extendedResult: true })).then(async result => {
    country = result.ipLocation?.country?.code ?? "Unknow";
    platform = result.os ?? "Unknow";
    browser = result.browserName ?? "Unknow";
  });

  if (countries[country]) countries[country] += 1; else countries[country] = 1;
  if (platforms[platform]) platforms[platform] += 1; else platforms[platform] = 1;
  if (browsers[browser]) browsers[browser] += 1; else browsers[browser] = 1;

  await fetch(PUBLIC_URL + "api/links/update", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      shortUrl: params.short,
      data: {
        clicks: newClicks,
        coutries: countries,
        platforms: platforms,
        browsers: browsers
      }
    })
  }).then(res => {
    throw redirect(301, dataNow.baseUrl);
  });
}) satisfies PageLoad;