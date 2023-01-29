<script lang="ts">
  import { Input, InputGroup } from "$lib/components/forms/input";
  import { PasswordForce } from "$lib/components/layout/password-force";

  export let data: any;
  export let form: any;

  let email: string;
  let password: string;
  let passwordConfirm: string;
</script>

<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
  <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">Create your account</h1>
    <InputGroup label="Password">
      <Input bind:value={password} props={{ placeholder: "••••••••", width: "auto", size: "small" }} />
      <Input bind:value={passwordConfirm} props={{ placeholder: "••••••••", width: "auto", size: "small" }} />
    </InputGroup>

  {#if form?.error}
    <div class="p-3 text-sm font-medium text-center text-red-700 bg-red-200 rounded-lg">
      {form.error}
    <PasswordForce bind:password={password} />
    </div>
  {/if}

  <form class="space-y-4 md:space-y-6" action="?/register" method="POST">
      <div><Input type="email" bind:value={email} placeholder="johndoe@example.com" label="Email address" size="large" name="email" /></div>
      <div><Input type="password" bind:value={password} placeholder="••••••••" label="Choose a password" size="large" name="password" /></div>
      <div><Input type="password" bind:value={passwordConfirm} placeholder="••••••••" label="Confirm your password" size="large" name="confirmPassword" /></div>
      <button type="submit" class="px-3 py-2 w-full text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-1 focus:outline-none">Sign up</button>
      
      <p class="text-sm font-light text-gray-400">
        Already have an account? <a href="/sign-in" class="hover:text-gray-300 transition-all ease-in-out 2s">Log in</a>
      </p>
  </form>
</div>