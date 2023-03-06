<script lang="ts">
  export let value: number = 0;
  export let min: number = 0;
  export let max: number = 100;
  export let step: number = 1;

  export let label: string | undefined = undefined;
  
  const id = Math.random().toString(36).substr(2, 9);
</script>

{#if label}
  <label for={id} class="block mb-2 text-sm font-medium text-white">{label}</label>
{/if}
<input id={id} type="range" class="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700" min={min} max={max} step={step} bind:value={value} />