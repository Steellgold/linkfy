<script lang="ts">
  import Button from "./button.svelte";

  export let newTab: boolean = false;
  export let path: string = "/";

  export let disabled: boolean = false;
  export let size: "small" | "default" | "large" = "default";
  export let hidden: boolean = false;
  export let color: "blue" | "red" | "green" | "yellow" | "pro" = "blue";
  
  $: Props = {
    disabled: disabled,
    size: size,
    hidden: hidden,
    variant: color,
  };

  function clickButton() {
    if (newTab) window.open(path, "_blank");
    else window.location.href = path;
  }
</script>

<Button on:click={clickButton} ButtonProps={Props}>
  <slot></slot>
</Button>