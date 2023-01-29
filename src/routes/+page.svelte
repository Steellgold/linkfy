<script lang="ts">
  import { Container } from "$lib/components/layout/container";
  import { Input } from "$lib/components/forms/input";
  import { Button, Link } from "$lib/components/button";
  import { IconAdjustmentsAlt, IconCopy, IconExternalLink, IconHistory, IconUnlink } from "$lib/icons";
  import { page } from "$app/stores";
  import type { PageData } from './$types';

  export let data: PageData;

  export let baseUrl: string = "";
  export let finalUrl: string = "";

  export let adjust: boolean = false; // TODO: Pro feature
  export let adjustedFinalUrl: string = "";
</script>

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

    <div class="flex items-center justify-between text-sm font-normal gap-2">
      <Button props={{ type: "button", size: "large", variant: "blue", withIcon: true }}>
        <IconUnlink /> Transform
      </Button>
      <Button props={{ type: "button", size: "medium", variant: "blue" }}>
        <IconCopy />
      </Button>
      <Link props={{ href: "/app/history", size: "medium", variant: "blue" }}>
        <IconHistory />
      </Link>
    </div>
  </form>    
</Container>