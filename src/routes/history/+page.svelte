<script lang="ts">
  import { Button } from "$lib/components/forms/button";
  import { Input } from "$lib/components/forms/input";
  import { minimize } from "$lib/utils/StringUtils";
</script>

<div class="flex flex-col items-center mx-auto px-3 py-4 lg:py-0">
  <div class="w-full rounded-lg border-2 p-4 shadow md:mt-0 sm:max-w-4xl border-gray-700 bg-gray-800 sm:p-5">
    <div class="mb-2 p-0">
      <h1 class="mb-1 text-xl font-bold text-white md:text-2xl">History</h1>
      <p class="text-sm font-normal text-white">
        THis is your history page, you can see all your links here, and you can also delete them.
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
              <th scope="row" class="px-4 py-3 font-medium whitespace-nowrap text-white">{ minimize("https://google.com", 17) }</th>
              <td class="px-4 py-3">x1aAz</td>
              <td class="px-4 py-3">Apple</td>
              <td class="px-4 py-3">03/02/2021 23:16</td>
              <td class="px-4 py-3">26/02/2023 14:18</td>
              <td class="px-4 py-3 flex gap-1">
                <a href="/" class="hover:text-white p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5"></path>
                    <path d="M10 14l10 -10"></path>
                    <path d="M15 4l5 0l0 5"></path>
                  </svg>
                </a>

                <a href="/" class="hover:text-white p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                    <path d="M11 15v2"></path>
                    <path d="M14 11v6"></path>
                    <path d="M17 13v4"></path>
                  </svg>
                </a>

                <a href="/" class="hover:text-white p-2">
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
    <a href="/" class="flex text-blue-600 hover:text-blue-500 gap-2 justify-center p-4 items-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-big-left-line-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M9.586 4l-6.586 6.586a2 2 0 0 0 0 2.828l6.586 6.586a2 2 0 0 0 2.18 .434l.145 -.068a2 2 0 0 0 1.089 -1.78v-2.586h5a1 1 0 0 0 1 -1v-6l-.007 -.117a1 1 0 0 0 -.993 -.883l-5 -.001v-2.585a2 2 0 0 0 -3.414 -1.414z" stroke-width="0" fill="currentColor"></path>
        <path d="M4.415 12l6.585 -6.586v3.586l.007 .117a1 1 0 0 0 .993 .883l5 -.001v4l-5 .001a1 1 0 0 0 -1 1v3.586l-6.585 -6.586z" stroke-width="0" fill="currentColor"></path>
        <path d="M21 8a1 1 0 0 1 .993 .883l.007 .117v6a1 1 0 0 1 -1.993 .117l-.007 -.117v-6a1 1 0 0 1 1 -1z" stroke-width="0" fill="currentColor"></path>
     </svg>
      Ride to the home page
    </a>
  </div>
</div>