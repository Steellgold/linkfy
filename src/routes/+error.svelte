<script lang="ts">
  import { page } from '$app/stores';
  import { RedirectButton } from '$lib/components/button';
  import clsx from 'clsx';

  interface Error {
    code: number;
    message: string;
  }

  let error = $page.error as Error;

  let errors = clsx({
    "You must be connected to an account to access this page, if you are already connected, please try again later.": error.code === 401,
    "Sorry but this redirection link does not exist. However, you can go back to the home page to create your own redirection link.": error.code === 404,
    "Sorry, an internal error occurred on the server.": error.code === 500 || error.code == null,
  });
</script>

<div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
  <div class="mx-auto max-w-screen-sm text-center">
    <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-white">{ error.code ?? "500"}</h1>
    <p class="mb-4 text-lg font-medium text-gray-500 dark:text-gray-400">{ errors }</p>

    <RedirectButton path="/" size="default">
      <i class="fa-solid fa-arrow-left"></i>&nbsp;&nbsp;Back to home page
    </RedirectButton>
        
    {#if error.code == 401}
      <RedirectButton path="/" size="default">
        <i class="fa-solid fa-user"></i>&nbsp;&nbsp;Login
      </RedirectButton>
    {/if}
  </div>   
</div>