<script lang="ts">
  import { page } from "$app/stores";
  import { Link } from "$lib/components/button";
  import { Container } from "$lib/components/layout/container";
  import { IconAlertTriangle, IconArrowBack } from "$lib/icons";
</script>

<Container maxSize="2xl">
  <div class="mb-2 p-0">
    <h1 class="mb-1 text-xl font-bold md:text-2xl text-white">History</h1>
    <p class="text-sm font-normal text-red-300 flex items-center gap-2">
      <IconAlertTriangle size={30} /> You are not connected, so the links you generate cannot be available on all your devices.
    </p>

    {#if $page.data.session?.user }
      <p class="text-sm font-normal text-white">You are connected as <span class="font-bold">{ $page.data.session.user.email }</span>.</p>
    {/if}
  </div>

  <div class="flex items-center justify-between text-sm font-normal gap-3">
    <Link props={{ href: "/", withIcon: true, variant: "blue", size: "large" }}>
      <IconArrowBack /> Back to home
    </Link>
  </div>
</Container>