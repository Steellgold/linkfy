<script lang="ts">
  import "../app.postcss";

  import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'
  import { pushToast, Toasts } from "$lib/components/layouts/toast";
  import { onMount } from "svelte";
  import { PUBLIC_FINGERPRINT_API_KEY } from "$env/static/public";
  import { Navbar } from "$lib/components/layouts/navbar";
  import Cookies from "js-cookie"
  import { supabaseClient } from "$lib/utils/db/Supabase";
  import { invalidateAll } from "$app/navigation";
  import { page } from "$app/stores";

  onMount(() => {
    if (Cookies.get("visitorId") === undefined) {
      const fpPromise = FingerprintJS.load({ apiKey: PUBLIC_FINGERPRINT_API_KEY, region: "eu" });

      fpPromise.then(fp => fp.get()).then(result => {
        Cookies.set("visitorId", result.visitorId, { expires: 7 });
      }).catch((error) => { 
        Cookies.set("visitorId", Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), { expires: 7 });
      });
    }

    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(() => {
			console.log('Auth state change detected');
			invalidateAll();
		});
		return () => {
			subscription.unsubscribe();
		};
  })
</script>

{#if !$page.data.session}
  <h1>Hey, your not logged in</h1>
{:else}
  <h1>Hey, your logged in</h1>
{/if}

<Navbar />

<slot />

<Toasts />