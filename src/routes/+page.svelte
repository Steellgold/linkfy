<script lang="ts">
  import { Container } from "$lib/components/layout/container";
  import { Input } from "$lib/components/forms/input";
  import { Button, Link } from "$lib/components/button";
  import { IconAdjustmentsAlt, IconHistory, IconUnlink } from "$lib/icons";
  import type { PageData } from './$types';
    import { page } from "$app/stores";

  export let data: PageData;

  export let baseUrl: string = "";
  export let finalUrl: string = "";

  export let adjust: boolean = false; // TODO: Pro feature
  export let adjustedFinalUrl: string = "";
</script>

{#if $page.data.session}
  <h1 class="text-white">Welcome {$page.data.session.user.email}</h1>
  <p class="text-white">I am logged in!</p>
{:else}
  <h1 class="text-white">I am not logged in</h1>
{/if}

<Container maxSize="md">
  <div class="mb-2 p-0">
    <h1 class="mb-1 text-xl font-bold md:text-2xl text-white">Shorten your links</h1>
    <p class="text-sm font-normal text-white">When you click on the "Use" button, the link will be shortened and you will be redirected to the link.</p>
  </div>

  <form>
    <div class="mb-3">
      <Input bind:value={baseUrl} props={{
        placeholder: "Link to shorten",
        size: "small",
        width: "full",
        autofocus: true
      }} />
    </div>

    {#if !adjust}
      <div class="mb-3">
        <Input bind:value={finalUrl} props={{ placeholder: "Shortened link", size: "small", width: "full", disabled: true }} />
      </div>
    {:else}
      <div class="mb-3">
        <Input bind:value={adjustedFinalUrl} props={{ placeholder: "Choose a shortened link", size: "small", width: "full", tip: "linkfy.fr/" }} />
      </div>
    {/if}

    <div class="flex items-center justify-between text-sm font-normal gap-3">
      <Button props={{ type: "button", size: "large", variant: "blue", withIcon: true }}>
        <IconUnlink /> Reduce URL
      </Button>
      <Button props={{ type: "button", size: "medium", variant: "blue", withIcon: true }} on:click={() => adjust = !adjust}>
        <IconAdjustmentsAlt />
      </Button>
      <Link props={{ href: "/history", size: "medium", variant: "blue" }}>
        <IconHistory />
      </Link>
    </div>
  </form>    
</Container>