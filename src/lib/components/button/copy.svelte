<script lang="ts">
  import { copy } from "$lib/utils/Utils";
  import Button from "./button.svelte";

  export let toCopy: string;

  export let disabled: boolean = false;
  export let size: "large" | "default" = "default";
  export let hidden: boolean = false;
  export let color: "blue" | "red" | "green" | "yellow" | "pro" = "blue";
  
  $: Props = {
    disabled: disabled,
    size: size,
    hidden: hidden,
    variant: color,
  };

  function clickButton() {
    if (!toCopy) return;
    copy(toCopy);
  }
</script>

<Button on:click={clickButton} ButtonProps={Props}>
  <i class="fa-solid fa-clipboard"></i>
</Button>