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
  <div class="hidden sm:block mb-5">
    <div class="max-w-7xl mx-auto px-6">
      <div class="relative flex items-center justify-between">
        <div class="flex-1 flex items-stretch justify-start">
          <div class="flex-shrink-0 flex items-center gap-2">
            <a href="/" class="hover:bg-gray-800 text-white block px-3 py-2 rounded-md text-base font-medium transition-colors">
              Mon compte
            </a>
          </div>
        </div>

        <div class="flex-1 flex items-stretch justify-end">
          <div class="flex-shrink-0 flex items-center gap-2">
            <form action="/app/logout" method="POST" use:enhance={submitLogout}>
              <button class="bg-gray-900 hover:bg-red-700 text-white block px-3 py-2 rounded-md text-base font-medium transition-colors">
                Déconnexion
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<slot></slot>