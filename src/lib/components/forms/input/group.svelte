<script lang="ts">
  export let label: string = "";
</script>

{#if label}
  <label for="" class="block mb-2 text-sm font-medium text-white">{label}</label>
{/if}

<div class="grid gap-2 mb-6 md:grid-cols-2">
  <slot></slot>
</div>