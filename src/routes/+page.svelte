<script lang="ts">
  import { page } from "$app/stores";
  import { Container } from "$lib/components/layout/container";
  import { Input } from "$lib/components/forms/input";
  import { Button, Link } from "$lib/components/button";
  import { IconCopy, IconHistory, IconUnlink } from "$lib/icons";
  import { pushToast } from "$lib/components/layout/toast";
  import { PUBLIC_URL } from "$env/static/public";
  import { urlsGenerated } from "$lib/stores/Stores";
  import Cookies from "js-cookie";

  let link = {
    baseUrl: "",
    finalUrl: "",
    slug: "",

    inGeneration: false,
    isGenerated: false,
    canGenerate: false
  }

  async function transformUrl() {
    if (urlsGenerated.includes(link.baseUrl)) {
      pushToast("Please, enter an different url", "danger");
      return;
    } else {
      urlsGenerated.push(link.baseUrl);
    }

    if ((document.querySelector("button") as HTMLButtonElement).disabled) return;

    link.slug = Math.random().toString(36).substring(2, 6);
    link.inGeneration = true;

    let json = JSON.stringify({});

    if (!$page.data.session?.user) {
      json = JSON.stringify({ url: link.baseUrl, slug: link.slug, visitorId: Cookies.get("fpVisitorId") });
    } else {
      json = JSON.stringify({ url: link.baseUrl, slug: link.slug, visitorId: Cookies.get("fpVisitorId"), userId: $page.data.session?.user.id });
    }

    let res = await fetch(PUBLIC_URL + "api/link/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: json
    });

    if (res.status === 429) {
      pushToast("You have reached the rate limit, please try again later", "danger");
      link.inGeneration = false;
      link.isGenerated = false;
      return;
    }

    if (res.ok) {
      link.finalUrl = `${window.location.origin}/${link.slug}`;
      pushToast("Your link has been shortened", "success");
      link.inGeneration = false;
      link.isGenerated = true;
    } else {
      pushToast("Whoops, something went wrong, try again later", "danger");
    }
  }

  function checkUrl() {
    if (link.baseUrl === "") link.canGenerate = false;
    if (link.baseUrl.startsWith("http://") || link.baseUrl.startsWith("https://")) link.canGenerate = true;
  }

  function copyToClipboard() {
    if (link.finalUrl === "") {
      pushToast("Please generate a link first", "warning");
    } else {
      pushToast("Link copied to clipboard", "success");
      navigator.clipboard.writeText(link.finalUrl);
    }
  }
</script>

<Container maxSize="md">
  <div class="mb-2 p-0">
    <h1 class="mb-1 text-xl font-bold text-white md:text-2xl">Shorten your links</h1>
    <p class="text-sm font-normal text-white">
      When you click on the "Use" button, the link will be shortened and you will be redirected to
      the link.
    </p>
  </div>

  <form>
    <div class="mb-3">
      <Input bind:value={link.baseUrl} props={{ placeholder: "Link to shorten", size: "small", width: "full" }} on:input={checkUrl} />
    </div>

    {#if link.inGeneration}
      <div class="mb-3 h-4 w-full animate-pulse rounded bg-gray-600 p-5" />
    {:else}
      <div class="mb-3">
        <Input bind:value={link.finalUrl} props={{ placeholder: "Shortened link", size: "small", width: "full", disabled: true }} />
      </div>
    {/if}

    <div class="flex items-center justify-between gap-2 text-sm font-normal">
      <Button props={{ type: "button", size: "large", variant: "blue", withIcon: true, disabled: !link.canGenerate }} on:click={transformUrl}>
        <IconUnlink /> Transform
      </Button>
      <Button props={{ type: "button", size: "medium", variant: "blue", disabled: link.finalUrl === "" }} on:click={copyToClipboard}>
        <IconCopy />
      </Button>
      <Link props={{ href: "/app/history", size: "medium", variant: "blue" }}>
        <IconHistory />
      </Link>
    </div>
  </form>
</Container>
