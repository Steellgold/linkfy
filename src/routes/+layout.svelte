<script>
  import "../app.postcss";

  import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'
  import { pushToast, Toasts } from "$lib/components/layouts/toast";
  import { onMount } from "svelte";
  import { getVisitorId, setVisitorId } from "$lib/utils/Stores";
  import { PUBLIC_FINGERPRINT_API_KEY } from "$env/static/public";

  onMount(() => {
    if (getVisitorId() !== null) return;
    const fpPromise = FingerprintJS.load({ apiKey: PUBLIC_FINGERPRINT_API_KEY, region: "eu" })

    fpPromise.then(fp => fp.get()).then(result => { setVisitorId(result.visitorId); }).catch((error) => { 
      pushToast("Disable your adblocker to get a better experience", "danger");
     });
  })
</script>

<slot />

<Toasts />