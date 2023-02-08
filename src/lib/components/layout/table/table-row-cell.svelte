<script lang="ts">
  export let first: boolean = false;
</script>

<td class="whitespace-nowrap px-6 py-4 {first ? 'font-medium text-white' : ''}">
  <slot></slot>
</td>