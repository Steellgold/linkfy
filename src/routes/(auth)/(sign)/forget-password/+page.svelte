<script lang="ts">
  import { Input } from "$lib/components/input";
  
  let email: string;
</script>

<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
<h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">Get my account back</h1>
<form class="space-y-4 md:space-y-6" action="#">
  <div>
    <Input type="email" bind:value={email} placeholder="johndoe@example.com" label="Email address or username" size="large" />
  </div>

  <button type="button" class="px-3 py-2 w-full text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-1 focus:outline-none">Send the email</button>
      
  <p class="text-sm font-light text-gray-400">
    I found my password, let me <a href="/sign-in" class="hover:text-gray-300 transition-all ease-in-out 2s">Log in</a>
  </p>
</form>
</div>