<script lang="ts">
  import { RedirectButton } from "$lib/components/button";
  import { NavbarGroup, NavbarLink } from ".";
</script>

<nav class="bg-gray-900 px-2 py-3">
  <div class="container flex flex-wrap items-center justify-between mx-auto">
    <a href="/" class="flex items-center">
      <img src="/favicon.png" class="h-6 mr-3 sm:h-9" alt="??? Logo" />
      <span class="self-center text-white text-xl font-semibold whitespace-nowrap">Shortener</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
      <span class="sr-only">Open main menu</span>
      <i class="fa-solid fa-bars"></i>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <NavbarGroup>
        <NavbarLink href="/">
          Home
        </NavbarLink>

        <NavbarLink href="/login">
          Login
        </NavbarLink>

        <RedirectButton size="large" path="/app">
          <i class="fa-solid fa-table-columns"></i>&nbsp;&nbsp;Dashboard
        </RedirectButton>
      </NavbarGroup>
    </div>
  </div>
</nav>
