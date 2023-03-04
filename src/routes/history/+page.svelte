<script lang="ts">
  import { minimize } from "$lib/utils/StringUtils";
  import { IconEdit, IconExternalLink, IconMotorbike, IconReportAnalytics, IconTrash } from "@tabler/icons-svelte";
</script>

<div class="flex flex-col items-center mx-auto px-3 py-4 lg:py-0">
  <div class="w-full rounded-lg border-2 p-4 shadow md:mt-0 sm:max-w-4xl border-gray-700 bg-gray-800 sm:p-5">
    <div class="mb-2 p-0">
      <h1 class="mb-1 text-xl font-bold text-white md:text-2xl">History</h1>
      <p class="text-sm font-normal text-white">This is your history page, you can see all your links here, and you can also delete them.</p>
    </div>

    <div class="bg-gray-800 relative sm:rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-400">
          <thead class="text-xs uppercase bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" class="px-4 py-3">URL</th>
              <th scope="col" class="px-4 py-3">Shortened URL</th>
              <th scope="col" class="px-4 py-3">Created date</th>
              <th scope="col" class="px-4 py-3">Clicks</th>
              <th scope="col" class="px-4 py-3">Last</th>
              <th scope="col" class="px-4 py-3"><span class="sr-only">Actions</span></th>
            </tr>  
          </thead>
          <tbody>
            <tr class="border-b border-gray-700">
              <th scope="row" class="px-4 py-3 font-medium whitespace-nowrap text-white">{ minimize("https://google.com", 18) }</th>
              <td class="px-4 py-3">x1aAz</td>
              <td class="px-4 py-3">03/02/2021 23:16</td>
              <td class="px-4 py-3">0</td>
              <td class="px-4 py-3">26/02/2023 14:18</td>
              <td class="px-4 py-3 flex">
                <a href="/" class="hover:text-white p-2 transition-colors duration-200"><IconExternalLink size={20} /></a>
                <a href="/x1aAz/stats" class="hover:text-white p-2 transition-colors duration-200"><IconReportAnalytics size={20} /></a>
                <a href="/" class="hover:text-red-400 p-2 transition-colors duration-200"><IconTrash size={20} /></a>
                <a href="/x1aAz/edit" class="hover:text-white p-2 transition-colors duration-200"><IconEdit size={20} /></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div class="mt-2">
    <a href="/" class="flex text-blue-600 hover:text-blue-500 gap-2 justify-center p-4 items-center group">
      Ride to the home
     <IconMotorbike size={20} class="group-hover:rotate-45 group-hover:-translate-x-[9.7rem] transition-transform duration-1000 ease-in-out translate-x-0 -scale-x-100" />
    </a>
  </div>
</div>