<script lang="ts">
  import { StatCard, StatGraph, StatRow } from "$lib/components/layout/stats";
</script>

<div class="flex flex-col items-center mx-auto px-3 py-4 lg:py-0">
  <div class="w-full rounded-lg p-4 md:mt-0 max-w-5xl">
    <div class="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-3">
      <StatCard title="Total clicks" count={291} up={true} upSubtitle="+103 (this day)" />
      <StatCard title="Total clicks" count={291} up={false} upSubtitle="-4 (this day)" />
      <div class="flex flex-col items-center justify-center h-24 rounded bg-gray-800 animate-pulse"></div>
    </div>
    <div class="flex items-center justify-center h-46 sm:h-72 mb-4 rounded bg-gray-800">
      <!-- StartGraph { label: string; count: number }[]; -->
      <StatGraph data={[
        { label: "01/01", count: 291, country: "FR" },
        // To the 29th
        { label: "02/01", count: 291, country: "FR" },
        { label: "03/01", count: 547, country: "FR" },
        { label: "04/01", count: 778, country: "FR" },
        { label: "05/01", count: 876, country: "FR" },
        { label: "06/01", count: 789, country: "FR" },
        { label: "07/01", count: 544, country: "FR" },
        { label: "08/01", count: 658, country: "FR" },
        { label: "09/01", count: 166, country: "FR" },
        { label: "10/01", count: 389, country: "FR" },
        { label: "11/01", count: 547, country: "FR" },
        { label: "12/01", count: 544, country: "FR" },
        { label: "13/01", count: 102, country: "FR" },
        { label: "14/01", count: 451, country: "FR" },
        { label: "15/01", count: 545, country: "FR" },
        { label: "16/01", count: 156, country: "FR" },
        { label: "17/01", count: 663, country: "FR" },
        { label: "18/01", count: 778, country: "FR" },
        { label: "19/01", count: 184, country: "FR" },
        { label: "20/01", count: 968, country: "FR" },
        { label: "21/01", count: 133, country: "FR" },
        { label: "22/01", count: 145, country: "FR" },
        { label: "23/01", count: 988, country: "FR" },
        { label: "24/01", count: 233, country: "FR" },
        { label: "25/01", count: 154, country: "FR" },
        { label: "26/01", count: 489, country: "FR" },
        { label: "27/01", count: 121, country: "FR" },
        { label: "28/01", count: 84, country: "FR" },
        { label: "29/01", count: 110, country: "FR" },
        { label: "30/01", count: 889, country: "FR" },
        { label: "31/01", count: 125, country: "FR" },
      ]} />
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
              <span class="text-sm text-gray-400 sr-only">Afficher un graphique</span> <!-- For later -->
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
</div>