<script lang="ts">
  import { colorClass, sizeClass, type ButtonProps } from ".";

  export let props: ButtonProps = {
    type: "button",
    disabled: false,
    size: "medium",
    variant: "blue",
    withIcon: false
  };

  let iconClass = "";
  if (props.withIcon) iconClass = "flex items-center justify-center gap-2";
</script>

<button
  type={props.type}
  class="{iconClass} rounded-lg px-4 py-2 text-center font-medium text-white focus:ring-0 {sizeClass[
    props.size
  ]} {colorClass[props.variant]} transition-all ease-in-out {props.disabled
    ? 'cursor-not-allowed opacity-60'
    : ''}"
  disabled={props.disabled}
  on:click
>
  <slot />
</button>