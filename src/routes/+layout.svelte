<script lang="ts">
  import { supabaseClient } from '$lib/database/Supabase';
  import { invalidateAll } from '$app/navigation'
  import { onMount } from 'svelte'
	import '../app.postcss';
    import { Header } from '$lib/components/layout/header';

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

<Header>
  <slot></slot>
</Header>