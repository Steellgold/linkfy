import type { StatsCardRowProps } from "./stats-card.type";
import { percentage, percentageToWidth } from "#/lib/math";
import type { Component } from "#/lib/utils/component";
import { Text } from "#/lib/components/atoms/text";
import { cloneElement } from "react";
import clsx from "clsx";

export const StatsCardRow: Component<StatsCardRowProps> = ({ stats, title, ...props }) => {
  return (
    <div className="flex items-center my-1 text-sm">
      <div className="w-full relative z-10">
        <div
          className={clsx(
            "-z-10 rounded-md absolute top-0 left-0 h-full max-w-full bg-[#273345]",
          )}
          style={{ width: percentageToWidth(percentage(stats.max, stats.count)) }} />
        <div className="p-0.5 flex items-center justify-between w-full">
          <div className="flex items-center gap-1">
            {props.icon && (
              <Text className="ml-1">{cloneElement(props.icon)}</Text>
            )}
            <Text className={clsx(
              "text-gray-300",
              props.icon ? "ml-1" : "ml-2",
            )}>{title}</Text>
          </div>
          <div className="flex items-center gap-1">
            <Text className="text-gray-300">{stats.count}</Text>
            <Text className="text-gray-500">({percentage(stats.max, stats.count)}%)</Text>
          </div>
        </div>
      </div>
    </div>
  );
};