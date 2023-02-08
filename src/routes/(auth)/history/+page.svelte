<script lang="ts">
  import { page } from "$app/stores";
  import { PUBLIC_URL } from "$env/static/public";
  import { Button, Link } from "$lib/components/button";
  import { Container } from "$lib/components/layout/container";
  import { pushToast } from "$lib/components/layout/toast";
  import {
    IconArrowBack,
    IconChevronLeft,
    IconChevronRight,
    IconChevronsLeft,
    IconChevronsRight,
    IconEdit,
    IconSearch
  } from "$lib/icons";
  import { onMount } from "svelte";
  import { formatNumbers, minimize } from "$lib/utils/Link";
  import dayjs from "dayjs";
  import Cookies from "js-cookie";
  import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHeader,
    TableHeadRow,
    TableHeadRowCell,
    TableRow
  } from "$lib/components/layout/table";
    import TableRowLoading from "$lib/components/layout/table/table-row-loading.svelte";

  let loading: boolean = true;
  let showSearchResults: boolean = false;

  let pinfo = {
    current: 0,
    total: 0,
    pages: new Array(),
    linksPerPage: 10
  };

  onMount(async () => {
    let res = null;
    if ($page.data.session?.user) {
      res = await fetch(PUBLIC_URL + "api/links?userId=" + $page.data.session?.user.id);
    } else {
      res = await fetch(PUBLIC_URL + "api/links?visitorId=" + Cookies.get("fpVisitorId"));
    }

    if (res.status !== 200) {
      return pushToast("An error has occurred while fetching your history", "danger");
    }
    
    const linksData = await res.json();
    const links = linksData;
    const pagesCount = Math.ceil(links.length / pinfo.linksPerPage);

    for (let i = 0; i < pagesCount; i++) {
      pinfo.pages.push(links.slice(i * pinfo.linksPerPage, (i + 1) * pinfo.linksPerPage));
      pinfo.total += links.slice(i * pinfo.linksPerPage, (i + 1) * pinfo.linksPerPage).length;
    }

    loading = false;
  });

  // TODO: Move nextPage, prevPage, firstPage, lastPage to an Separate component
  function nextPage() {
    if (pinfo.current + 1 < pinfo.pages.length) pinfo.current++;
  }

  // TODO: Move nextPage, prevPage, firstPage, lastPage to an Separate component
  function prevPage() {
    if (pinfo.current - 1 >= 0) pinfo.current--;
  }

  // TODO: Move nextPage, prevPage, firstPage, lastPage to an Separate component
  function firstPage() {
    pinfo.current = 0;
  }

  // TODO: Move nextPage, prevPage, firstPage, lastPage to an Separate component
  function lastPage() {
    pinfo.current = pinfo.pages.length - 1;
  }

  let searchResults: any[] = [];
  let search: string = "";

  function update(e: Event) {
    search = (e.target as HTMLInputElement).value ?? "";

    if (search !== "") showSearchResults = true;
    else showSearchResults = false;
    searchResults = [];

    for (let i = 0; i < pinfo.pages.length; i++) {
      for (let j = 0; j < pinfo.pages[i].length; j++) {
        if (pinfo.pages[i][j].url.startsWith(search)) {
          searchResults.push(pinfo.pages[i][j]);
        }
      }
    }
  }
</script>

<Container maxSize={$page.data.session?.user ? "4xl" : "3xl"}>
  <div class="mb-2 p-0">
    <h1 class="mb-1 text-xl font-bold text-white md:text-2xl">History</h1>
    {#if !$page.data.session?.user}
      <p class="flex items-center gap-2 text-sm font-normal text-red-300">
        If you are not logged in, you will not be able to save all your links generated on different
        devices or access statistics of their usage.
      </p>
    {/if}
    
    <div class="relative mt-2">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
        <IconSearch />
      </div>
      
      <input type="search" id="default-search" class="block w-full p-4 pl-10 text-sm border rounded-lg outline-none bg-gray-700 border-gray-600 placeholder-gray-400 text-white" placeholder="https://google.com" required on:input={update} />
    </div>
  </div>

  <Table>
    <TableHeader>
      <TableHeadRow>
        <TableHeadRowCell>URL</TableHeadRowCell>
        <TableHeadRowCell>Shortened URL</TableHeadRowCell>
        <TableHeadRowCell>Date</TableHeadRowCell>
        <TableHeadRowCell>Views</TableHeadRowCell>
        
        {#if $page.data.session?.user}
          <TableHeadRowCell><span class="sr-only">Actions</span></TableHeadRowCell>
        {/if}
      </TableHeadRow>
    </TableHeader>

    <TableBody>
      {#if !showSearchResults}
        {#if loading}
          <TableRowLoading count={4} />
          <TableRowLoading count={4} />
          <TableRowLoading count={4} />
        {:else}
          {#each pinfo.pages[pinfo.current] as link}
            <TableRow>
              <TableCell first={true}>{minimize(link.url)}</TableCell>
              <TableCell>
                <a href={PUBLIC_URL + link.slug} class=" text-blue-400 hover:text-blue-500" data-sveltekit-preload-data="off">
                  {PUBLIC_URL + link.slug}
                </a>
              </TableCell>
              <TableCell>{dayjs(link.createdAt).format("DD/MM/YYYY HH:mm")}</TableCell>
              <TableCell>{formatNumbers(link.clicks)}</TableCell>
              {#if $page.data.session?.user}
                <TableCell>
                  <Link props={{ href: PUBLIC_URL + link.slug + "/edit", withIcon: true, variant: "action", size: "small" }}><IconEdit /></Link>
                </TableCell>
              {/if}
            </TableRow>
          {/each}
        {/if}
      {:else}
        {#each searchResults as link}
          {#if loading}
            <TableRowLoading count={4} />
            <TableRowLoading count={4} />
            <TableRowLoading count={4} />
          {:else}
            <TableRow>
              <TableCell first={true}>{minimize(link.url)}</TableCell>
              <TableCell>
                <a href={PUBLIC_URL + link.slug} class=" text-blue-400 hover:text-blue-500" data-sveltekit-preload-data="off">
                  {PUBLIC_URL + link.slug}
                </a>
              </TableCell>
              <TableCell>{dayjs(link.createdAt).format("DD/MM/YYYY HH:mm")}</TableCell>
              <TableCell>{formatNumbers(link.clicks)}</TableCell>
              {#if $page.data.session?.user}
                <TableCell>
                  <Link props={{ href: PUBLIC_URL + link.slug + "/edit", withIcon: true, variant: "action", size: "small" }}><IconEdit /></Link>
                </TableCell>
              {/if}
            </TableRow>
          {/if}
        {/each}
      {/if}
    </TableBody>
    
    {#if !loading && !showSearchResults && pinfo.total === 0}
      <TableFooter>
        <p class="text-gray-400">History was empty, try to shorten some links!</p>
      </TableFooter>
    {/if}
  </Table>

  {#if loading}
    <div class="flex items-center justify-center gap-2 pb-5 pt-3">
      <div class="h-4 w-3/4 animate-pulse rounded bg-gray-600" />
    </div>
  {:else}
    {#if pinfo.total > pinfo.linksPerPage}
      <div class="flex items-center justify-center gap-2 pb-5 pt-3">
        <Button props={{ size: "ultrasmall", variant: "gray" }} on:click={() => firstPage()}>
          <IconChevronsLeft />
        </Button>
        <Button props={{ size: "ultrasmall", variant: "gray" }} on:click={() => prevPage()}>
          <IconChevronLeft />
        </Button>
        <span class="text-gray-400">Page {pinfo.current + 1} of {pinfo.pages.length}</span>
        <Button props={{ size: "ultrasmall", variant: "gray" }} on:click={() => nextPage()}>
          <IconChevronRight />
        </Button>
        <Button props={{ size: "ultrasmall", variant: "gray" }} on:click={() => lastPage()}>
          <IconChevronsRight />
        </Button>
      </div>
    {/if}
  {/if}

  <div class="flex items-center justify-between gap-3 text-sm font-normal">
    <Link props={{ href: "/", withIcon: true, variant: "blue", size: "large" }}>
      <IconArrowBack /> Back to home
    </Link>
  </div>
</Container>
