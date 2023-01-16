<script lang="ts">
  import clsx from "clsx";
  export let type: "danger" | "warning" | "success" | "info" = "info";

  let icon = clsx({
    "fa-solid fa-exclamation-circle": type === "danger",
    "fa-solid fa-triangle-exclamation": type === "warning",
    "fa-solid fa-check-circle": type === "success",
    "fa-solid fa-info-circle": type === "info",
  });

  let color = clsx({
    "text-red-400": type === "danger",
    "text-yellow-400": type === "warning",
    "text-green-400": type === "success",
    "text-blue-400": type === "info",
  });
</script>

<div class="p-4 mb-4 text-sm rounded-lg bg-gray-800 {color} border border-gray-700" role="alert">
  <i class="{icon}"></i>&nbsp;
  <slot></slot>
</div>