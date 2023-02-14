<script lang="ts">
  import { page } from "$app/stores";
  import { Container } from "$lib/components/layout/container";
  import { Input } from "$lib/components/forms/input";
  import { Button, Link as LinkButton } from "$lib/components/button";
  import { IconCopy, IconHistory, IconUnlink } from "$lib/icons";
  import { createLink, isAlreadyGenerated } from "$lib/utils/link";
  import { PUBLIC_URL } from "$env/static/public";
  import type { Link, LinkGeneration } from "$lib/types/link.type";
  import Cookies from "js-cookie";
    import { pushToast } from "$lib/components/layout/toast";

  let links: Link[] = [];
  let link: Link = {
    url: "",
    slug: "",
    visitorId: ""
  }

  let linkGeneration: LinkGeneration = {
    inGeneration: false,
    isGenerated: false,
    finalUrl: ""
  }

  async function transform() {
    if (isAlreadyGenerated(link.url, links)) {
      pushToast("Please, enter a new link to shorten.", "danger");
      return;
    }

    linkGeneration.inGeneration = true;

    let visitorId = Cookies.get("fpVisitorId");
    if (visitorId == undefined) {
      let generated = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      Cookies.set("fpVisitorId", generated);
      visitorId = generated;
    }

    const response = await createLink(link.url, visitorId, $page.data.session?.user.id ?? null);

    if (response !== false) {
      links.push(link);

      linkGeneration = {
        inGeneration: false,
        isGenerated: true,
        finalUrl: PUBLIC_URL + response.slug,
      };

      pushToast("Link shortened successfully.", "success");
    }
  }

  $: if (link.url !== "") {
    linkGeneration.isGenerated = false;
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
      <Button props={{ type: "button", size: "large", variant: "blue", withIcon: true }} on:click={transform}>
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