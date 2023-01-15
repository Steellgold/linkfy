<script lang="ts">
  import clsx from "clsx";

  export let type: "button" | "submit" | "reset" = "button";
  export let disabled: boolean = false;
  export let size: "large" | "default" = "default";

  const sizeClass = clsx({
    "w-full": size === "large",
    "": size === "default",
  });
</script>

<button on:click type={type} disabled={disabled} class="{sizeClass} text-white focus:ring-2 outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 transition-all ease-in-out 3s">
  <slot></slot>
</button>