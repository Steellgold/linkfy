import type { PageLoad } from "./$types";
import { error as SvelteKitError, redirect } from "@sveltejs/kit";
import { PUBLIC_FINGERPRINT_API_KEY } from "$env/static/public";
import FingerprintJS from "@fingerprintjs/fingerprintjs-pro";
import { browser } from "$app/environment";
import { pushToast } from "$lib/components/layouts/toast";

export const load = (async({ params, fetch }) => {
  const link = await fetch("api/links/single?shortUrl=" + params.short, { method: "GET", headers: { "Content-Type": "application/json" } });
  const dataNow = await link.json();

  if (link.status != 200) throw SvelteKitError(404, { message: "Link not found", code: link.status });
  const countries: { [key: string]: number } = dataNow.countries ?? {};
  const newClicks = dataNow.clicks + 1;

  if (browser) {
    const fpPromise = FingerprintJS.load({ apiKey: PUBLIC_FINGERPRINT_API_KEY, region: "eu" });
    fpPromise.then(fp => fp.get({ extendedResult: true })).then(async result => {
      const visitorId = result.visitorId;
      const country = result.ipLocation?.country?.code ?? "Unknow";

      if (countries[country] == undefined) countries[country] = 1;
      else countries[country] += 1;

      const res = await fetch("api/links/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shortUrl: params.short,
          data: {
            clicks: newClicks,
            countries: countries
          }
        })
      });
    }).catch((error) => {
      console.log(error);
    });
    console.log("Browser");
  }

  throw redirect(301, dataNow.baseUrl);
}) satisfies PageLoad;