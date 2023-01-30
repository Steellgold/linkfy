<script lang="ts">
  import { IconBellRinging } from "$lib/icons";
  import { fly } from "svelte/transition";
  import { toasts } from "./index";
</script>

<div class="fixed left-auto top-0 right-2">
  {#each $toasts as toast }
    <div class="w-50 sm:w-100 my-3" transition:fly={{ x: 200, duration: 500 }}>
      <div id="toast-simple" class="flex items-center w-full max-w-xs p-4 space-x-4 divide-x rounded-lg shadow text-gray-400 divide-gray-700 space-x bg-gray-800" role="alert">
        <IconBellRinging />
        <div class="pl-4 text-sm font-normal">{ toast[0] }</div>
      </div>
    </div>
  {/each}
</div>