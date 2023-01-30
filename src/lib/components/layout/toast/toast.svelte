<script lang="ts">
  import { IconAlertTriangle, IconBellRinging, IconCheck, IconInfoCircle, IconTrafficCone } from "$lib/icons";
  import { fly } from "svelte/transition";
  import { toasts } from "./index";

  export let colors: { [key: string]: string } = {
    "danger": "text-red-400",
    "success": "text-green-400",
    "warning": "text-orange-300",
    "info": "text-blue-400",
  };
</script>

<div class="fixed left-auto top-0 right-2">
  {#each $toasts as toast }
    <div class="w-50 sm:w-100 my-3" transition:fly={{ x: 200, duration: 500 }}>
      <div id="toast-simple" class="flex items-center w-full max-w-xs p-4 space-x-4 divide-x rounded-lg shadow {colors[toast[1]]} space-x divide-gray-700 bg-gray-800" role="alert">
        {#if toast[1] === "danger"} <IconAlertTriangle />
        {:else if toast[1] === "success"} <IconCheck />
        {:else if toast[1] === "warning"} <IconTrafficCone /> 
        {:else if toast[1] === "info"} <IconInfoCircle /> {/if}
        <div class="pl-4 text-sm font-normal">{ toast[0] }</div>
      </div>
    </div>
  {/each}
</div>