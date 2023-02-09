<script lang="ts">
  import { enhance, type SubmitFunction } from "$app/forms";
  import { page } from "$app/stores";
  import { Link } from "$lib/components/button";
  import { supabaseClient } from "$lib/database/Supabase";
  import { IconUserCircle } from "$lib/icons";
  import { fly } from "svelte/transition";

  let mobileMenuOpen = false;
  const toggleMobileMenu = () => {
    mobileMenuOpen = !mobileMenuOpen;
  };

  const submitLogout: SubmitFunction = async ({ cancel }) => {
		const { error } = await supabaseClient.auth.signOut();
		if (error) {
			console.log(error);
		}
		cancel();
	};
</script>

<nav class="bg-gray-900 mb-6">
  <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div class="relative flex h-16 items-center justify-between">
      <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <!-- Mobile menu button-->
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-0 focus:ring-inset"
          aria-controls="mobile-menu"
          aria-expanded="false"
          on:click={toggleMobileMenu}
        >
          <span class="sr-only">Open main menu</span>
          {#if !mobileMenuOpen}
            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          {/if}
          {#if mobileMenuOpen}
            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          {/if}
        </button>
      </div>
      <div class="flex flex-1 items-stretch justify-start">
        <div class="flex flex-shrink-0 items-center">
          <a href="/">
            <img class="hidden h-8 w-auto sm:block" src="/link.png" alt="Linkfy" />
          </a>
        </div>
      </div>

      {#if !$page.data.session}
        <Link props={{ href: "/sign-in", size: "medium", withIcon: true, variant: "blue" }}>
          <IconUserCircle /> Sign in
        </Link>
      {:else}
        <button id="sessionDropdown" data-dropdown-toggle="dropdown" class="text-white focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800" type="button">
          {$page.data.session.user.email}
          <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        
        <div id="dropdown" class="z-10 hidden divide-y divide-gray-100 rounded-lg shadow w-44 bg-gray-700">
          <ul class="py-2 text-sm text-gray-200" aria-labelledby="sessionDropdown">
            <li>
              <a href="/" class="block px-4 py-2 hover:bg-gray-600 hover:text-white">Dashboard</a>
            </li>

            <form action="/logout" method="POST" use:enhance={submitLogout}>
              <button class="block w-full px-4 py-2 text-left hover:bg-red-600 hover:text-white transition-colors">
                Sign out
              </button>
            </form>
          </ul>
        </div>      
      {/if}
    </div>
  </div>
</nav>

<!-- Mobile menu, show/hide based on menu state. -->
<div class="sm:hidden" id="mobile-menu">
  <div class="space-y-1 bg-gray-900 px-2 pb-1" in:fly={{ x: 20, duration: 350 }}>
    {#if mobileMenuOpen}
      <a href="/" class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white hover:bg-gray-800"
        in:fly={{ x: 5, duration: 200 }}>Shortener</a>
      <a href="/" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        in:fly={{ x: 6, duration: 400 }}>Pricing</a>
      <a href="/" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        in:fly={{ x: 7, duration: 600 }}>FAQ</a>
      <a href="/" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        in:fly={{ x: 8, duration: 800 }}>About</a>

      <hr class="border-gray-700" />

      <a href="/" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        in:fly={{ x: 5, duration: 1000 }}>Support</a>
    {/if}
  </div>
</div>

<slot />
