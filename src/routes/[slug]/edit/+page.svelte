<script lang="ts">
  import { Container } from "$lib/components/layout/container";
  import { Input, Toggle } from "$lib/components/forms";
  import { Button, Link as LinkButton } from "$lib/components/button";
  import { IconArrowBack, IconCheck, IconRocket, IconTrash } from "$lib/icons";
  import type { PageData } from './$types';
  import { PUBLIC_URL } from "$env/static/public";
  import { pushToast } from "$lib/components/layout/toast";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { restRequest } from "$lib/utils/request/request";
  import type { Link } from "$lib/types/link.type";

  export let data: PageData;

  let link: Link = {
    url: data.link.url,
    slug: data.link.slug,
    visitorId: data.link.visitorId,
    status: data.link.status,
    clicks: data.link.clicks
  };

  let changes = { url: false, status: false };
  $: somethingChanged = changes.url == false && changes.status == false;

  $: changes.url = link.url !== data.link.url;
  $: changes.status = link.status !== data.link.status;

  let deleted = false;

  async function save() {
    const response = await restRequest<Link>("put", PUBLIC_URL + "api/link/update", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: data.link.slug,
        data: {
          url: link.url,
          status: link.status
         }
      })
    });

    if (!response.success) {
      pushToast("Something went wrong", "danger");
      return;
    }

    pushToast("Link updated successfully", "success");
    link = response.data;
  }

  async function deleteLink() {
    deleted = true;
    const res = await restRequest("delete", PUBLIC_URL + "api/link/delete", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: data.link.slug })
    });

    if (res.success) {
      pushToast("Link deleted successfully", "success");
      goto("/history");
    } else {
      pushToast("Something went wrong", "danger");
    }
  }
</script>

<Container maxSize="md">
  <div class="mb-3 p-0">
    <div class="flex flex-row items-center">
      <h1 class="text-2xl font-bold text-white">Edit link</h1>

      {#if !$page.data.user?.isPremium}
        <div class="flex flex-row ml-auto text-pro-200">
          <button data-tooltip-target="tooltip-pro" type="button" class="flex focus:outline-none rounded-lg text-sm px-3 py-1 text-center bg-pro-200 text-gray-900">
            <IconRocket />&nbsp;
            <span class="text-sm font-medium ml-1">Pro</span>
          </button>

          <div id="tooltip-pro" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
              There are still 5 settings to unlock.
              <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>
      {/if}
    </div>
    <p class="text-sm font-normal text-gray-500">Here, you can edit some of the settings for your link.</p>
  </div>

  <form class="flex flex-col gap-1">
    <Input bind:value={link.url} props={{ placeholder: "https://example.com", size: "small", width: "full" }} />

    {#if $page.data.user?.isPremium}
      <div class="relative">
        <Input value={data.link.slug} props={{ placeholder: "https://example.com", size: "small", width: "full", tip: PUBLIC_URL, disabled: !$page.data.user?.isPremium }} />
      </div>
    {/if}

    <!-- <div class="flex relative items-center">
      <Toggle props={{ label: "Password protection", disabled: false }} />
      <span class="text-xs font-medium text-center p-0.5 leading-none rounded-full px-2 bg-pro-900 text-pro-200 absolute left-[195px]">Pro</span>
    </div> -->

    <div class="mt-3">
      <Toggle props={{ label: link.status ? "Click here to disable it" : "Click here to activate it", disabled: false, checked: link.status }} bind:checked={link.status} />
    </div>

    <div class="flex items-center justify-between gap-2 text-sm font-normal mt-3">
      {#if !deleted}
        <Button props={{ type: "button", size: "large", variant: "blue", withIcon: true, disabled: somethingChanged }} on:click={save}>
          {#if !somethingChanged}
            <IconCheck /> Save changes
          {:else}
            Nothing changed
          {/if}
        </Button>

        <LinkButton props={{ href: "/history", size: "medium", variant: "blue", withIcon: true }}>
          <IconArrowBack />
        </LinkButton>

        <Button props={{ type: "button", size: "medium", variant: "red", disabled: deleted }} on:click={deleteLink}>
          <IconTrash />
        </Button>
      {:else}
        <div class="mb-3 h-4 w-full animate-pulse rounded bg-gray-600 p-5" />
        <div class="mb-3 h-4 w-10 animate-pulse rounded bg-gray-600 p-5" />
        <div class="mb-3 h-4 w-10 animate-pulse rounded bg-gray-600 p-5" />
      {/if}
    </div>
  </form>
</Container>