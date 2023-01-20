<script lang="ts">
    import { updateLink } from "$lib/utils/db/Supabase";
  import { onMount } from "svelte";
  import type { PageServerLoad } from "./$types";

  export let data: PageServerLoad;

  onMount(async () => {
    let ipAddress = "";
    let countryCode = "";

    await fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        ipAddress = data.ip;
      });

    await fetch("http://ip-api.com/json/" + ipAddress + "?fields=countryCode")
      .then((res) => res.json())
      .then((data) => {
        countryCode = data.countryCode;
      });
  });
</script>