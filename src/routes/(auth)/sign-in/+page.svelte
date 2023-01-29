<script lang="ts">
  import { Button } from "$lib/components/button";
  import { Input } from "$lib/components/forms/input";
  import { Container } from "$lib/components/layout/container";

  export let email: string;
  export let password: string;
</script>

<Container maxSize="md">
  <form action="?/login" method="POST">
    <div class="mb-3">
      <Input bind:value={email} props={{ type: "text", label: "Email address", placeholder: "johndoe@example.com", width: "full", size: "small", name: "email" }} />
    </div>

    <div class="mb-0">
      <Input bind:value={password} props={{ type: "password", label: "Password", placeholder: "••••••••", width: "full", size: "small", name: "password" }} />
    </div>

    <div class="mt-5">
      <Button props={{ type: "submit", size: "large", variant: "blue" }}>
        Se connecter
      </Button>
    </div>

    <div class="mt-4">
      <p class="text-sm font-sm text-gray-400">
        Don't have an account? <a href="/sign-up" class="hover:text-gray-300 transition-all ease-in-out 2s">Sign up</a>
      </p>
    </div>
  </form>
</Container>