<script lang="ts">
  import { Toggle } from "$lib/components/forms/toggle";

  let yearly = false;
</script>

<slot />

<hr class="border-gray-800 mt-8 mb-8 mx-auto max-w-screen-xl w-1/5 border-2 border-dotted" />

<div class="grid grid-cols-1 px-4">
  <Toggle name="{yearly ? 'Yearly' : 'Monthly'} subscription" bind:yearly />

  <div class="flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border shadow border-gray-600 xl:p-8 bg-gray-800 text-white">
    <h3 class="mb-0 text-2xl font-extrabold pro">Plus</h3>
    <p class="font-light sm:text-lg text-gray-400 mb-3 w-30">One plan for all the features you need.</p>
    <div class="flex justify-center items-baseline pb-4">
      {#if yearly}
        <div class="flex flex-col items-center">
          <div class="flex items-baseline">
            <span class="mr-2 text-5xl font-extrabold">€79.99</span>
            <span class="text-gray-400">/year</span>
          </div>
          <span class="mt-3 text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-[#F4D562] text-gray-800">-20%</span>
        </div>
      {:else}
        <span class="mr-2 text-5xl font-extrabold">€9.99</span>
        <span class="text-gray-400">/month</span>
      {/if}
    </div>

    <p class="text-gray-500 mb-4 text-sm mx-auto max-w-screen-xl">7 days free trial included in your subscription.</p>

    <button class="mb-1 text-white bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 hover:text-white font-semibold px-6 py-3 rounded-lg shadow">
      Get started
    </button>
    <p class="flex items-center gap-0 text-gray-500 text-sm mt-4 mx-auto max-w-screen-xl">
      Secure payment with
      <span class="flex items-center font-bold">
        <img class="h-6" src="https://cdn.brandfolder.io/KGT2DTA4/at/8vbr8k4mr5xjwk4hxq4t9vs/Stripe_wordmark_-_blurple.svg" alt="Stripe">
      </span>
    </p>
  </div>
</div>