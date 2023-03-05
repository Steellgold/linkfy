<script lang="ts">
  import { Button } from "$lib/components/forms/button";
  import { Input } from "$lib/components/forms/input";
  import { IconCopy, IconExternalLink, IconMotorbike, IconQrcode, IconUnlink } from "@tabler/icons-svelte";
</script>

<div class="flex flex-col items-center mx-auto px-3 py-4 lg:py-0">
  <div class="w-full rounded-lg border-2 p-4 shadow md:mt-0 sm:max-w-md border-gray-700 bg-gray-800 sm:p-5">
    <div class="mb-2 p-0">
      <h1 class="mb-1 text-xl font-bold text-white md:text-2xl">Shorten your links</h1>
      <p class="text-sm font-normal text-white">
        When you click on the "Use" button, the link will be shortened and you will be redirected to
        the link.
      </p>
    </div>

    <div class="mb-2 p-0">
      <div class="mt-1 relative rounded-md shadow-sm">
        <div class="mb-3">
          <Input props={{ type: "text", placeholder: "https://example.com", size: "large" }} />
        </div>
      </div>
    </div>

    <div class="flex items-center gap-2">
      <Button props={{ type: "button", variant: "blue", size: "lg", disabled: false, full: true }}>
        <IconUnlink size={20} />
        Shorten
      </Button>

      <div class="flex gap-2">
        <Button props={{ type: "button", variant: "blue", size: "lg", disabled: true, full: false }}>
          <IconCopy size={20} />
        </Button>
  
        <Button props={{ type: "button", variant: "blue", size: "lg", disabled: true, full: false }}>
          <IconExternalLink size={24} />
        </Button>
  
        <!-- <Button props={{ type: "button", variant: "blue", size: "lg", disabled: true, full: false }}>
          <IconQrcode size={24} />
        </Button> -->
      </div>
    </div>
  </div>

  <div class="mt-2">
    <a href="/history" class="flex text-blue-600 hover:text-blue-500 gap-2 justify-center p-4 items-center group">
      <!-- Put it at -45° and translate it to the right by 50% --> 
      <IconMotorbike size={20} class="group-hover:-rotate-45 group-hover:translate-x-40 transition-transform duration-1000 ease-in-out" />
      Ride to the history
    </a>
  </div>
</div>