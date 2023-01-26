<script lang="ts">
    import { Input } from "$lib/components/input";

  
  let email: string;
  let password: string;
</script>

<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
  <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">Accéder à son compte</h1>
  <form class="space-y-4 md:space-y-6" action="#">
    <div>
      <Input type="email" bind:value={email} placeholder="johndoe@example.com" label="Adresse courriel ou nom d'utilisateur" size="large" />
    </div>
    <div><Input type="password" bind:value={password} placeholder="••••••••" label="Mot de passe" size="large" /></div>

    <button type="button" class="px-3 py-2 w-full text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-1 focus:outline-none">Se connecter</button>
      
    <div class="flex items-center justify-between text-sm font-normal text-gray-400">
      <a href="/sign-up" class="hover:text-gray-300 transition-all ease-in-out 10s">Pas encore de compte ?</a>
      <a href="/forget-password" class="hover:underline">Mot de passe oublié</a>
    </div>
  </form>
</div>