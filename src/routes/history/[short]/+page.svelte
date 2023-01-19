<script lang="ts">
  import { RedirectButton } from "$lib/components/button";
  import { Container } from "$lib/components/layouts/container";
  import type { PageData } from "./$types";

  export let data: PageData;
  let date: string = new Date(data.link.createdAt).toLocaleString();
</script>

<Container>
  <h1 class="mb-1 text-xl font-bold md:text-2xl text-white">Shortened URL: <kbd>{data.link.shortUrl}</kbd></h1>
  <p class="mb-4 text-sm text-gray-400">Created at { date }</p>
  <div class="mt-4 space-y-4 lg:mt-5 md:space-y-5">
    <div class="flex items-center justify-between text-sm font-normal gap-3">
      <RedirectButton path="/history" size="large">
        <i class="fa-solid fa-arrow-left"></i>&nbsp;&nbsp;Back to history
      </RedirectButton>
    </div>
  </div>
</Container>