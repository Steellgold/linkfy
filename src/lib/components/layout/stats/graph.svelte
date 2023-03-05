<script lang="ts">
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";
  import { hexToRgbInstring } from "$lib/utils/StringUtils";

  export let datasets: { label: string; data: number[], borderColor: string }[]
  export let labels: string[]

  let chart: Chart;

  onMount(() => {
    const ctx = (document.getElementById("myChart") as HTMLCanvasElement).getContext("2d") as CanvasRenderingContext2D;

    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: datasets.map((dataset) => ({
          ...dataset,
          fill: { target: "origin", above: `rgba(${hexToRgbInstring(dataset.borderColor, false)}, 0.2)` },
          tension: 0.4,
        })),
      },
      options: {
        plugins: { legend: { display: false } },
        maintainAspectRatio: false,
        scales: {
          y: {
            ticks: { font: { family: "Poppins" } },
            beginAtZero: true
          },
        },
        elements: { point: { radius: 3 } }
      },
    });
  });
</script>

<canvas class="m-2" id="myChart" />