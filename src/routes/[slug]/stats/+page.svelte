<script lang="ts">
  import { onMount } from "svelte";
  import { StatGraph, StatRow } from "$lib/components/layout/stats";
  import Chart from "chart.js/auto";
</script>

<div class="flex flex-col items-center mx-auto px-3 py-4 lg:py-0">
  <div class="w-full rounded-lg p-4 md:mt-0 max-w-5xl">
    <div class="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-3">
      <div class="flex flex-col items-center justify-center h-24 rounded bg-gray-800">
        <h5 class="flex items-center gap-2 mb-2 text-2xl font-bold tracking-tight text-white">
          Total clicks
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="text-green-400 animate-pulse mt-1">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M10.586 3l-6.586 6.586a2 2 0 0 0 -.434 2.18l.068 .145a2 2 0 0 0 1.78 1.089h2.586v2a1 1 0 0 0 1 1h6l.117 -.007a1 1 0 0 0 .883 -.993l-.001 -2h2.587a2 2 0 0 0 1.414 -3.414l-6.586 -6.586a2 2 0 0 0 -2.828 0z" stroke-width="0" fill="currentColor"></path>
            <path d="M15 20a1 1 0 0 1 .117 1.993l-.117 .007h-6a1 1 0 0 1 -.117 -1.993l.117 -.007h6z" stroke-width="0" fill="currentColor"></path>
            <path d="M15 17a1 1 0 0 1 .117 1.993l-.117 .007h-6a1 1 0 0 1 -.117 -1.993l.117 -.007h6z" stroke-width="0" fill="currentColor"></path>
          </svg>
        </h5>
        <p class="font-normal flex gap-2 text-gray-400">27,000 <span class="text-green-400">+ 2,000 (this day)</span></p>
      </div>
      <div class="flex flex-col items-center justify-center h-24 rounded bg-gray-800 animate-pulse"></div>
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
          <StatRow count={965} iconUrl="https://linkfy.fr/pv07" name="Google" percentage={20} />

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
          <StatRow count={987000000} iconUrl="https://linkfy.fr/4yfa" name="France" percentage={57} />
          <StatRow count={259000000} iconUrl="https://linkfy.fr/pqcc" name="États-Unis" percentage={26} />
          <StatRow count={175000000} iconUrl="https://linkfy.fr/hj30" name="Canada" percentage={17} />

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