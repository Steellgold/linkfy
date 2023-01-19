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

    <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
      <div class="flex items-center justify-between text-sm font-normal gap-3">
        <RedirectButton path="/" size="large">
          <i class="fa-solid fa-arrow-left"></i>&nbsp;&nbsp;Back to shortener
        </RedirectButton>
      </div>
    </form>
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