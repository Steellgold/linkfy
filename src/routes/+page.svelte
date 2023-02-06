<script lang="ts">
  import { page } from "$app/stores";
  import { Container } from "$lib/components/layout/container";
  import { Input } from "$lib/components/forms/input";
  import { Button, Link } from "$lib/components/button";
  import { IconCopy, IconHistory, IconUnlink } from "$lib/icons";
  import { pushToast } from "$lib/components/layout/toast";
  import { PUBLIC_URL } from "$env/static/public";
  import Cookies from "js-cookie";

  export let baseUrl: string = "";
  export let finalUrl: string = "";

  let generateDisabled: boolean = true;
  let generated = true;

  async function transformUrl() {
    if (baseUrl.length > 2048 || baseUrl.length < 10) {
      return pushToast("The URL must be less than 2048 characters and more than 10 characters", "danger");
    }

    if ((document.querySelector("button") as HTMLButtonElement).disabled) return;
    let generatedUrl = Math.random().toString(36).substring(2, 6);
    generated = false;
    generateDisabled = true;

    // If connected, userId is set to the user's id
    let json = JSON.stringify({});

    if (!$page.data.session?.user) {
      json = JSON.stringify({
        url: baseUrl,
        slug: generatedUrl,
        visitorId: Cookies.get("fpVisitorId")
      });
    } else {
      json = JSON.stringify({
        url: baseUrl,
        slug: generatedUrl,
        visitorId: Cookies.get("fpVisitorId"),
        userId: $page.data.session?.user.id
      });
    }

    let res = await fetch(PUBLIC_URL + "api/link/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: json
    });

    // Check if rate limit has been reached
    if (res.status === 429) {
      pushToast("You have reached the rate limit, please try again later", "danger");
      generated = true;
      generateDisabled = false;
      return;
    }

    if (res.ok) {
      finalUrl = `${window.location.origin}/${generatedUrl}`;
      pushToast("Your link has been shortened", "success");
      generated = true;
      generateDisabled = false;
    } else {
      pushToast("Whoops, something went wrong, try again later", "danger");
      generated = true;
    }
  }

  function checkUrl() {
    baseUrl.startsWith("http://") || baseUrl.startsWith("https://")
      ? (generateDisabled = false)
      : (generateDisabled = true);
    if (baseUrl === "") generateDisabled = true;
  }

  function copyToClipboard() {
    if (finalUrl === "") {
      pushToast("Please generate a link first", "warning");
    } else {
      pushToast("Link copied to clipboard", "success");
      navigator.clipboard.writeText(finalUrl);
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
      <Input
        bind:value={baseUrl}
        props={{ placeholder: "Link to shorten", size: "small", width: "full" }}
        on:input={checkUrl}
      />
    </div>

    {#if !generated}
      <div class="mb-3 h-4 w-full animate-pulse rounded bg-gray-600 p-5" />
    {:else}
      <div class="mb-3">
        <Input
          bind:value={finalUrl}
          props={{ placeholder: "Shortened link", size: "small", width: "full", disabled: true }}
        />
      </div>
    {/if}

    <div class="flex items-center justify-between gap-2 text-sm font-normal">
      <Button
        props={{
          type: "button",
          size: "large",
          variant: "blue",
          withIcon: true,
          disabled: generateDisabled
        }}
        on:click={transformUrl}
      >
        <IconUnlink /> Transform
      </Button>
      <Button
        props={{ type: "button", size: "medium", variant: "blue", disabled: finalUrl === "" }}
        on:click={copyToClipboard}
      >
        <IconCopy />
      </Button>
      <Link props={{ href: "/app/history", size: "medium", variant: "blue" }}>
        <IconHistory />
      </Link>
    </div>
  </form>
</Container>
