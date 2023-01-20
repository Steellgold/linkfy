<script>
  import "../app.postcss";

  import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'
  import { pushToast, Toasts } from "$lib/components/layouts/toast";
  import { onMount } from "svelte";
  import { PUBLIC_FINGERPRINT_API_KEY } from "$env/static/public";
  import { Navbar } from "$lib/components/layouts/navbar";
  import Cookies from "js-cookie"

  onMount(() => {
    if (Cookies.get("visitorId") !== undefined) return;
    const fpPromise = FingerprintJS.load({ apiKey: PUBLIC_FINGERPRINT_API_KEY, region: "eu" })

    fpPromise.then(fp => fp.get()).then(result => {
      Cookies.set("visitorId", result.visitorId, { expires: 7 });
    }).catch((error) => { 
      pushToast("Disable your adblocker to get a better experience", "danger");
    });
  })
</script>

<Navbar />

<slot />

<Toasts />