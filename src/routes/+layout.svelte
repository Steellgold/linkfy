<script lang="ts">
  import { supabaseClient } from '$lib/database/Supabase';
  import { invalidateAll } from '$app/navigation'
  import { onMount } from 'svelte'
  import { Header } from '$lib/components/layout/header';
  import { PUBLIC_FINGERPRINT_API_KEY } from '$env/static/public';
  import { Toasts } from '$lib/components/layout/toast';
  import Cookies from "js-cookie";
  import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'
	import '../app.postcss';

  onMount(() => {
    if (Cookies.get('fpVisitorId') === undefined) {
      const fpPromise = FingerprintJS.load({
        apiKey: PUBLIC_FINGERPRINT_API_KEY
      });

      fpPromise
        .then(fp => fp.get())
        .then(result => {
          Cookies.set('fpVisitorId', result.visitorId);
        })
        .catch(error => {
          // Some AdBlockers block FingerprintJS Pro and it's impossible to detect them
          Cookies.set('fpVisitorId', Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
        });
    }

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange(() => {
      invalidateAll()
    })

    return () => {
      subscription.unsubscribe()
    }
  })
</script>

<Header>
  <slot></slot>
</Header>

<Toasts />