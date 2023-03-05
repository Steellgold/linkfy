<script lang="ts">
  import { SizeClasses, Variants, type ButtonProps } from ".";

  export let props: ButtonProps = {
    type: "button",
    variant: "blue",
    size: "sm",
    disabled: false,
    full: true,
  }
</script>

<button
  type={props.type}
  class="flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-center font-medium text-white focus:ring-0 {SizeClasses[props.size]} {Variants[props.variant]} {props.disabled ? 'cursor-not-allowed opacity-60' : ''} {props.full ? 'w-full' : 'w-auto'}" disabled={props.disabled} on:click>
  <slot />
</button>