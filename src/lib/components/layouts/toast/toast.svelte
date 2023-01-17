<script lang="ts">
  import { fly } from "svelte/transition";
  import { Alert } from "../alert";
  import { toasts } from "./index";
</script>

<!-- in the upper right corner -->
<!-- margin right 3px -->
<div class="fixed left-auto top-0 right-0">
  {#each $toasts as toast }
    <div class="w-50 sm:w-100 my-3" transition:fly={{ x: 200, duration: 500 }}>
      <Alert type={toast[1]}>
        {toast[0]}
      </Alert>
    </div>
  {/each}
</div>