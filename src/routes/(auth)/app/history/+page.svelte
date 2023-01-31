<script lang="ts">
  import { page } from "$app/stores";
  import { PUBLIC_URL } from "$env/static/public";
  import { Link } from "$lib/components/button";
  import { Container } from "$lib/components/layout/container";
  import { pushToast } from "$lib/components/layout/toast";
  import { IconArrowBack, IconEdit } from "$lib/icons";
  import { onMount } from "svelte";
  import Cookies from "js-cookie";
  import dayjs from "dayjs";
    import { formatNumbers, minimize } from "$lib/utils/Link";

  let loading: boolean = true;
  let pages = new Array();
  const linksPerPage = 10; // Can edit in the future to make it customizable
  let currentPage = 0;
  let total = 0;

  onMount(async () => {
    const res = await fetch(PUBLIC_URL + "api/links?visitorId=" + Cookies.get("fpVisitorId"));
    if (res.status !== 200) return pushToast("An error has occurred while fetching your history", "danger");
    const linksData = await res.json();
    const links = linksData;
    const pagesCount = Math.ceil(links.length / linksPerPage);
    
    for (let i = 0; i < pagesCount; i++) {
      pages.push(links.slice(i * linksPerPage, (i + 1) * linksPerPage));
      total += links.slice(i * linksPerPage, (i + 1) * linksPerPage).length;
    }

    loading = false;
  });
</script>

<Container maxSize={ $page.data.session?.user ? "4xl" : "3xl" }>
  <div class="mb-2 p-0">
    <h1 class="mb-1 text-xl font-bold md:text-2xl text-white">History</h1>
    {#if !$page.data.session?.user }
      <p class="text-sm font-normal text-red-300 flex items-center gap-2">
        If you are not logged in, you will not be able to save all your links generated on different devices or access statistics of their usage.
      </p>
    {/if}
  </div>

  <div class="relative overflow-x-auto shadow-md rounded-lg mb-3">
    <table class="w-full text-sm text-left text-gray-400">
      <thead class="text-xs uppercase bg-gray-700 text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">URL</th>
          <th scope="col" class="px-6 py-3">Shortened URL</th>
          <th scope="col" class="px-6 py-3">Date</th>
          <th scope="col" class="px-6 py-3">Views</th>
          {#if $page.data.session?.user }
            <th scope="col" class="relative px-6 py-3"><span class="sr-only">Actions</span></th>
          {/if}
        </tr>
      </thead>

      <tbody>
        {#if loading}
          {#each Array(total + 1) as _}
            <tr class="border-b bg-gray-800 border-gray-700 hover:bg-gray-700">
              <th scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap">
                <div class="animate-pulse h-4 bg-gray-600 rounded w-3/4"></div>
              </th>
              <td class="px-6 py-4 whitespace-nowrap"><div class="animate-pulse h-4 bg-gray-600 rounded w-3/4"></div></td>
              <td class="px-6 py-4 whitespace-nowrap"><div class="animate-pulse h-4 bg-gray-600 rounded w-3/4"></div></td>
              <td class="px-6 py-4 whitespace-nowrap"><div class="animate-pulse h-4 bg-gray-600 rounded w-3/4"></div></td>
              {#if $page.data.session?.user }
                <td class="px-6 py-4 whitespace-nowrap"><div class="animate-pulse h-4 bg-gray-600 rounded w-3/4"></div></td>
              {/if}
            </tr>
          {/each}
        {:else}
          {#if total !== 0}
            {#each pages[currentPage] as link }
              <tr class="border-b bg-gray-800 hover:bg-gray-700 group {link === pages[currentPage][pages[currentPage].length - 1] ? "border-transparent" : "border-gray-700"}">
                <th scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap">
                  { minimize(link.url) }
                </th>
                <td class="px-6 py-4 whitespace-nowrap">
                  <a href="{PUBLIC_URL + link.slug}" class="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500">
                    {PUBLIC_URL + link.slug}
                  </a>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  { dayjs(link.createdAt).format("DD/MM/YYYY HH:mm") }
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  { formatNumbers(link.clicks) }
                </td>
                {#if $page.data.session?.user }
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium opacity-30 group-hover:opacity-100 transition-opacity duration-200">
                    <Link props={{ href: "edit/" + link.slug, withIcon: true, variant: "blue", size: "small" }}>
                      <IconEdit /> Edit
                    </Link>
                  </td>
                {/if}
              </tr>
            {/each}
          {/if}
        {/if}
      </tbody>
      {#if !loading && pages.length === 0}
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

  <div class="flex items-center justify-between text-sm font-normal gap-3">
    <Link props={{ href: "/", withIcon: true, variant: "blue", size: "large" }}>
      <IconArrowBack /> Back to home
    </Link>
  </div>
</Container>