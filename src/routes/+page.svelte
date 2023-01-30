<script lang="ts">
  import { Container } from "$lib/components/layout/container";
  import { Input } from "$lib/components/forms/input";
  import { Button, Link } from "$lib/components/button";
  import { IconCopy, IconHistory, IconUnlink } from "$lib/icons";
  import type { PageData } from './$types';
  import Cookies from "js-cookie";
  import { pushToast } from "$lib/components/layout/toast";

  export let data: PageData;

  export let baseUrl: string = "";
  export let finalUrl: string = "";

  let generateDisabled: boolean = true;

  async function transformUrl() {
    if ((document.querySelector("button") as HTMLButtonElement).disabled) return;

    let generatedUrl = Math.random().toString(36).substring(2, 6);
    
    let res = await fetch("/api/link/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: baseUrl, slug: generatedUrl, visitorId: Cookies.get("fpVisitorId") })
    });

    if (res.ok) {
      finalUrl = `${window.location.origin}/${generatedUrl}`;
      pushToast("Your link has been shortened");
    } else {
      pushToast("Whoops, something went wrong, try again later");
    }
  }

  function checkUrl() {
    baseUrl.startsWith("http://") || baseUrl.startsWith("https://") ? generateDisabled = false : generateDisabled = true;
    if (baseUrl === "") generateDisabled = true;
  }

  function copyToClipboard() {
    if (finalUrl === "") {
      pushToast("Please generate a link first");
    } else {
      pushToast("Link copied to clipboard");
      navigator.clipboard.writeText(finalUrl);
    }
  }
</script>

<Container maxSize="md">
  <div class="mb-2 p-0">
    <h1 class="mb-1 text-xl font-bold md:text-2xl text-white">Shorten your links</h1>
    <p class="text-sm font-normal text-white">When you click on the "Use" button, the link will be shortened and you will be redirected to the link.</p>
  </div>

  <form>
    <div class="mb-3">
      <Input bind:value={baseUrl} props={{ placeholder: "Link to shorten", size: "small", width: "full", autofocus: true }} on:input={checkUrl} />
    </div>

    <div class="mb-3">
      <Input bind:value={finalUrl} props={{ placeholder: "Shortened link", size: "small", width: "full", disabled: true }} />
    </div>

    <div class="flex items-center justify-between text-sm font-normal gap-2">
      <Button props={{ type: "button", size: "large", variant: "blue", withIcon: true, disabled: generateDisabled }} on:click={transformUrl}>
        <IconUnlink /> Transform
      </Button>
      <Button props={{ type: "button", size: "medium", variant: "blue" }} on:click={copyToClipboard}>
        <IconCopy />
      </Button>
      <Link props={{ href: "/app/history", size: "medium", variant: "blue" }}>
        <IconHistory />
      </Link>
    </div>
  </form>    
</Container>