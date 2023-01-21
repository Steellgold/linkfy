<script lang="ts">
  import { page } from '$app/stores';
  import { RedirectButton } from '$lib/components/button';

  interface Error {
    code: number;
    message: string;
  }

  let error = $page.error as Error;

  const errors = {
    401: "You must be connected to an account to access this page, if you are already connected, please try again later.",
    403: "Sorry but you do not have the required permissions to access this page.",
    404: "Sorry but this redirection link does not exist. However, you can go back to the home page to create your own redirection link.",
    417: "Sorry but the required data sent does not correspond to the expectations of the request",
    500: "Sorry, an internal error occurred on the server.",
    503: "Sorry, the server is currently unavailable, please try again later."
  } as Record<number, string>;
</script>

<div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
  <div class="mx-auto max-w-screen-sm text-center">
    <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-white">{ error.code ?? "500"}</h1>
    <p class="mb-4 text-lg font-sans text-gray-500 dark:text-gray-400">{ errors[error.code ?? 500] }</p>

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