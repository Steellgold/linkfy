<script lang="ts">
  export let password: string = "";
  import { getPasswordStrengthMessage, getPercentagePasswordStrength } from "$lib/utils/Password";

  let errorRangePercent: number = 0;
  let range: { color: string; message: string; } = { color: "red", message: "" };

  $: {
    errorRangePercent = getPercentagePasswordStrength(password);
    range = getPasswordStrengthMessage(errorRangePercent);
  }
</script>

<div class="mb-1 text-base font-normal text-{range["color"]}-500">{ range["message"] }</div>
<div class="w-full rounded-full h-1 mb-4 bg-gray-700">
  <div class="bg-{range["color"]}-600 h-1 rounded-full" style="width: {errorRangePercent}%"></div>
</div>