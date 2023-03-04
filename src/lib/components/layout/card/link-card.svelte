<script lang="ts">
  export let link: string = "/";
</script>

<a href={link} class="flex flex-col items-center border rounded-lg shadow md:flex-row md:max-w-xl border-gray-700 bg-gray-800 hover:bg-gray-700 transition-colors duration-300 ease-in-out group">
  <div class="flex flex-col justify-between p-4 leading-normal">
    <slot />
  </div>
</a>