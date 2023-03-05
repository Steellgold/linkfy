<script>
  import { Button } from "$lib/components/forms/button";
  import { Input } from "$lib/components/forms/input";
</script>

<form action="#">
  <h1 class="text-2xl font-bold mb-4 text-white">
    Forgot your password?
  </h1>

  <div class="mb-3">
    <Input props={{
      type: "email",
      placeholder: "john@company.com",
      size: "large",
      label: "Your email to reset your password",
    }} />
  </div>

  <div class="mt-3 flex items-start">
    <Button props={{ type: "submit", variant: "blue", size: "lg", disabled: false, full: true }}>
      Send reset link
    </Button>
  </div>
</form>

<div>
  <p class="mt-2 text-sm text-gray-400">
    You remember your password? <a href="/login" class="text-blue-600 hover:text-blue-500 hover:underline">Sign in</a>
  </p>
</div>