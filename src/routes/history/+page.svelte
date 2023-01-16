<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
  import { RedirectButton } from "$lib/components/button";

  function getOriginalUrlMinimized(url: string) {
    if (url.length > 21) {
      return url.substring(0, 21) + "[...]";
    }
    return url;
  }
</script>

<div class="flex items-center justify-center py-8 mx-auto md:h-screen lg:py-0">
  <div class="w-full p-6 rounded-lg shadow border md:mt-0 sm:max-w-md bg-gray-800 border-gray-700 sm:p-8">
    <h1 class="mb-1 text-xl font-bold md:text-2xl text-white">History</h1>

    <div class="flex p-4 mb-4 text-sm rounded-lg bg-gray-700 text-blue-400">
      <div class="flex items-center justify-between text-sm font-normal gap-3">
        <div class="flex flex-col">
          <span class="font-bold">Shortened URL</span>
          <span class="text-xs text-gray-400">9sja28&</span>
        </div>
        <div class="flex flex-col">
          <span class="font-bold">Original URL</span>
          <span class="text-xs text-gray-400">
            <a href="https://steellgold.fr">{ getOriginalUrlMinimized("https://link.steellgold.fr/steellgold") }</a>
          </span>
        </div>
        <div class="flex flex-col">
          <!-- <DropdownButton props={{ id: "dropdown", label: "Actions", items: [
            { label: "Copy", href: "#" },
            { label: "Delete", href: "#" },
          ] }} /> -->
        </div>
      </div>
    </div>

    <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
      <div class="flex items-center justify-between text-sm font-normal gap-3">
        <RedirectButton path="/" size="large">
          <i class="fa-solid fa-arrow-left"></i>&nbsp;&nbsp;Return
        </RedirectButton>
      </div>
    </form>
  </div>
</div>