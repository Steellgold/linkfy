<script lang="ts">
  import { enhance, type SubmitFunction } from "$app/forms";
  import { page } from "$app/stores";
  import { supabaseClient } from "$lib/database/Supabase";
  import { fly } from "svelte/transition";
  import type { PageData } from "./$types";

  export let data: PageData;

  const submitLogout: SubmitFunction = async ({ cancel }) => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      console.log(error);
    }
    cancel();
  };
</script>

{#if $page.data.session}
  <div class="mb-5 hidden sm:block">
    <div class="mx-auto max-w-7xl px-6">
      <div class="relative flex items-center justify-between">
        <div class="flex flex-1 items-stretch justify-start">
          <div class="flex flex-shrink-0 items-center gap-2">
            <a
              href="/"
              class="block rounded-md px-3 py-2 text-base font-medium text-white transition-colors hover:bg-gray-800"
            >
              Mon compte
            </a>
          </div>
        </div>

        <div class="flex flex-1 items-stretch justify-end">
          <div class="flex flex-shrink-0 items-center gap-2">
            <form action="/app/logout" method="POST" use:enhance={submitLogout}>
              <button
                class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white transition-colors hover:bg-red-700"
              >
                Déconnexion
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<slot />
