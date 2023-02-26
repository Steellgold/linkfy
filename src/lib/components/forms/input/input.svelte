<script lang="ts">
  import { SizeClasses, type InputProps } from ".";

  export let props: InputProps;
</script>

{#if props.label}
  <label class="block text-sm font-medium leading-5 text-gray-300" for="url">
    {props.label}
  </label>
{/if}

<input
  class="border {SizeClasses[props.size]} rounded-lg block p-2.5 border-gray-600  placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 {props.disabled ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "text-white bg-gray-700"}"
  type={props.type}
  placeholder={props.placeholder}
  value={props.value}
/>