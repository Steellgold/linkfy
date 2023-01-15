<script lang="ts">
  import { Button, RedirectButton } from "$lib/components/button";
  import { Input } from "$lib/components/input";
  import { generateShortUrl } from "$lib/utils/Shortener";
  import { url as StoreURL } from "$lib/utils/Stores";

  let error: string = "";
  let success: string = "";
  let url: string = "";
  let shortUrl: string = "";

  StoreURL.subscribe(value => { url = value; });

  async function transform() {
    const input = document.getElementById("shortened") as HTMLInputElement;
    
    if (url !== "" && !url.startsWith("https://") && !url.startsWith("http://")) {
      error = "The url must start with https:// or http:// and not be empty";
      return;
    }

    error = "";
    let shortenedUrl = generateShortUrl();
    let res = await fetch("/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        url: url,
        shortUrl: shortenedUrl,
       }),
    });

    input.value = "https://links.steellgold.fr/" + shortenedUrl;
    shortUrl = shortenedUrl;
  }

  function copy() {
    if (url === ""){
      error = "You must first generate a link";
      return;
    }
    
    navigator.clipboard.writeText("https://links.steellgold.fr/" + shortUrl);
    success = "The link has been copied to your clipboard";
  }

  function redirectTo() {
    if (url === ""){
      error = "You must first generate a link";
      return;
    }

    window.location.href = shortUrl;
  }
</script>

<div class="flex items-center justify-center py-8 mx-auto md:h-screen lg:py-0">
  <div class="w-full p-6 rounded-lg shadow border md:mt-0 sm:max-w-md bg-gray-800 border-gray-700 sm:p-8">
    <h1 class="mb-1 text-xl font-bold md:text-2xl text-white">Shorten your links</h1>
    <p class="text-sm font-thin text-white">When you click on the "Use" button, the link will be shortened and you will be redirected to the link.</p>
    <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5">

      {#if error !== ""}<div class="text-red-500 text-sm font-normal">{error}</div>{/if}
      {#if success !== ""}<div class="text-green-500 text-sm font-normal">{success}</div>{/if}
      
      <div><Input size="large" type="text" disabled={false} placeholder="https://google.com/" bind:value={url} /></div>
      <div class="flex items-center justify-between text-sm font-normal gap-3">
        <Input
          size="large"
          type="text"
          disabled={true}
          placeholder="The shortcut link will appear here"
          id="shortened"
          bind:value={url}
        />
        
        <Button
          on:click={copy}>
          <i class="fa-solid fa-clipboard"></i>
        </Button>
        
        <RedirectButton
          disabled={true}>
          <i class="fa-solid fa-list"></i>
        </RedirectButton>
      </div>
      <div class="flex items-center justify-between text-sm font-normal gap-3">
        <Button on:click={transform} size="large">Transform..</Button>
        <Button on:click={redirectTo} hidden={shortUrl == "" ? true : false}>Redirect</Button>
      </div>
    </form>
  </div>
</div>