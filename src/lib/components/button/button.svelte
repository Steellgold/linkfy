<script lang="ts">
  import clsx from "clsx";

  export let type: "button" | "submit" | "reset" = "button";
  export let disabled: boolean = false;
  export let size: "large" | "default" = "default";
  export let hidden: boolean = false;
  export let color: "blue" | "red" | "green" | "yellow" = "blue";

  const sizeClass = clsx({
    "w-full": size === "large",
    "": size === "default",
  });

  let colorClass = clsx({
    "bg-blue-600 hover:bg-blue-700 focus:ring-blue-800": color === "blue",
    "bg-red-700 hover:bg-red-800 focus:ring-red-800": color === "red",
    "bg-green-600 hover:bg-green-700 focus:ring-green-800": color === "green",
    "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-800": color === "yellow",
  });
</script>

<button on:click type={type} disabled={disabled} class="{sizeClass} {colorClass} text-white focus:ring-2 outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all ease-in-out 3s {hidden ? 'hidden' : ''}">
  <slot></slot>
</button>