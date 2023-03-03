<script lang="ts">
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  let chart: Chart;

  onMount(() => {
    const ctx = (document.getElementById("myChart") as HTMLCanvasElement).getContext("2d") as CanvasRenderingContext2D;

    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["01/01", "02/01", "03/01", "04/01", "05/01", "06/01", "07/01"],
        datasets: [
          {
            label: "Nombre de clics ce jour-là",
            data: [12, 19, 2, 5, 2, 3, 8],
            fill: {
              target: "origin",
              above: "rgba(48, 82, 161, 0.2)"
            },
            borderColor: "#3052a1",
            borderWidth: 4,
            tension: 0.1
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        maintainAspectRatio: false,
        scales: {
          y: {
            ticks: {
              font: {
                family: "Poppins",
              }
            },
            beginAtZero: true
          },
        },
        elements: {
          point: {
            radius: 3
          }
        }
      },
    });
  });
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
        <p class="font-normal flex gap-2 text-gray-400">
          27,000
          <span class="text-green-400">+ 2,000 (this day)</span>
        </p>
      </div>
      <div class="flex flex-col items-center justify-center h-24 rounded bg-gray-800 animate-pulse">
      </div>
      <div class="flex flex-col items-center justify-center h-24 rounded bg-gray-800 animate-pulse">
      </div>
    </div>
    <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-800">
      <canvas class="m-2" id="myChart" />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
      <div class="flex flex-col rounded bg-gray-800">
        <div class="flex flex-col px-4 pt-2 pb-2">
          <span class="text-2xl font-bold text-white">Sources</span>
          <span class="text-sm text-gray-400">Les sources ou votre lien a été le plus accédé</span>
        </div>

        <div class="flex-grow relative px-4 sm:h-[400px] pb-2">
          <div class="flex items-center justify-between my-1 text-sm">
            <div class="w-full relative" style="max-width: calc(100% - 5rem);">
              <div class="absolute top-0 left-0 h-full bg-behind bg-opacity-15 w-[100%]"></div>
              <span class="flex px-2 py-1.5 text-gray-300 relative z-9 break-all">
                <a class="md:truncate block hover:underline" href="/">
                  <img src="https://linkfy.fr/pv07" class="inline w-4 h-4 mr-2 -mt-px align-middle" alt="Direct / None" />
                  Direct / None
                </a>
              </span>
            </div>
            <span class="font-medium text-gray-200 w-20 text-right">
              3k <span class="font-normal text-gray-500">(80%)</span>
            </span>
          </div>
          <div class="flex items-center justify-between my-1 text-sm">
            <div class="w-full relative" style="max-width: calc(100% - 5rem);">
              <div class="absolute top-0 left-0 h-full bg-behind bg-opacity-15 w-[58%]"></div>
              <span class="flex px-2 py-1.5 text-gray-300 relative z-9 break-all">
                <a class="md:truncate block hover:underline" href="/">
                  <img src="https://linkfy.fr/pv07" class="inline w-4 h-4 mr-2 -mt-px align-middle" alt="Direct / None" />
                  Google
                </a>
              </span>
            </div>
            <span class="font-medium text-gray-200 w-20 text-right">
              965 <span class="font-normal text-gray-500">(20%)</span>
            </span>
          </div>

          <div class="absolute bottom-0 left-0 w-full h-8">
            <div class="flex items-center justify-between px-4 h-full pb-3">
              <span class="text-sm text-gray-400 sr-only">Afficher un graphique</span> <!-- For later -->
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col rounded bg-gray-800">
        <div class="flex flex-col px-4 pt-2 pb-2">
          <span class="text-2xl font-bold text-white">Locations</span>
          <span class="text-sm text-gray-400">Voici les locations ou votre liens à été le plus cliqué</span>
        </div>

        <div class="flex-grow relative px-4 sm:h-[400px] pb-2">
          <div class="flex items-center justify-between my-1 text-sm">
            <div class="w-full relative" style="max-width: calc(100% - 5rem);">
              <div class="absolute top-0 left-0 h-full bg-behind bg-opacity-15 w-[57%]"></div>
              <span class="flex px-2 py-1.5 text-gray-300 relative z-9 break-all">
                <a class="md:truncate block hover:underline" href="/">
                  <img src="https://linkfy.fr/4yfa" class="inline w-4 h-4 mr-2 -mt-px align-middle" alt="Direct / None" />
                  France
                </a>
              </span>
            </div>
            <span class="font-medium text-gray-200 w-20 text-right">
              987m <span class="font-normal text-gray-500">(57%)</span>
            </span>
          </div>
          <div class="flex items-center justify-between my-1 text-sm">
            <div class="w-full relative" style="max-width: calc(100% - 5rem);">
              <div class="absolute top-0 left-0 h-full bg-behind bg-opacity-15 w-[26%]"></div>
              <span class="flex px-2 py-1.5 text-gray-300 relative z-9 break-all">
                <a class="md:truncate block hover:underline" href="/">
                  <img src="https://linkfy.fr/pqcc" class="inline w-4 h-4 mr-2 -mt-px align-middle" alt="Direct / None" />
                  États-Unis
                </a>
              </span>
            </div>
            <span class="font-medium text-gray-200 w-20 text-right">
              259m <span class="font-normal text-gray-500">(26%)</span>
            </span>
          </div>
          <div class="flex items-center justify-between my-1 text-sm">
            <div class="w-full relative" style="max-width: calc(100% - 5rem);">
              <div class="absolute top-0 left-0 h-full bg-behind bg-opacity-15 w-[17%]"></div>
              <span class="flex px-2 py-1.5 text-gray-300 relative z-9 break-all">
                <a class="md:truncate block hover:underline" href="/">
                  <img src="https://linkfy.fr/hj30" class="inline w-4 h-4 mr-2 -mt-px align-middle" alt="Direct / None" />
                  Canada
                </a>
              </span>
            </div>
            <span class="font-medium text-gray-200 w-20 text-right">
              175m <span class="font-normal text-gray-500">(17%)</span>
            </span>
          </div>

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