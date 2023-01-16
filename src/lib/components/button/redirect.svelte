<script lang="ts">
  import clsx from "clsx";

  export let path: string = "/";
  export let disabled: boolean = false;
  export let newTab: boolean = false;
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

  function clickButton() {
    if (newTab) window.open(path, "_blank");
    else window.location.href = path;
  }
</script>

<button on:click={clickButton} type="button" disabled={disabled} class="{sizeClass} text-white focus:ring-2 outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center {disabledClass} transition-all ease-in-out 3s {hidden ? 'hidden' : ''}">
  <slot></slot>
</button>