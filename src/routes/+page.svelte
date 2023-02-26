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
        <Button props={{ type: "button", variant: "blue", size: "lg", disabled: false, full: false }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"></path>
            <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"></path>
          </svg>
        </Button>
  
        <Button props={{ type: "button", variant: "blue", size: "lg", disabled: false, full: false }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
    <a href="/history" class="flex text-blue-600 hover:text-blue-500 gap-2 justify-center p-4 items-center">
      Ride to the history
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M12.089 3.634a2 2 0 0 0 -1.089 1.78l-.001 2.586h-4.999a1 1 0 0 0 -1 1v6l.007 .117a1 1 0 0 0 .993 .883l4.999 -.001l.001 2.587a2 2 0 0 0 3.414 1.414l6.586 -6.586a2 2 0 0 0 0 -2.828l-6.586 -6.586a2 2 0 0 0 -2.18 -.434l-.145 .068z" stroke-width="0" fill="currentColor"></path>
        <path d="M3 8a1 1 0 0 1 .993 .883l.007 .117v6a1 1 0 0 1 -1.993 .117l-.007 -.117v-6a1 1 0 0 1 1 -1z" stroke-width="0" fill="currentColor"></path>
      </svg>
    </a>
  </div>
</div>