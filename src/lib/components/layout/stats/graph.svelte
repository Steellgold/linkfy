<script lang="ts">
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  export let data: { label: string; count: number, country: string }[];

  let chart: Chart;

  onMount(() => {
    const ctx = (document.getElementById("myChart") as HTMLCanvasElement).getContext("2d") as CanvasRenderingContext2D;

    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((d) => d.label),
        datasets: [{
            label: "Clicks this day",
            data: data.map((d) => d.count),
            fill: { target: "origin", above: "rgba(48, 82, 161, 0.2)" },
            borderColor: "#3052a1",
            borderWidth: 4,
            tension: 0.4
          }
        ],
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