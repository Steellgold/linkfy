<script lang="ts">
  import { SizeClasses, type InputProps } from ".";

  export let props: InputProps;
  export let value: string = "";

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    value = target.value;
  }

  const id = Math.random().toString(36).substr(2, 9);
</script>

{#if props.label}
  <label class="block text-sm font-medium leading-5 text-gray-300 mb-2" for="{id}">
    {props.label}
  </label>
{/if}

<div class="flex">
  {#if props.indicator !== ""}
    <span class="inline-flex items-center rounded-l-md border border-r-0 border-gray-600 bg-gray-600 px-3 text-sm text-gray-400">
      {props.indicator}
    </span>
  {/if}

  <input
    class="border {SizeClasses[props.size]} rounded-r-lg block p-2.5 border-gray-600  placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 {props.disabled ? "text-gray-400 bg-gray-700 cursor-not-allowed" : "text-white bg-gray-700"}"
    type={props.type}
    placeholder={props.placeholder}
    disabled={props.disabled}
    value={value}
    id={id}
    on:change={handleInput}
  />
</div>