<script lang="ts">
  import { fly } from "svelte/transition";
  import Alert from "../alert/alert.svelte";
  import { toasts } from "./index";
</script>

<!-- in the upper right corner -->
<div class="fixed top-20 right-7 lg:top-1 lg:right-1/2 lg:translate-x-1/2">
  {#each $toasts as toast }
    <div class="w-100 my-3" transition:fly={{ x: 200, duration: 500 }}>
      <Alert type={ toast[1] }>
        {toast[0]}
      </Alert>
    </div>
  {/each}
</div>