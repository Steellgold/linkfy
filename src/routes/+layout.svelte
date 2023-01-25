<script lang="ts">
  import "../app.postcss";

  import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'
  import { pushToast, Toasts } from "$lib/components/layouts/toast";
  import { onMount } from "svelte";
  import { PUBLIC_FINGERPRINT_API_KEY } from "$env/static/public";
  import { Navbar } from "$lib/components/layouts/navbar";
  import Cookies from "js-cookie"

  onMount(() => {
    const fpPromise = FingerprintJS.load({ apiKey: PUBLIC_FINGERPRINT_API_KEY, region: "eu" });

    fpPromise.then(fp => fp.get({ extendedResult: true })).then(result => {
      update(result.visitorId, result.browser, resultData.os);
    }).catch((error) => { 
      pushToast("For a better experience, please disable your adblocker", "danger");
      update(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), "Unknown", "Unknown");
    });
  })

  function update(visitorId: string, browser: string, system: string) {
    Cookies.set("visitorId", visitorId, { expires: 1 });
    Cookies.set("browser", browser, { expires: 1 });
    Cookies.set("system", system, { expires: 1 });
  }
</script>

<Navbar />

<slot />

<Toasts />