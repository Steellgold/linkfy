<script lang="ts">
  import { IconAlertTriangle, IconBug, IconCheck, IconExclamationCircle } from "@tabler/icons-svelte";
import { fly } from "svelte/transition";
  import { toasts } from "./index";

  const color = {
    success: "bg-green-500 text-green-200",
    error: "bg-red-500 text-red-200",
    warning: "bg-yellow-500 text-yellow-200",
    info: "bg-blue-500 text-blue-200",
    bug: "bg-purple-500 text-purple-200"
  };
</script>

<div>
  {#each $toasts as toast}
    <div id="toast-default" class="z-10 flex items-center w-full max-w-xs p-4 border border-gray-700 rounded-lg shadow text-gray-400 bg-gray-800" role="alert" in:fly={{ y: -8, duration: 800 }} out:fly={{ y: -8, duration: 800 }}>
      <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg text-red-200 {color[toast.type]}">
        {#if toast.type == "error"}
          <IconExclamationCircle />
        {:else if toast.type == "success"}
          <IconCheck />
        {:else if toast.type == "warning"}
          <IconAlertTriangle />
        {:else}
          <IconBug />
        {/if}
        <span class="sr-only">Fire icon</span>
      </div>
      <div class="ml-3 text-sm font-normal">{toast.message}</div>
    </div>
  {/each}
</div>