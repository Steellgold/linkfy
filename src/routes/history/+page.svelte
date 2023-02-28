<script lang="ts">
  import { minimize } from "$lib/utils/StringUtils";
</script>

<div class="flex flex-col items-center mx-auto px-3 py-4 lg:py-0">
  <div class="w-full rounded-lg border-2 p-4 shadow md:mt-0 sm:max-w-4xl border-gray-700 bg-gray-800 sm:p-5">
    <div class="mb-2 p-0">
      <h1 class="mb-1 text-xl font-bold text-white md:text-2xl">History</h1>
      <p class="text-sm font-normal text-white">
        This is your history page, you can see all your links here, and you can also delete them.
      </p>
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
              <th scope="col" class="px-4 py-3">
                <span class="sr-only">Actions</span>
              </th>
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
                <a href="/" class="hover:text-white p-2 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5"></path>
                    <path d="M10 14l10 -10"></path>
                    <path d="M15 4l5 0l0 5"></path>
                  </svg>
                </a>

                <a href="/x1aAz/stats" class="hover:text-white p-2 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                    <path d="M11 15v2"></path>
                    <path d="M14 11v6"></path>
                    <path d="M17 13v4"></path>
                  </svg>
                </a>

                <a href="/" class="hover:text-red-400 p-2 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M4 7l16 0"></path>
                    <path d="M10 11l0 6"></path>
                    <path d="M14 11l0 6"></path>
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                 </svg>
                </a>

                <a href="/x1aAz/edit" class="hover:text-white p-2 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                    <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                    <path d="M16 5l3 3"></path>
                  </svg>
                </a>
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
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="group-hover:rotate-45 group-hover:-translate-x-[9.5rem] transition-transform duration-1000 ease-in-out translate-x-0 -scale-x-100">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M5 16m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
        <path d="M19 16m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
        <path d="M7.5 14h5l4 -4h-10.5m1.5 4l4 -4"></path>
        <path d="M13 6h2l1.5 3l2 4"></path>
     </svg>
    </a>
  </div>
</div>