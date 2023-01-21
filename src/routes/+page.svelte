<script lang="ts">
  import { Button, CopyButton, RedirectButton } from "$lib/components/button";
  import { Input } from "$lib/components/input";
  import { generateShortUrl } from "$lib/utils/Shortener";
  import { PUBLIC_URL } from "$env/static/public";
  import { pushToast } from "$lib/components/layouts/toast";
  import { Container } from "$lib/components/layouts/container";
  import Cookies from "js-cookie";

  let url: string = "";
  let finalUrl: string = "";
  let loading: boolean = false;

  async function transform() {
    const input = document.getElementById("shortened") as HTMLInputElement;
    loading = true;
    
    if (url !== "" && !url.startsWith("https://") && !url.startsWith("http://")) return pushToast("The url must start with https:// or http:// and not be empty", "danger");

    let shortenedUrl = generateShortUrl(4, 4);
    finalUrl = PUBLIC_URL + shortenedUrl;

    let res = await fetch("/api/urls", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        baseUrl: url,
        shortUrl: shortenedUrl,
        clicksCount: 0,
        fromClicks: [],
        visitorId: Cookies.get("visitorId"),
       }),
    });

    if (res.status !== 200) return pushToast("An error has occurred while generating the link", "danger");
    
    pushToast("The link has been generated", "success");
    loading = false;
    input.value = finalUrl;
  }
</script>

<Container maxSize="md">
  <h1 class="mb-1 text-xl font-bold md:text-2xl text-white">Shorten your links</h1>
  <p class="text-sm font-normal text-white">When you click on the "Use" button, the link will be shortened and you will be redirected to the link.</p>

  <div class="mt-4 space-y-4 lg:mt-5 md:space-y-5">
    <div><Input size="large" type="text" disabled={false} placeholder="https://google.com/" bind:value={url} /></div>
    <div class="flex items-center justify-between text-sm font-normal gap-3">
      {#if loading}
        <div class="animate-pulse h-4 p-5 bg-gray-600 rounded w-full"></div>
      {/if}
      <Input size="large" type="text" disabled={true} hidden={loading} placeholder="The shortcut link will appear here" id="shortened" bind:value={url} />
    </div>

    <div class="flex items-center justify-between text-sm font-normal gap-3">
      <Button on:click={transform} ButtonProps={{
        size: "large",
        hidden: false,
        variant: "blue",
        disabled: url.length == 0 ? true : false,
      }}>Transform..</Button>
      
      <RedirectButton disabled={finalUrl == "" ? true : false} path={finalUrl} newTab={true}>
        <i class="fa-solid fa-arrow-right"></i>
      </RedirectButton>

      <CopyButton toCopy={finalUrl} disabled={finalUrl == "" ? true : false} />
          
      <RedirectButton disabled={Cookies.get("visitorId") == undefined ? true : false} path="/history">
        <i class="fa-solid fa-list"></i>
      </RedirectButton>
    </div>
  </div>
</Container>