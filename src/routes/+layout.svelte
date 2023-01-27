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

    fpPromise.then(fp => fp.get()).then(result => {
      Cookies.set("visitorId", result.visitorId, { expires: 7 });
    }).catch((error) => { 
      Cookies.set("visitorId", Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), { expires: 7 });
    });
  })
</script>

<Navbar />

<slot />

<Toasts />