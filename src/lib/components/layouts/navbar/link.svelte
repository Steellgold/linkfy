<script lang="ts">
  export let href: string;
</script>

<li>
  <a href="{href}" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
    <slot />
  </a>
</li>