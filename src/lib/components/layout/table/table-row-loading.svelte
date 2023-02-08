<script lang="ts">
  export let count: number = 1;
</script>

<tr class="border-b border-gray-700 bg-gray-800 hover:bg-gray-700">
  <th scope="row" class="whitespace-nowrap px-6 py-4 font-medium text-white">
    <div class="h-4 w-3/4 animate-pulse rounded bg-gray-600" />
  </th>

  {#each new Array(count) as _, i}
    <td class="whitespace-nowrap px-6 py-4"><div class="h-4 w-3/4 animate-pulse rounded bg-gray-600" /></td>
  {/each}
</tr>