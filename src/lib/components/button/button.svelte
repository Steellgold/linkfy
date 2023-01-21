<script lang="ts">
  import type { Variant } from ".";
  import type { ButtonProps } from ".";

  export let ButtonProps: ButtonProps;

  const sizeClass = {
    small: "px-3 py-2 text-xs",
    default: "px-5 py-2.5 text-sm",
    large: "w-full px-5 py-2.5" 
  }[ButtonProps.size ?? "default"] as string;

  let colorClass = {
    "red": "bg-red-700 hover:bg-red-800 focus:ring-red-800",
    "blue": "bg-blue-600 hover:bg-blue-700 focus:ring-blue-800",
    "green": "bg-green-600 hover:bg-green-700 focus:ring-green-800",
    "yellow": "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-800",
    "pro": "bg-pro hover:bg-pro-h focus:ring-pro-f"
  }[ButtonProps.variant ?? "blue"] as string;

  let colorClassDisabled = {
    "blue": "bg-blue-800",
    "red": "bg-red-500",
    "green": "bg-green-400",
    "yellow": "bg-yellow-400",
    "pro": "bg-pro-d"
  }[ButtonProps.variant ?? "blue"] as string;
</script>

<button
  on:click
  disabled={ButtonProps.disabled}
  class="{sizeClass} {ButtonProps.disabled ? colorClassDisabled : colorClass} text-white focus:ring-2 outline-none font-medium rounded-lg text-center transition-all ease-in-out 3s {ButtonProps.hidden ? 'hidden' : ''}"
  >
  <slot></slot>
</button>