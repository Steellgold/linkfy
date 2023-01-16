<script lang="ts">
  import clsx from "clsx";
  import Button from "./button.svelte";

  export let newTab: boolean = false;
  export let path: string = "/";

  export let disabled: boolean = false;
  export let size: "large" | "default" = "default";
  export let hidden: boolean = false;
  export let color: "blue" | "red" | "green" | "yellow" = "blue";
  
  function clickButton() {
    if (newTab) window.open(path, "_blank");
    else window.location.href = path;
  }
</script>

<Button on:click={clickButton} color={color} disabled={disabled} hidden={hidden} size={size} type="button">
  <slot></slot>
</Button>