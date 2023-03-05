<script>
  import { Button } from "$lib/components/forms/button";
  import { Input } from "$lib/components/forms/input";
</script>

<form action="#">
  <h1 class="text-2xl font-bold mb-4 text-white">
    Connect to your account
  </h1>

  <div class="mb-3">
    <Input props={{
      type: "email",
      placeholder: "john@company.com",
      size: "large",
      label: "Your email",
    }} />
  </div>

  <div class="mb-3">
    <Input props={{
      type: "password",
      placeholder: "••••••••",
      size: "large",
      label: "Your password",
    }} />
  </div>

  <div>
    <Button props={{ type: "submit", variant: "blue", size: "lg", disabled: false, full: true }}>
      Sign in
    </Button>
  </div>
</form>

<div>
  <p class="text-sm text-gray-400">
    Don't have an account? <a href="/register" class="text-blue-600 hover:text-blue-500 hover:underline">Create one</a>
  </p>

  <p class="text-sm text-gray-400">
    Forgot your password? <a href="/forgot-password" class="text-blue-600 hover:text-blue-500 hover:underline">Reset it</a>
  </p>
</div>