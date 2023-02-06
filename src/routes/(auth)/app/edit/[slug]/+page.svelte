<script lang="ts">
  import { Container } from "$lib/components/layout/container";
  import { Input } from "$lib/components/forms/input";
  import { Button } from "$lib/components/button";
  import { IconCheck, IconTrash } from "$lib/icons";
  import type { PageData } from './$types';
    import { pushToast } from "$lib/components/layout/toast";

  export let data: PageData;

  let url: string = data.slugData.url;

  async function save() {
    if (url === data.slugData.url) return;

    // Check if the URL is valid
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return pushToast("The URL must start with http:// or https://", "danger");
    }

    // Check if the URL is valid
    if (url.length > 2048 || url.length < 10) {
      return pushToast("The URL must be less than 2048 characters and more than 10 characters", "danger");
    }
  }
</script>

<Container maxSize="md">
  <div class="mb-5 p-0">
    <h1 class="mb-1 text-xl font-bold text-white md:text-2xl">Edition</h1>
    <p class="text-sm font-normal text-white">
      This link currently redirects to <a href={data.slugData.url} class="text-blue-500 hover:underline">{data.slugData.url}</a>
    </p>
  </div>

  <form class="flex flex-col gap-4">
    <div>
      <Input
        bind:value={url}
        props={{ placeholder: "https://example.com", size: "small", width: "full" }}
      />
    </div>

    <div class="flex items-center justify-between gap-2 text-sm font-normal">
      <Button
        props={{
          type: "button",
          size: "large",
          variant: "blue",
          withIcon: true,
        }}
        on:click={save}
      >
        <IconCheck /> Save
      </Button>

      <Button props={{ type: "button", size: "medium", variant: "red" }} >
        <IconTrash />
      </Button>

      <!-- TODO: Button for access statistics, "PRO" -->
    </div>
  </form>
</Container>