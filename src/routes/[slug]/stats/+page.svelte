<script lang="ts">
  import { StatCard, StatGraph, StatRow } from "$lib/components/layout/stats";
  import { IconMotorbike } from "@tabler/icons-svelte";
  import { onMount } from "svelte";

  let loading: boolean = true;

  onMount(() => {
    loading = false;
  });
</script>

<div class="flex flex-col items-center mx-auto px-3 py-4 lg:py-0">
  <div class="w-full rounded-lg p-4 md:mt-0 max-w-5xl">
    <div class="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-3">
      <StatCard title="Total clicks" count={291} up={true} subtitle="(+103 this day)" loading={loading} />
      <StatCard title="Unique clicks" count={184} up={false} subtitle="(-4 this day)" loading={loading} />
      <StatCard title="Most visit" count={547} up={true} subtitleType="country" subtitle="France" loading={loading} />
    </div>
    <div class="flex items-center justify-center h-46 sm:h-72 mb-4 rounded bg-gray-800">
      <StatGraph
        datasets={[{ label: "Total clicks", data: [291, 291, 547, 778, 876, 789, 544, 658, 166, 389, 547, 544, 102, 451, 545, 156, 663, 778, 184, 968, 133, 145, 988, 233, 154, 489, 121, 84, 110, 889, 125], borderColor: "#495b73" }]}
        labels={["01/01", "02/01", "03/01", "04/01", "05/01", "06/01", "07/01", "08/01", "09/01", "10/01", "11/01", "12/01", "13/01", "14/01", "15/01", "16/01", "17/01", "18/01", "19/01", "20/01", "21/01", "22/01", "23/01", "24/01", "25/01", "26/01", "27/01", "28/01", "29/01", "30/01", "31/01"]
        }
      />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
      <div class="flex flex-col rounded bg-gray-800">
        <div class="flex flex-col px-4 pt-3 pb-2">
          <span class="text-2xl font-bold text-white">Sources</span>
          <span class="text-sm text-gray-400">Les sources ou votre lien a été le plus accédé</span>
        </div>

        <div class="flex-grow relative px-4 sm:h-[400px] pb-2">
          <StatRow count={3000} iconUrl="https://linkfy.fr/pv07" name="Direct / None" percentage={80} />
          <StatRow count={965} iconUrl="https://linkfy.fr/y6nn" name="Google" percentage={20} />

          <div class="absolute bottom-0 left-0 w-full h-8">
            <div class="flex items-center justify-between px-4 h-full pb-3">
              <span class="text-sm text-gray-400">Afficher un graphique</span> <!-- For later -->
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col rounded bg-gray-800">
        <div class="flex flex-col px-4 pt-3 pb-2">
          <span class="text-2xl font-bold text-white">Locations</span>
          <span class="text-sm text-gray-400">Voici les locations ou votre liens à été le plus cliqué</span>
        </div>

        <div class="flex-grow relative px-4 sm:h-[400px] pb-2">
          <StatRow count={987000000} iconUrl="https://countryflagsapi.com/png/fr" name="France" percentage={57} isFlag={true} />
          <StatRow count={259000000} iconUrl="https://countryflagsapi.com/png/us" name="États-Unis" percentage={26} isFlag={true} />
          <StatRow count={175000000} iconUrl="https://countryflagsapi.com/png/ca" name="Canada" percentage={17} isFlag={true} />

          <div class="absolute bottom-0 left-0 w-full h-8">
            <div class="flex items-center justify-between px-4 h-full pb-3">
              <span class="text-sm text-gray-400 sr-only">Afficher un graphique</span> <!-- For later -->
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col rounded bg-gray-800">
        <div class="flex flex-col px-4 pt-3 pb-2">
          <span class="text-2xl font-bold text-white">Appareils</span>
          <span class="text-sm text-gray-400">Voici les appareils ou votre liens à été le plus cliqué</span>
        </div>

        <div class="flex-grow relative px-4 sm:h-[400px] pb-2">
          <StatRow count={987000000} name="Ordinateur" percentage={38} />
          <StatRow count={14300} name="Autre" percentage={29} />
          <StatRow count={25600} name="Téléphone" percentage={21} />
          <StatRow count={6980} name="Tablette" percentage={12} />

          <div class="absolute bottom-0 left-0 w-full h-8">
            <div class="flex items-center justify-between px-4 h-full pb-3">
              <span class="text-sm text-gray-400 sr-only">Afficher un graphique</span> <!-- For later -->
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col rounded bg-gray-800">
        <div class="flex flex-col px-4 pt-3 pb-2">
          <span class="text-2xl font-bold text-white">Navigateurs</span>
          <span class="text-sm text-gray-400">Voici les navigateurs ou votre liens à été le plus cliqué</span>
        </div>

        <div class="flex-grow relative px-4 sm:h-[400px] pb-2">
          <StatRow count={14300} name="Autre" percentage={42} />
          <StatRow count={987000000} name="Chrome" percentage={12} />
          <StatRow count={25600} name="Firefox" percentage={10} />
          <StatRow count={6980} name="Safari" percentage={8} />
          <StatRow count={14300} name="Microsoft Edge" percentage={7} />
          <StatRow count={14300} name="Mobile App" percentage={6} />
          <StatRow count={14300} name="Opera" percentage={5} />
          <StatRow count={14300} name="DuckDuckGo" percentage={4} />
          <StatRow count={14300} name="Samsung Browser" percentage={3} />

          <div class="absolute bottom-0 left-0 w-full h-8">
            <div class="flex items-center justify-between px-4 h-full pb-3">
              <span class="text-sm text-gray-400 sr-only">Afficher un graphique</span> <!-- For later -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <a href="/history" class="flex text-blue-600 hover:text-blue-500 gap-2 justify-center p-4 items-center group">
    Ride to the history
    <IconMotorbike size={20} class="group-hover:rotate-45 group-hover:-translate-x-[9.9rem] transition-transform duration-1000 ease-in-out translate-x-0 -scale-x-100" />
  </a>
</div>
