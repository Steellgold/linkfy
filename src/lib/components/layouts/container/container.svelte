<script lang="ts">
  export let maxSize: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" = "2xl";

  let size = {
    "sm": "sm:max-w-sm",
    "md": "sm:max-w-md",
    "lg": "sm:max-w-lg",
    "xl": "sm:max-w-xl",
    "2xl": "sm:max-w-2xl",
    "3xl": "sm:max-w-3xl",
    "4xl": "sm:max-w-4xl",
    "5xl": "sm:max-w-5xl",
    "6xl": "sm:max-w-6xl",
    "7xl": "sm:max-w-7xl"
  }[maxSize] as string;
</script>

<div class="flex flex-col items-center justify-center py-4 px-4 mx-auto lg:py-0">
  <!-- <div class="flex items-center justify-center"></div> -->
  <div class="w-full p-4 rounded-lg shadow border md:mt-0 {size} bg-gray-800 border-gray-700 sm:p-5">
    <slot></slot>
  </div>
</div>