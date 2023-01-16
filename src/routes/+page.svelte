<script lang="ts">
  import { Button, RedirectButton } from "$lib/components/button";
  import { Input } from "$lib/components/input";
  import { generateShortUrl } from "$lib/utils/Shortener";
  import { connected, url as StoreURL } from "$lib/utils/Stores";
  import { PUBLIC_URL } from "$env/static/public";
  import { pushToast } from "$lib/components/layouts/toast";
    import { copy } from "$lib/utils/Utils";

  // Temporary:
  if (!connected) pushToast("Currently your link will not be able to receive statistics because you are not logged in.", "danger");

  let url: string = "";
  let finalUrl: string = "";

  StoreURL.subscribe(value => { url = value; });

  async function transform() {
    const input = document.getElementById("shortened") as HTMLInputElement;
    
    if (url !== "" && !url.startsWith("https://") && !url.startsWith("http://")) {
      pushToast("The url must start with https:// or http:// and not be empty", "danger");
      return;
    }

    let shortenedUrl = generateShortUrl();
    finalUrl = PUBLIC_URL + shortenedUrl;
    let res = await fetch("/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        url: url,
        shorted: shortenedUrl,
       }),
    });

    if (res.status !== 200) {
      pushToast("An error has occurred while generating the link", "danger");
      return;
    }
    
    pushToast("The link has been generated", "success");
    input.value = finalUrl;
  }
</script>

<div class="flex flex-col items-center justify-center py-8 mx-auto md:h-screen lg:py-0">
  <div class="flex items-center justify-center">
    <!-- For idk -->
  </div>

  <div class="w-full p-6 rounded-lg shadow border md:mt-0 sm:max-w-md bg-gray-800 border-gray-700 sm:p-8">
    <h1 class="mb-1 text-xl font-bold md:text-2xl text-white">Shorten your links</h1>
    <p class="text-sm font-thin text-white">When you click on the "Use" button, the link will be shortened and you will be redirected to the link.</p>
    <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5">

      <div><Input size="large" type="text" disabled={false} placeholder="https://google.com/" bind:value={url} /></div>
      <div class="flex items-center justify-between text-sm font-normal gap-3">
        <Input size="large" type="text" disabled={true} placeholder="The shortcut link will appear here" id="shortened" bind:value={url}/>
        
        <Button on:click={copy(finalUrl)}>
          <i class="fa-solid fa-clipboard"></i>
        </Button>
        
        <RedirectButton disabled={true}>
          <i class="fa-solid fa-list"></i>
        </RedirectButton>
      </div>

      <div class="flex items-center justify-between text-sm font-normal gap-3">
        <Button on:click={transform} size="large">Transform..</Button>
        <RedirectButton path={finalUrl} newTab={true} hidden={finalUrl == "" ? true : false}>Redirect</RedirectButton>
      </div>
    </form>
  </div>
</div>