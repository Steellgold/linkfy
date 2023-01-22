<script lang="ts">
  import { goto } from "$app/navigation";
  import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'
  import { PUBLIC_FINGERPRINT_API_KEY } from "$env/static/public";
  import { error as SvelteKitError, redirect } from "@sveltejs/kit";
  import Cookies from "js-cookie";
  import { onMount } from "svelte";


    // /src/routes/test/[param0]/[param1]/+page.server.ts
  // import { error as SvelteKitError, redirect } from "@sveltejs/kit";
  // import Cookies from "js-cookie";

  // /** @type {import('./$types').PageServerLoad} */
  //   const { short } = params;
  //   const link = await fetch("api/links/single?shortUrl=" + short);

  //   if (link.status !== 200) {
  //     throw SvelteKitError(link.status, {
  //       message: "Link not found",
  //       code: link.status
  //     });
  //   }

  //   const cookie: string = Cookies.get("visitorId") ?? "myCookie";
  //   throw redirect(301, cookie);

  onMount(async () => {
    const url = window.location.href;
    const short = url.split("/").pop();
    const link = await fetch("api/links/single?shortUrl=" + short, { 
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const dataNow = await link.json();
    console.log(dataNow);

    if (link.status != 200) {
      throw SvelteKitError(404, {
        message: "Link not found",
        code: link.status
      });
    }

    // get data from dataNow
    let countries: { [key: string]: number } = dataNow.countries ?? {};
    let newClicks = dataNow.clicks + 1;

    const fpPromise = FingerprintJS.load({ apiKey: PUBLIC_FINGERPRINT_API_KEY, region: "eu" })    
    fpPromise.then(fp => fp.get({
      extendedResult: true
    })).then(async result => {
      const visitorId = result.visitorId;
      const country = result.ipLocation?.country?.code ?? "Unknow";
      console.log(visitorId, country);

      if (countries[country] == undefined) {
        countries[country] = 1;
      } else {
        countries[country] += 1;
      }

      let res = await fetch("api/links/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
        shortUrl: short,
        data: {
          clicks: newClicks,
          countries: countries,
        }
      })
    });

    goto(dataNow.baseUrl);
    }).catch((error) => { 
      console.log("An error", error);
    });
  });
</script>