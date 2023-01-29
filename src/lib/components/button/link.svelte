<script lang="ts">
  import { colorClass, sizeClass, type LinkProps } from ".";
  
  export let props: LinkProps = {
    href: "",
    size: "medium",
    variant: "blue",
    withIcon: false,
  };

  let iconClass = "";
  if (props.withIcon) iconClass = "flex items-center justify-center gap-2";
</script>

<a
  href={props.href}
  class="{iconClass} text-white focus:ring-2 focus:outline-none font-medium rounded-lg px-4 py-2 text-center {sizeClass[props.size]} {colorClass[props.variant]}">
  <slot></slot>
</a>