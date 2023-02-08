<script lang="ts">
  import { Container } from "$lib/components/layout/container";
  import { Input } from "$lib/components/forms/input";
  import { Button, Link } from "$lib/components/button";
  import { IconArrowBack, IconCheck, IconTrash } from "$lib/icons";
  import type { PageData } from './$types';
  import { PUBLIC_URL } from "$env/static/public";
  import { pushToast } from "$lib/components/layout/toast";
  import { goto } from "$app/navigation";
  export let data: PageData;

  let url: string = data.slugData.url;
  // let slug: string = data.slugData.slug;

  async function save() {
    if (url === data.slugData.url) return;

    const res = await fetch(PUBLIC_URL + "api/link/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug: data.slugData.slug,
        data: {
          url: url
        },
      }),
    });

    if (res.ok) {
      pushToast("Link updated successfully", "success");
    } else {
      pushToast("Something went wrong", "danger");
    }
  }

  let deleted = false;
  async function deleteLink() {
    deleted = true;
    const res = await fetch(PUBLIC_URL + "api/link/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug: data.slugData.slug,
      }),
    });

    if (res.ok) {
      pushToast("Link deleted successfully", "success");
      goto("/");
    } else {
      pushToast("Something went wrong", "danger");
    }
  }
</script>

<Container maxSize="md">
  <div class="mb-5 p-0">
    <h1 class="text-2xl font-bold text-white">Edit Link</h1>
    <p class="text-sm font-normal text-gray-500">Here, you can edit some of the settings for your link.</p>
  </div>

  <form class="flex flex-col gap-4">
    <Input bind:value={url} props={{ placeholder: "https://example.com", size: "small", width: "full" }} />

    <div class="relative w-[250px] sm:w-[405px]" >
      <span class="text-xs font-medium text-center p-0.5 leading-none rounded-full px-2 bg-pro-900 text-pro-200 absolute -translate-y-1/2 translate-x-1/2 left-auto top-0 right-0">Pro</span>
      
      <Input value={data.slugData.slug} props={{
        placeholder: "https://example.com",
        size: "small",
        width: "full",
        tip: PUBLIC_URL,
        disabled: true
      }} />
    </div>

    <div class="flex items-center justify-between gap-2 text-sm font-normal">
      {#if !deleted}
        <Button props={{ type: "button", size: "large", variant: "blue", withIcon: true, }} on:click={save}>
          <IconCheck /> Save
        </Button>

        <Link props={{ href: "/history", size: "medium", variant: "blue", withIcon: true }}>
          <IconArrowBack />
        </Link>

        <Button props={{ type: "button", size: "medium", variant: "red", disabled: deleted }} on:click={deleteLink}>
          <IconTrash />
        </Button>
      {:else}
        <div class="mb-3 h-4 w-full animate-pulse rounded bg-gray-600 p-5" />
        <div class="mb-3 h-4 w-10 animate-pulse rounded bg-gray-600 p-5" />
        <div class="mb-3 h-4 w-10 animate-pulse rounded bg-gray-600 p-5" />
      {/if}

      <!-- TODO: Add a toggle, for "Active/Inactive" -->
      <!-- TODO: Button for access statistics, "PRO" -->
      <!-- TODO: Add a field "Password protection" pro? if not limit number of links can have? -->
    </div>
  </form>
</Container>