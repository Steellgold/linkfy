<script lang="ts">
  import { Button, RedirectButton } from "$lib/components/button";
  import { Input } from "$lib/components/input";
  import { generateShortUrl } from "$lib/utils/Shortener";
  import { url as StoreURL } from "$lib/utils/Stores";

  let error: string = "";
  let success: string = "";
  let url: string = "";

  StoreURL.subscribe(value => { url = value; });

    if (!url.startsWith("https://") && !url.startsWith("http://")) {
      error = "The url must start with https:// or http://";
      return;
    }

    error = "";
    const input = document.getElementById("shortened") as HTMLInputElement;
    shortenedUrl = generateShortUrl();
    input.value = shortenedUrl;
  }

  function copy() {
    navigator.clipboard.writeText(shortenedUrl);
    success = "The link has been copied to your clipboard";
  }
</script>

<div class="flex items-center justify-center py-8 mx-auto md:h-screen lg:py-0">
  <div class="w-full p-6 rounded-lg shadow border md:mt-0 sm:max-w-md bg-gray-800 border-gray-700 sm:p-8">
    <h1 class="mb-1 text-xl font-bold md:text-2xl text-white">Shorten your links</h1>
    <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5">
      {#if error !== ""}
        <div class="text-red-500 text-sm font-normal">{error}</div>
      {/if}
      {#if success !== ""}
        <div class="text-green-500 text-sm font-normal">{success}</div>
      {/if}
      <div>
        <Input size="large" type="text" disabled={false} placeholder="https://google.com/" bind:value={url} />
      </div>
      <div class="flex items-center justify-between text-sm font-normal gap-3">
        <Input size="large" type="text" disabled={true} placeholder="The shortcut link will appear here" id="shortened" bind:value={url}/>
        <Button on:click={copy}>
          <i class="fa-solid fa-copy"></i>
        </Button>
        <RedirectButton path="/history">
          <i class="fa-solid fa-clipboard-list"></i>
        </RedirectButton>
      </div>
      <div class="flex items-center justify-between text-sm font-normal gap-3">
        <Button on:click={transform} size="large">
          Transform..
        </Button>
      </div>
    </form>
  </div>
</div>