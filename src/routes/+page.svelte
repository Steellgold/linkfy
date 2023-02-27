<script lang="ts">
  import { Button } from "$lib/components/forms/button";
  import { Input } from "$lib/components/forms/input";
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
          <Input props={{
            type: "text",
            placeholder: "https://example.com",
            value: "",
            size: "large"
          }} />
        </div>
      </div>
    </div>

    <div class="flex items-center gap-2">
      <Button props={{ type: "button", variant: "blue", size: "lg", disabled: false, full: true }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5"></path>
          <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5"></path>
          <path d="M16 21l0 -2"></path>
          <path d="M19 16l2 0"></path>
          <path d="M3 8l2 0"></path>
          <path d="M8 3l0 2"></path>
       </svg>
        Shorten
      </Button>

      <div class="flex gap-2">
        <Button props={{ type: "button", variant: "blue", size: "lg", disabled: true, full: false }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"></path>
            <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"></path>
          </svg>
        </Button>
  
        <Button props={{ type: "button", variant: "blue", size: "lg", disabled: true, full: false }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5"></path>
            <path d="M10 14l10 -10"></path>
            <path d="M15 4l5 0l0 5"></path>
          </svg>
        </Button>
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