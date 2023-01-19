<script lang="ts">
  import clsx from "clsx";
  export let maxSize: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" = "2xl";

  let size = clsx({
    "sm:max-w-sm": maxSize === "sm",
    "sm:max-w-md": maxSize === "md",
    "sm:max-w-lg": maxSize === "lg",
    "sm:max-w-xl": maxSize === "xl",
    "sm:max-w-2xl": maxSize === "2xl",
    "sm:max-w-3xl": maxSize === "3xl",
    "sm:max-w-4xl": maxSize === "4xl",
    "sm:max-w-5xl": maxSize === "5xl",
    "sm:max-w-6xl": maxSize === "6xl",
    "sm:max-w-7xl": maxSize === "7xl"
  });
</script>

<div class="flex flex-col items-center justify-center py-4 mx-auto lg:py-0">
  <!-- <div class="flex items-center justify-center"></div> -->
  <div class="w-full p-4 rounded-lg shadow border md:mt-0 {size} bg-gray-800 border-gray-700 sm:p-5">
    <slot></slot>
  </div>
</div>