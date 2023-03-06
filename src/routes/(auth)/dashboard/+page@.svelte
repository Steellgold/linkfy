<script lang="ts">
  import { HeadCard, StatCard, StatGraph, StatRow } from "$lib/components/layout/stats";
  import { IconLayoutBoard } from "@tabler/icons-svelte";
  import { onMount } from "svelte";

  let loading: boolean = true;

  onMount(() => {
    loading = false;
  });
</script>

<div class="flex flex-col items-center mx-auto px-3 py-4 lg:py-0">
  <div class="w-full rounded-lg p-4 md:mt-0 max-w-5xl">
    <div class="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-3">
      <HeadCard title="Nombre de liens" subtitle="19 liens" loading={loading} />
      <StatCard title="Ce mois ci" up={true} subtitleType="other" subtitle="(+139m)" count={391000000} loading={loading} />
      <StatCard title="Aujourd'hui" up={true} subtitleType="other" subtitle="(+139m)" count={391000000} loading={loading} />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
      <div class="sm:col-span-2 flex items-center justify-center rounded h-28 bg-gray-800">
        <p class="text-2xl text-gray-500">+</p>
      </div>
      <div class="flex items-center justify-center rounded h-28 bg-gray-800">
        <p class="text-2xl text-gray-500">+</p>
      </div>
    </div>

    <div class="flex items-center justify-center h-46 sm:h-72 mb-4 rounded bg-gray-800">
      <StatGraph datasets={[
        { label: "test", data: [1, 2, 3, 4, 5, 6, 7, 8, 45, 10], borderColor: "#4368a8" },
        { label: "test2", data: [2, 3, 4, 65, 6, 7, 8, 9, 10, 11], borderColor: "#286939" },
        { label: "test3", data: [3, 4, 5, 6, 7, 8, 9, 47, 11, 12], borderColor: "#695b28" },
      ]} labels={["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche", "Lundi", "Mardi", "Mercredi"]} />
    </div>
  </div>
</div>