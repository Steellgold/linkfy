<script lang="ts">
  import { PUBLIC_URL } from "$env/static/public";
  import { RedirectButton } from "$lib/components/button";
  import { Container } from "$lib/components/layouts/container";
  import { minimize } from "$lib/utils/Utils";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<!-- This page is totally useless, replaced by an better history page with graphs -->
<Container maxSize="4xl">
  <h1 class="mb-1 text-xl font-bold md:text-2xl text-white">History</h1>

  <div class="relative overflow-x-auto shadow-md sm:rounded-lg pt-3">
    <table class="w-full text-sm text-left text-gray-400">
      <thead class="text-xs uppercase bg-gray-700 text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
            URL
          </th>
          <th scope="col" class="px-6 py-3">
            Shortened URL
          </th>
          <th scope="col" class="px-6 py-3">
            Date
          </th>
          <th scope="col" class="px-6 py-3">
            Views
          </th>
          <!-- Action dropdown -->
          <th scope="col" class="relative px-6 py-3">
            <span class="sr-only">Actions</span>
          </th>
        </tr>
      </thead>

      <tbody>
        {#each data.links as link }
          <tr class="border-b bg-gray-800 border-gray-700 hover:bg-gray-700">
            <th scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap">
              { minimize(link.baseUrl) }
            </th>
            <td class="px-6 py-4 whitespace-nowrap">
              <a href="{PUBLIC_URL + link.shortUrl}" class="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500">
                {PUBLIC_URL + link.shortUrl}
              </a>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              { new Date(link.createdAt).toLocaleString() }
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              { link.clicksCount }
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <RedirectButton path="/history/{link.shortUrl}" props={{
                size: "large"
              }}>
                <i class="fa-solid fa-eye"></i>&nbsp;&nbsp;View
              </RedirectButton>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
    <div class="flex items-center justify-between text-sm font-normal gap-3">
      <RedirectButton path="/" props={{
        size: "default",
        disabled: false,
        hidden: false,
        variant: "blue"
      }}>
        <i class="fa-solid fa-arrow-left"></i>&nbsp;&nbsp;Back to shortener
      </RedirectButton>
    </div>
  </form>
</Container>