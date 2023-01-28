<script lang="ts">
  import { Input } from "$lib/components/input";

  export let data: any;
  export let form: any;

  let email: string;
  let password: string;
</script>

<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
  <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">Access to your account</h1>

  {#if form?.error}
    <div class="p-3 text-sm font-medium text-center text-red-700 bg-red-200 rounded-lg">
      {form.error}
    </div>
  {/if}

  <form class="space-y-4 md:space-y-6" method="POST" action="?/login">
    <div>
      <Input type="email" bind:value={email} placeholder="johndoe@example.com" label="Email address or username" size="large" name="email" />
    </div>
    <div><Input type="password" bind:value={password} placeholder="••••••••" label="Password" size="large" name="password" /></div>

    <button type="submit" class="px-3 py-2 w-full text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-1 focus:outline-none">Log in</button>
      
    <div class="flex items-center justify-between text-sm font-normal text-gray-400">
      <a href="/sign-up" class="hover:text-gray-300 transition-all ease-in-out 10s">No account yet?</a>
      <a href="/forget-password" class="hover:underline">Forgot your password?</a>
    </div>
  </form>
</div>