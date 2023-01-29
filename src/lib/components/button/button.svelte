<script lang="ts">
  import { colorClass, sizeClass, type ButtonProps } from ".";
  
  export let props: ButtonProps = {
    type: "button",
    disabled: false,
    size: "medium",
    variant: "blue"
  };
</script>

<button
  type={props.type}
  class="text-white focus:ring-2 focus:outline-none font-medium rounded-lg px-4 py-2 text-center {sizeClass[props.size]} {colorClass[props.variant]}"
  disabled={props.disabled}>
  <slot></slot>
</button>