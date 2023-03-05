<script lang="ts">
    import { formatNumber } from "$lib/utils/NumberUtils";
  import { IconArrowBigDownLinesFilled, IconArrowBigUpLinesFilled, IconLoader } from "@tabler/icons-svelte";

  export let title: string;
  export let subtitle: string;
  export let count: number;

  export let subtitleType: "other" | "country" = "other";
  export let up: boolean;

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
      {#if subtitleType !== "country"}
        {#if up}
          <IconArrowBigUpLinesFilled class="text-green-400 animate-pulse mt-1" />
        {:else}
          <IconArrowBigDownLinesFilled class="text-red-400 animate-pulse mt-1" />
        {/if}
      {/if}
    </h5>
    {#if subtitleType === "other"}
      <p class="font-normal flex gap-2 text-gray-400">
        {formatNumber(count)}
        {#if subtitle !== ""}
          <span class="{up ? 'text-green-400' : 'text-red-400'}">
            {subtitle}
          </span>
        {/if}
      </p>
    {:else if subtitleType === "country"}
      <p class="font-normal flex items-center gap-2 text-gray-400">
        <img src="https://www.countryflags.com/wp-content/uploads/france-flag-png-large.png" alt="{subtitle}" class="w-6 h-4 rounded-sm border border-white" />
        {#if subtitle !== ""}
          {subtitle}
        {/if}
      </p>
    {/if}
  </div>
{/if}