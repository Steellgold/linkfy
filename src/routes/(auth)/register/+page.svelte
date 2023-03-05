<script>
  import { Button } from "$lib/components/forms/button";
  import { Checkbox } from "$lib/components/forms/checkbox";
  import { Input } from "$lib/components/forms/input";
</script>

<form action="#">
  <h1 class="text-2xl font-bold mb-4 text-white">
    Create your account
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

  <div class="mb-3">
    <Input props={{
      type: "password",
      placeholder: "••••••••",
      size: "large",
      label: "Confirm password",
    }} />
  </div>

  <div class="mb-3">
    <Checkbox>
      I agree to the <a href="/" class="text-blue-600 hover:text-blue-500 hover:underline">Terms and Conditions</a>
    </Checkbox>
  </div>

  <div class="flex items-start">
    <Button props={{ type: "submit", variant: "blue", size: "lg", disabled: false, full: true }}>
      Get started
    </Button>
  </div>
</form>

<div>
  <p class="text-sm text-gray-400">
    Already have an account? <a href="/login" class="text-blue-600 hover:text-blue-500 hover:underline">Sign in</a>
  </p>
</div>