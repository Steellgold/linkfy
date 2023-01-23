<script lang="ts">
  import { PUBLIC_URL } from "$env/static/public";
  import { RedirectButton } from "$lib/components/button";
  import { Container } from "$lib/components/layouts/container";
  import { Pagination } from "$lib/components/layouts/pagination";
  import { formatNumbers, minimize } from "$lib/utils/Utils";
  import Cookies from "js-cookie";
  import { onMount } from "svelte";

  let loading: boolean = true;
  let currentPage = 0;
  let total = 0;
  let perPage = 10;

  let links: any[] = [];

  onMount(async () => {
    const res = await fetch("api/links/all/paginated?type=visitorId&id=" + Cookies.get("visitorId"));
    const data = await res.json();

    links = data.paginatedList;
    total = data.total;
    loading = false;
  });

  let logged: boolean = false;
</script>

<Container maxSize="4xl">
  <h1 class="mb-1 text-xl font-bold md:text-2xl text-white">History</h1>
  {#if !logged}
    <div class="pb-2">
      <p class="text-gray-400">If you want to save your history to an account to retrieve it on another device, <a href="/login" class="text-blue-500">sign in</a> or <a href="/register" class="text-blue-500">register</a>.</p>
    </div>
  {/if}

  <div class="relative overflow-x-auto shadow-md rounded-lg">
    <table class="w-full text-sm text-left text-gray-400">
      <thead class="text-xs uppercase bg-gray-700 text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">URL</th>
          <th scope="col" class="px-6 py-3">Shortened URL</th>
          <th scope="col" class="px-6 py-3">Date</th>
          <th scope="col" class="px-6 py-3">Views</th>
          <!-- TODO: Action dropdown (Edit, Remove, Disable) -->
          {#if logged}
            <th scope="col" class="relative px-6 py-3"><span class="sr-only">Actions</span></th>
          {/if}
        </tr>
      </thead>

      <tbody>
        {#if loading}
          {#each Array(perPage) as _}
            <tr class="border-b bg-gray-800 border-gray-700 hover:bg-gray-700">
              <th scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap">
                <div class="animate-pulse h-4 bg-gray-600 rounded w-3/4"></div>
              </th>
              <td class="px-6 py-4 whitespace-nowrap"><div class="animate-pulse h-4 bg-gray-600 rounded w-3/4"></div></td>
              <td class="px-6 py-4 whitespace-nowrap"><div class="animate-pulse h-4 bg-gray-600 rounded w-3/4"></div></td>
              <td class="px-6 py-4 whitespace-nowrap"><div class="animate-pulse h-4 bg-gray-600 rounded w-3/4"></div></td>
              {#if logged}
                <td class="px-6 py-4 whitespace-nowrap"><div class="animate-pulse h-4 bg-gray-600 rounded w-3/4"></div></td>
              {/if}
            </tr>
          {/each}
        {:else}
          {#each links[currentPage] as link }
            <tr class="border-b bg-gray-800 border-gray-700 hover:bg-gray-700">
              <th scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap">
                { minimize(link.baseUrl) }
              </th>
              <td class="px-6 py-4 whitespace-nowrap">
                <a data-sveltekit-preload-data="off" href="{PUBLIC_URL + link.shortUrl}" class="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500">
                  {PUBLIC_URL + link.shortUrl}
                </a>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                { new Date(link.createdAt).toLocaleString() }
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                { formatNumbers(link.clicks) }
              </td>
              {#if logged}
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <RedirectButton path="/history/{link.shortUrl}" size="small">
                    <i class="fa-solid fa-pen-to-square"></i>&nbsp;&nbsp;Manage
                  </RedirectButton>
                </td>
              {/if}
            </tr>
          {/each}
        {/if}
      </tbody>
      {#if !loading && links.length < 0}
        <tfoot>
          <tr>
            <td colspan="5" class="px-6 py-4 whitespace-nowrap bg-gray-700">
                <p class="text-gray-400">History was empty, try to shorten some links!</p>
            </td>
          </tr>
        </tfoot>
      {/if}
    </table>
  </div>

  <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
    {#if !loading && links.length > 0}
      <Pagination total={total} bind:value={currentPage} />

      <hr class="border-gray-700" />
    {/if}

    <div class="flex items-center justify-between text-sm font-normal gap-3">
      <RedirectButton path="/" size="large">
        <i class="fa-solid fa-arrow-left"></i>&nbsp;&nbsp;Back to shortener
      </RedirectButton>
    </div>
  </form>
</Container>