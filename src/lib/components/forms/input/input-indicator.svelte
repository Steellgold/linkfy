<script lang="ts">
  import { SizeClasses, type InputProps } from ".";

  export let props: InputProps;
</script>

<div class="flex">
  {#if props.indicator !== ""}
    <span class="inline-flex items-center rounded-l-md border border-r-0 border-gray-600 bg-gray-600 px-3 text-sm text-gray-400">
      {props.indicator}
    </span>
  {/if}

  <input
    class="border {SizeClasses[props.size]} rounded-r-lg block p-2.5 border-gray-600  placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 {props.disabled ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "text-white bg-gray-700"}"
    type={props.type}
    placeholder={props.placeholder}
    value={props.value}
  />
</div>