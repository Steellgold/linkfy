<script lang="ts">
  import { copy } from "$lib/utils/Utils";
  import Button from "./button.svelte";

  export let toCopy: string;

  export let disabled: boolean = false;
  export let size: "large" | "default" = "default";
  export let hidden: boolean = false;
  export let color: "blue" | "red" | "green" | "yellow" = "blue";
  
  function clickButton() {
    if (!toCopy) return;
    copy(toCopy);
  }
</script>

<Button on:click={clickButton} color={color} disabled={disabled} hidden={hidden} size={size} type="button">
  <i class="fa-solid fa-clipboard"></i>
</Button>