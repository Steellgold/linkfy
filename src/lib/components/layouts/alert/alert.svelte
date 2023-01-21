<script lang="ts">
  /**
   * The type of the alert.
   * @default "info"
   * @type {"danger" | "warning" | "success" | "info"}
   */
  export let type: string = "info";

  let icon = {
    danger: "fa-solid fa-exclamation-circle",
    warning: "fa-solid fa-triangle-exclamation",
    success: "fa-solid fa-check-circle",
    info: "fa-solid fa-info-circle"
  }[type] as string;

  let color = {
    danger: "text-red-400",
    warning: "text-yellow-400",
    success: "text-green-400",
    info: "text-blue-400"
  }[type] as string;
</script>

<div class="p-4 mb-4 text-sm rounded-lg bg-gray-800 {color} border border-gray-700" role="alert">
  <i class="{icon} mr-2"></i>
  <slot></slot>
</div>