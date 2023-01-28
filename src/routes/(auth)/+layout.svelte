<script lang="ts">
  import { page } from "$app/stores";
</script>

<div class="flex flex-col items-center px-4">
  <div class="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
    <slot></slot>
  </div>
</div>

{#if $page.session} 
  <p>hey</p>
{:else}
  <p>nope</p>
{/if}