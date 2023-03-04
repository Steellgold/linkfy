<script lang="ts">
  import { formatNumber } from "$lib/utils/NumberUtils";

  export let iconUrl: string = "";
  export let name: string;
  export let count: number;
  export let percentage: number;
</script>

<div class="flex items-center justify-between my-1 text-sm">
  <div class="w-full relative" style="max-width: calc(100% - 5rem);">
    <div class="absolute top-0 left-0 h-full bg-behind bg-opacity-15" style="width: {percentage}%"></div>
    <span class="flex px-2 py-1.5 text-gray-300 relative z-9 break-all">
      <a class="md:truncate block hover:underline" href="/">
        {#if iconUrl !== ""}
          <img src={iconUrl} class="inline w-4 h-4 mr-2 -mt-px align-middle" alt={name} />
        {/if}
        {name}
      </a>
    </span>
  </div>
  <span class="font-medium text-gray-200 w-52 text-right">
    { formatNumber(count) } <span class="font-normal text-gray-500">({percentage}%)</span>
  </span>
</div>