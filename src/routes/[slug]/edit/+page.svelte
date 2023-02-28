<script lang="ts">
  import { Button } from "$lib/components/forms/button";
  import { Input, InputIndicator } from "$lib/components/forms/input";

  let slug = "x1aAz";
  let url = "https://example.com";
</script>

<div class="flex flex-col items-center mx-auto px-3 py-4 lg:py-0">
  <div class="w-full rounded-lg border-2 p-4 shadow md:mt-0 sm:max-w-md border-gray-700 bg-gray-800 sm:p-5">
    <div class="mb-2 p-0">
      <h1 class="mb-1 text-xl font-bold text-white md:text-2xl">Link editing</h1>
      <p class="text-sm font-normal text-white">
        You can edit your link here, or delete it.
      </p>
    </div>

    <div class="p-0">
      <div class="relative rounded-md shadow-sm">
        <div class="mb-3">
          <Input bind:value={url} props={{
            type: "text",
            placeholder: "https://example.com",
            size: "large"
          }} />
        </div>

        <!-- Pro only (next days) -->
        <div class="mb-3">
          <InputIndicator bind:value={slug} props={{
            type: "text",
            placeholder: slug,
            size: "large",
            disabled: true,
            indicator: "https://linkfy.fr/"
          }} />
        </div>

        <div class="flex flex-col gap-2">
          <Button props={{ type: "button", variant: "blue", size: "lg", disabled: false, full: true }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M5 12l5 5l10 -10"></path>
            </svg>
            Save changes
          </Button>
        </div>
      </div>
    </div>
  </div>

  <div class="mt-2">
    <a href="/history" class="flex text-blue-600 hover:text-blue-500 gap-2 justify-center p-4 items-center group">
      Ride to the history
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="group-hover:rotate-45 group-hover:-translate-x-[10rem] transition-transform duration-1000 ease-in-out translate-x-0 -scale-x-100">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M5 16m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
        <path d="M19 16m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
        <path d="M7.5 14h5l4 -4h-10.5m1.5 4l4 -4"></path>
        <path d="M13 6h2l1.5 3l2 4"></path>
     </svg>
    </a>
  </div>
</div>