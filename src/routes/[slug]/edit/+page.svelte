<script lang="ts">
  import { Input } from "$lib/components/forms/input";
</script>

<div class="flex flex-col items-center mx-auto px-3 py-4 lg:py-0">
  <div class="w-full rounded-lg border-2 p-4 shadow md:mt-0 sm:max-w-md border-gray-700 bg-gray-800 sm:p-5">
    <div class="mb-2 p-0">
      <h1 class="mb-1 text-xl font-bold text-white md:text-2xl">Link editing</h1>
      <p class="text-sm font-normal text-white">
        You can edit your link here, or delete it.
      </p>
    </div>

    <div class="p-0">
      <div class="relative rounded-md shadow-sm">
        <div class="mb-3">
          <Input props={{
            type: "text",
            placeholder: "https://example.com",
            value: "",
            size: "large"
          }} />
        </div>
      </div>
    </div>
  </div>

  <div class="mt-2">
    <a href="/history" class="flex text-blue-600 hover:text-blue-500 gap-2 justify-center p-4 items-center group">
      <!-- Put it at -45° and translate it to the right by 50% --> 
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="group-hover:-rotate-45 group-hover:translate-x-40 transition-transform duration-1000 ease-in-out">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M5 16m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
        <path d="M19 16m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
        <path d="M7.5 14h5l4 -4h-10.5m1.5 4l4 -4"></path>
        <path d="M13 6h2l1.5 3l2 4"></path>
     </svg>
     Ride to the history
    </a>
  </div>
</div>