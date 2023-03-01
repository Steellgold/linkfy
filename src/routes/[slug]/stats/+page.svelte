<script lang="ts">
    import { onMount } from "svelte";

  onMount(() => {
    // @ts-ignore
    const myChart = new Chart("statsChart", {
      type: 'line',
      data: {
        labels: ['01/01', '02/01', '03/01', '04/01', '05/01', '06/01', '07/01'],
        datasets: [{
          label: 'Janvier',
          data: [0, 210, 20, 19, 18, 38, 11],
          fill: false,
          borderColor: 'white',
          tension: 0.1
        }, {
          label: 'Février',
          data: [39, 12, 23, 86, 1029, 0, 488],
          fill: false,
          borderColor: 'skyblue',
          tension: 0.1
        }, {
          label: 'Mars',
          data: [13, 198, 203, 304, 31, 1922],
          fill: false,
          borderColor: 'orange',
          tension: 0.1
        }, {
          label: 'Avril',
          data: [29, 12, 23, 86, 1029, 0, 488],
          fill: false,
          borderColor: 'red',
          tension: 0.1
        }, {
          label: 'Mai',
          data: [162, 921, 238, 347, 128, 842, 149],
          fill: false,
          borderColor: 'green',
          tension: 0.1
        }, {
          label: 'Juin',
          data: [47, 393, 628, 972, 417, 819, 625],
          fill: false,
          borderColor: 'purple',
          tension: 0.1
        }, {
          label: 'Juillet',
          data: [736, 324, 218, 551, 816, 192, 942],
          fill: false,
          borderColor: 'yellow',
          tension: 0.1
        }, {
          label: 'Août',
          data: [832, 428, 698, 234, 176, 582, 93],
          fill: false,
          borderColor: 'teal',
          tension: 0.1
        }, {
          label: 'Septembre',
          data: [143, 682, 362, 275, 593, 397, 209],
          fill: false,
          borderColor: 'magenta',
          tension: 0.1
        }, {
          label: 'Octobre',
          data: [571, 382, 118, 661, 242, 829, 497],
          fill: false,
          borderColor: 'brown',
          tension: 0.1
        }, {
          label: 'Novembre',
          data: [294, 588, 214, 964, 441, 305, 702],
          fill: false,
          borderColor: 'navy',
          tension: 0.1
        }, {
          label: 'Décembre',
          data: [821, 946, 333, 578, 729, 912, 244],
          fill: false,
          borderColor: 'olive',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { font: { family: "Poppins" } } },
          title: { font: { family: "Poppins" } },
          tooltip: { bodyFont: { family: "Poppins", color: "red" } }
        },
        scales: {
          x: { ticks: { font: { family: "Poppins" } } },
          y: { ticks: { font: { family: "Poppins" } } }
        }
      }
    });
  });
</script>

<div class="flex flex-col items-center mx-auto px-3 py-4 lg:py-0">
  <div class="w-full rounded-lg p-4 md:mt-0 max-w-5xl">
    <div class="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-3">
      <div class="flex flex-col items-center justify-center h-24 rounded bg-gray-800">
        <h5 class="flex items-center gap-2 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
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
    <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
      <!-- Chart, width and height auto with flex of parent -->
      <canvas id="statsChart" class="w-full h-full p-2"></canvas>
    </div>
    <div class="grid grid-cols-2 gap-4 mb-4">
      <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
        <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
      </div>
      <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
        <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
      </div>
      <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
        <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
      </div>
      <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
        <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
      </div>
    </div>
  </div>
</div>