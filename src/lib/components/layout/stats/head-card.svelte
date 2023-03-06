<script lang="ts">
  import { IconLoader } from "@tabler/icons-svelte";

  export let title: string;
  export let subtitle: string;
  export let loading = false;
</script>

{#if loading}
  <div class="flex flex-col items-center justify-center h-24 rounded bg-gray-800">
    <div role="status">
      <IconLoader class="w-8 h-8 mr-2 animate-spin text-gray-600 fill-blue-600" />
      <span class="sr-only">Loading...</span>
    </div>
  </div>
{:else}
  <div class="flex flex-col items-center justify-center h-24 rounded bg-gray-800">
    <h5 class="flex items-center gap-2 mb-2 text-2xl font-bold tracking-tight text-white">
      {title}
    </h5>
    {#if subtitle !== ""}
      <p class="font-normal -mt-1 text-base flex gap-2 text-gray-400">
        {subtitle}
      </p>
    {/if}
  </div>
{/if}