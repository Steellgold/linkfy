<script lang="ts">
  import clsx from "clsx";
  import type { ButtonProps } from ".";

  export let ButtonProps: ButtonProps;

  const sizeClass = clsx({
    "px-3 py-2 text-xs": ButtonProps.size === "small",
    "px-5 py-2.5 text-sm": ButtonProps.size === "default",
    "w-full px-5 py-2.5": ButtonProps.size === "large"
  });

  let colorClass = clsx({
    "bg-blue-600 hover:bg-blue-700 focus:ring-blue-800": ButtonProps.variant === "blue",
    "bg-red-700 hover:bg-red-800 focus:ring-red-800": ButtonProps.variant === "red",
    "bg-green-600 hover:bg-green-700 focus:ring-green-800": ButtonProps.variant === "green",
    "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-800": ButtonProps.variant === "yellow",
    "bg-pro hover:bg-pro-h focus:ring-pro-f": ButtonProps.variant === "pro"
  });

  let colorClassDisabled = clsx({
    "bg-blue-800": ButtonProps.variant === "blue",
    "bg-red-500": ButtonProps.variant === "red",
    "bg-green-400": ButtonProps.variant === "green",
    "bg-yellow-400": ButtonProps.variant === "yellow",
    "bg-pro-d": ButtonProps.variant === "pro"
  });
</script>

<button on:click disabled={ButtonProps.disabled} class="{sizeClass} {ButtonProps.disabled ? colorClassDisabled : colorClass} text-white focus:ring-2 outline-none font-medium rounded-lg text-center transition-all ease-in-out 3s {ButtonProps.hidden ? 'hidden' : ''}">
  <slot></slot>
</button>