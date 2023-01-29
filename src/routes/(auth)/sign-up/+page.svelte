<script lang="ts">
  import { Button } from "$lib/components/button";
  import { Input, InputGroup } from "$lib/components/forms/input";
  import { Container } from "$lib/components/layout/container";
  import { PasswordForce } from "$lib/components/layout/password-force";

  export let email: string;
  export let password: string;
  export let passwordConfirm: string;
</script>

<Container maxSize="md">
  <form method="POST" action="?/register">
    <div class="mb-3">
      <Input bind:value={email} props={{ type: "email", label: "Email address", placeholder: "johndoe@example.com", width: "full", size: "small", name: "email" }} />
    </div>

    <div class="mb-2">
      <Input bind:value={password} props={{ label: "Password", type: "password", placeholder: "••••••••", width: "full", size: "small", name: "password" }} />
    </div>

    <div class="mb-3">
      <Input bind:value={passwordConfirm} props={{ label: "Confirm your password", type: "password", placeholder: "••••••••", width: "full", size: "small" }} />
    </div>

    <PasswordForce bind:password={password} />

    <div class="mt-5">
      <Button props={{ type: "submit", size: "large", variant: "blue" }}>
        S'inscrire
      </Button>
    </div>

    <div class="mt-4">
      <p class="text-sm font-sm text-gray-400">
        Already have an account? <a href="/sign-in" class="hover:text-gray-300 transition-all ease-in-out 2s">Log in</a>
      </p>
    </div>
  </form>
</Container>