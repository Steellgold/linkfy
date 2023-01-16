<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
  import { RedirectButton } from "$lib/components/button";
</script>

<div class="flex items-center justify-center py-8 mx-auto md:h-screen lg:py-0">
  <div class="w-full p-6 rounded-lg shadow border md:mt-0 sm:max-w-md bg-gray-800 border-gray-700 sm:p-8">
    <h1 class="mb-1 text-xl font-bold md:text-2xl text-white">Shortened URL</h1>
    <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
      <div class="flex items-center justify-between text-sm font-normal gap-3">
        <RedirectButton path="/history" size="large">
          <i class="fa-solid fa-arrow-left"></i>&nbsp;&nbsp;Back to history
        </RedirectButton>
      </div>
    </form>
  </div>
</div>