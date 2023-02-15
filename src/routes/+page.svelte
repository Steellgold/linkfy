<script lang="ts">
  import { page } from "$app/stores";
  import { Container } from "$lib/components/layout/container";
  import { Input } from "$lib/components/forms/input";
  import { Button, Link as LinkButton } from "$lib/components/button";
  import { IconCopy, IconHistory, IconUnlink } from "$lib/icons";
  import { createLink, isAlreadyGenerated, validateUrl } from "$lib/utils/link";
  import { PUBLIC_URL } from "$env/static/public";
  import type { Link, LinkGeneration } from "$lib/types/link.type";
  import Cookies from "js-cookie";
  import { pushToast } from "$lib/components/layout/toast";

  let links: Link[] = [];
  let link: Link = { url: "", slug: "", visitorId: "", clicks: 0 };
  let linkGeneration: LinkGeneration = { inGeneration: false, isGenerated: false, finalUrl: "" }

  async function transform() {
    if (!validateUrl(link.url) || isAlreadyGenerated(link.url, links)) {
      pushToast("The link is not valid or has already been shortened.", "danger");
      return;
    }

    linkGeneration.inGeneration = true;

    let visitorId = Cookies.get("fpVisitorId");
    if (visitorId == undefined) {
      let generated = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      Cookies.set("fpVisitorId", generated, { expires: 365 });
      visitorId = generated;
    }

    const response = await createLink(link.url, visitorId, $page.data.session?.user.id ?? null);
    
    if (response) {
      links.push(response);

      linkGeneration = {
        inGeneration: false,
        isGenerated: true,
        finalUrl: PUBLIC_URL + response.slug,
      };
      
      pushToast("Link shortened successfully.", "success");
    } else {
      pushToast("An error occurred while generating the link.", "danger");
      return;
    }
  }

  $: if (link.url !== "") {
    linkGeneration.isGenerated = false;
  }
</script>

<Container maxSize="md">
  <div class="mb-3 p-0">
    <h1 class="mb-1 text-xl font-bold text-white md:text-2xl">Shorten your links</h1>
    <p class="text-sm font-normal text-white">
      Paste a link to shorten it, and share it with your friends. <br>
      You can also check your history, and see how many times your links have been visited.
    </p>
  </div>

  <form>
    <div class="mb-3">
      <Input bind:value={link.url} props={{ placeholder: "Link to shorten", size: "small", width: "full" }} />
    </div>

    {#if linkGeneration.inGeneration}
      <div class="mb-3 h-4 w-full animate-pulse rounded bg-gray-600 p-5" />
    {:else}
      <div class="mb-3">
        <Input bind:value={linkGeneration.finalUrl} props={{ placeholder: "Shortened link", size: "small", width: "full", disabled: true }} />
      </div>
    {/if}

    <div class="flex items-center justify-between gap-2 text-sm font-normal">
      <Button props={{ type: "button", size: "large", variant: "blue", withIcon: true, disabled: linkGeneration.inGeneration || link.url === "" }} on:click={transform}>
        <IconUnlink /> Transform
      </Button>
      <Button props={{ type: "button", size: "medium", variant: "blue", disabled: !linkGeneration.isGenerated }}>
        <IconCopy />
      </Button>
      <LinkButton props={{ href: "/history", size: "medium", variant: "blue" }}>
        <IconHistory />
      </LinkButton>
    </div>
  </form>
</Container>