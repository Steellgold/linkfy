<script lang="ts">
  export let last: boolean = false;
</script>

<tr class="group border-b bg-gray-800 hover:bg-[#242f3d] {last ? 'border-transparent' : 'border-gray-700'} transition-colors duration-200">
  <slot></slot>
</tr>