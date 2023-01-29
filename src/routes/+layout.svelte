<script lang="ts">
  import { supabaseClient } from '$lib/database/Supabase';
  import { invalidate, invalidateAll } from '$app/navigation'
  import { onMount } from 'svelte'
	import '../app.postcss';

  onMount(() => {
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

<slot></slot>