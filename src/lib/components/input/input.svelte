<script lang="ts">
  export let type: "url" | "text" | "email" | "password" = "url";
  export let disabled: boolean = false;
  export let size: "large" | "default" = "default";
  export let placeholder: string = "";
  export let id: string = "";
  export let value: string;
  export let hidden: boolean = false;
  export let label: string = "";

  if (id === "") id = Math.random().toString(36).substring(7);

  const sizeClass = { large: "w-full", default: "" }[size] as string;

  const byDisabled = {
    0: "outline-none focus:ring-1 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500",
    1: "bg-gray-800 border-gray-700 placeholder-gray-500",
  }[disabled ? 1 : 0] as string;

  function changeValue(event: Event) {
    const target = event.target as HTMLInputElement;
    value = target.value;
  }
</script>

{#if label} 
  <label for={id} class="block mb-2 text-sm font-medium text-white">{label}</label>
{/if}
<input type={type} disabled={disabled} id={id} class="border sm:text-sm rounded-lg block p-2.5 text-white {hidden ? "hidden" : ""} {sizeClass} {byDisabled}" placeholder={placeholder} on:input={changeValue}>