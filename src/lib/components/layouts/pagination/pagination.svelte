<script lang="ts">
  export let value: number = 0; // Page number (starts at 0)
  export let total: number = 0;

  $: from = value * 10 + 1;
  $: to = (value + 1) * 10;

  let nextDisabled = false;
  let prevDisabled = false;

  function nextPage() {
    if (value + 1 < Math.ceil(total / 10)){
      value++;
      if (value + 1 === Math.ceil(total / 10)) nextDisabled = true;
      prevDisabled = false;
    }
  }

  function prevPage() {
    if (value - 1 >= 0){
      value--;
      if (value - 1 < 0) prevDisabled = true;
      nextDisabled = false;
    }
  }
</script>


<div class="flex flex-col items-center">
  <!-- Help text -->
  <span class="text-sm text-gray-400">
      Showing <span class="font-semibold text-white">{ from }</span> to <span class="font-semibold text-white">{ to }</span> of <span class="font-semibold text-white">{ total }</span> links
  </span>
  <!-- Buttons -->
  <div class="inline-flex mt-2 xs:mt-0">
      <button class="px-4 py-2 text-sm font-medium rounded-l bg-slate-600 text-white transition-all duration-150 ease-in-out" on:click={prevPage}>
          Prev
      </button>
      <button class="px-4 py-2 text-sm font-medium rounded-r bg-slate-600 text-white hover:bg-slate-700 transition-all duration-150 ease-in-out" on:click={nextPage}>
          Next
      </button>
  </div>
</div>