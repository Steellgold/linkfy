<script lang="ts">
  import { page } from "$app/stores";
  import { PUBLIC_URL } from "$env/static/public";
  import { Button, Link } from "$lib/components/button";
  import { Container } from "$lib/components/layout/container";
  import { pushToast } from "$lib/components/layout/toast";
  import { IconArrowBack, IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight, IconEdit } from "$lib/icons";
  import { onMount } from "svelte";
  import { formatNumbers, minimize } from "$lib/utils/Link";
  import Cookies from "js-cookie";
  import dayjs from "dayjs";
  
  let loading: boolean = true;

  let pinfo = {
    current: 0,
    total: 0,
    pages: new Array(),
    linksPerPage: 10
  };

  onMount(async () => {
    let res = await fetch(PUBLIC_URL + "api/links?visitorId=" + Cookies.get("fpVisitorId"))
    if ($page.data.session?.user) res = await fetch(PUBLIC_URL + "api/links?userId=" + $page.data.session?.user.id);
    
    if (res.status !== 200) return pushToast("An error has occurred while fetching your history", "danger");
    const linksData = await res.json();
    const links = linksData;
    const pagesCount = Math.ceil(links.length / pinfo.linksPerPage);
    
    for (let i = 0; i < pagesCount; i++) {
      pinfo.pages.push(links.slice(i * pinfo.linksPerPage, (i + 1) * pinfo.linksPerPage));
      pinfo.total += links.slice(i * pinfo.linksPerPage, (i + 1) * pinfo.linksPerPage).length;
    }

    loading = false;
  });

  function nextPage() {
    if (pinfo.current + 1 < pinfo.pages.length) pinfo.current++;
  }

  function prevPage() {
    if (pinfo.current - 1 >= 0) pinfo.current--;
  }

  function firstPage() {
    pinfo.current = 0;
  }

  function lastPage() {
    pinfo.current = pinfo.pages.length - 1;
  }
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
          {#each Array(pinfo.total + 3) as _}
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
          {#if pinfo.total !== 0}
            {#each pinfo.pages[pinfo.current] as link }
              <tr class="border-b bg-gray-800 hover:bg-gray-700 group {link === pinfo.pages[pinfo.current][pinfo.pages[pinfo.current].length - 1] ? "border-transparent" : "border-gray-700"}">
                <th scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap">
                  { minimize(link.url) }
                </th>
                <td class="px-6 py-4 whitespace-nowrap">
                  <a href="{PUBLIC_URL + link.slug}" class="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500" data-sveltekit-preload-data="off">
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
      {#if !loading && pinfo.pages.length === 0}
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

  {#if !loading && pinfo.pages.length > 0}
    <div class="flex items-center justify-center gap-2 pb-5 pt-3">
      <Button props={{ size: "ultrasmall", variant: "blue"}} on:click={() => firstPage()}>
        <IconChevronsLeft />
      </Button>
      <Button props={{ size: "ultrasmall", variant: "blue"}} on:click={() => prevPage()}>
        <IconChevronLeft />
      </Button>
      <span class="text-gray-400">Page {pinfo.current + 1} of {pinfo.pages.length}</span>
      <Button props={{ size: "ultrasmall", variant: "blue"}} on:click={() => nextPage()}>
        <IconChevronRight />
      </Button>
      <Button props={{ size: "ultrasmall", variant: "blue"}} on:click={() => lastPage()}>
        <IconChevronsRight />
      </Button>
    </div>
  {/if}

  {#if loading}
    <div class="flex items-center justify-center gap-2 pb-5 pt-3">
      <div class="animate-pulse h-4 bg-gray-600 rounded w-3/4"></div>
    </div>
  {/if}

  <div class="flex items-center justify-between text-sm font-normal gap-3">
    <Link props={{ href: "/", withIcon: true, variant: "blue", size: "large" }}>
      <IconArrowBack /> Back to home
    </Link>
  </div>
</Container>