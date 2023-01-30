<script lang="ts">
  import { colorClass, sizeClass, type ButtonProps } from ".";
  
  export let props: ButtonProps = {
    type: "button",
    disabled: false,
    size: "medium",
    variant: "blue",
    withIcon: false,
  };

  let iconClass = "";
  if (props.withIcon) iconClass = "flex items-center justify-center gap-2";
</script>

<button
  type={props.type}
  class="{iconClass} text-white focus:ring-0 font-medium rounded-lg px-4 py-2 text-center {sizeClass[props.size]} {colorClass[props.variant]} transition-all ease-in-out {props.disabled ? "opacity-60 cursor-not-allowed" : ""}"
  disabled={props.disabled}
  on:click>
  <slot></slot>
</button>