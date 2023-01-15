<script lang="ts">
  import clsx from "clsx";

  export let type: "button" | "submit" | "reset" = "button";
  export let disabled: boolean = false;
  export let size: "large" | "default" = "default";
  export let hidden: boolean = false;

  const sizeClass = clsx({
    "w-full": size === "large",
    "": size === "default",
  });

  let disabledClass = clsx({
    "bg-blue-600 hover:bg-blue-700 focus:ring-blue-800": disabled == false,
    "bg-blue-900 focus:ring-blue-900": disabled == true,
  });
</script>

<button on:click type={type} disabled={disabled} class="{sizeClass} {disabledClass} text-white focus:ring-2 outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all ease-in-out 3s {hidden ? 'hidden' : ''}">
  <slot></slot>
</button>