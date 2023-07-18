"use client";

import type { StatsCardGraphProps } from "./stats-card.type";
import { Text } from "#/lib/components/atoms/text";
import type { Component } from "#/lib/utils/component";
import { Chart } from "chart.js/auto";
import { useEffect, useState } from "react";
import clsx from "clsx";

export const StatsCardGraph: Component<StatsCardGraphProps> = () => {
  const [chart, setChart] = useState<Chart | null>(null);

  useEffect(() => {
    setChart(new Chart("chart", {
      type: "line",
      data: {
        labels: ["01/01", "01/02", "01/03", "01/04", "01/05", "01/06"],
        datasets: [{
          data: [239, 387, 489, 566, 752, 977],
          borderColor: "#495b73",
          backgroundColor: "#495b73",
          tension: 0.4,
          fill: {
            target: "origin",
            above: "rgba(40, 51, 67, 0.4)"
          }
        }]
      },
      options: {
        plugins: { legend: { display: false } },
        maintainAspectRatio: false,
        scales: {
          y: {
            ticks: { font: { family: "Poppins" } },
            beginAtZero: true
          }
        },
        elements: { point: { radius: 3 } }
      }
    }));
  }, []);

  return (
    <div className="bg-gray-800 rounded-md p-4">
      <canvas id="chart" className={clsx(
        "w-full h-48",
        { "hidden": !chart }
      )}></canvas>
      {!chart && <Text className="text-center">Loading statistics...</Text>}
    </div>
  );
};