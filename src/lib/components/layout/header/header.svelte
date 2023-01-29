<script lang="ts">
  import { Link } from "$lib/components/button";
  import { fly } from "svelte/transition";

  let mobileMenuOpen = false;
  const toggleMobileMenu = () => {
    mobileMenuOpen = !mobileMenuOpen;
  };
</script>

<nav class="bg-gray-800 lg:mb-3">
  <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
    <div class="relative flex items-center justify-between h-16">
      <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <!-- Mobile menu button-->
        <button type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-0 focus:ring-inset" aria-controls="mobile-menu" aria-expanded="false" on:click={toggleMobileMenu}>
          <span class="sr-only">Open main menu</span>
          {#if !mobileMenuOpen}
            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          {/if}
          {#if mobileMenuOpen}
            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          {/if}
        </button>
      </div>
      <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
        <div class="flex-shrink-0 flex items-center">
          <a href="/">
            <img class="hidden sm:block h-8 w-auto" src="/link.png" alt="Linkfy">
          </a>
        </div>
      </div>

      <Link props={{ href: "/", variant: "blue", size: "medium" }}>
        Get started
      </Link>
    </div>
  </div>
</nav>

<!-- Mobile menu, show/hide based on menu state. -->
<div class="sm:hidden" id="mobile-menu">
  <div class="px-2 pb-1 space-y-1 bg-gray-800" in:fly="{{ x: 20, duration: 350 }}">
    <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
    {#if mobileMenuOpen}
      <a href="/" class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" in:fly="{{ x: 40, duration: 350 }}">Shortener</a>
      <a href="/" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" in:fly="{{ x: 60, duration: 350 }}">Pricing</a>
      <a href="/" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" in:fly="{{ x: 70, duration: 450 }}">FAQ</a>
      <a href="/" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" in:fly="{{ x: 80, duration: 550 }}">About</a>

      <hr class="border-gray-700" />

      <a href="/" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" in:fly="{{ x: 90, duration: 650 }}">Support</a>
    {/if}
  </div>
</div>

<slot></slot>