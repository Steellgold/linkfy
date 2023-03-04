<script lang="ts">
  export let yearly: boolean = false;
  export let name: string = "";
</script>

<label class="relative inline-flex items-center cursor-pointer mx-auto max-w-screen-xl mb-8">
  <input type="checkbox" value="" class="sr-only peer" bind:checked={yearly}>
  <div class="w-11 h-6 peer-focus:outline-none peer-focus:ring-[#F4D562] rounded-full peer bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-[#F4D562]"></div>
  <span class="ml-3 text-sm font-medium text-gray-300">{name}</span>
</label>