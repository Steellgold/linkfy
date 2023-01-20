<!-- Range -->
<script lang="ts">
  export let min: number = 3;
  export let max: number = 4;
  export let value: number = 5;
  
  export let disabled: boolean = false;
  export let label: string = "";

  function changeValue(event: Event) {
    const target = event.target as HTMLInputElement;
    value = parseInt(target.value);
  }
</script>

{#if label}
<label for="default-range" class="block text-sm font-medium text-white">{label}</label>
{/if}
<input id="default-range" disabled={disabled} type="range" min={min} max={max} value={value} class="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700" on:input={changeValue}>
