import type { StatsCardProps } from "./stats-card.type";
import { Text } from "#/lib/components/atoms/text";
import type { Component } from "#/lib/utils/component";

export const StatsCard: Component<StatsCardProps> = ({ description, title, children }) => {
  return (
    <div className="bg-gray-800 rounded-md p-4">
      <Text className="font-bold text-white text-lg">{title}</Text>
      <Text className="text-gray-500 -mt-1">{description}</Text>
      <div className="mt-2">
        {children}
      </div>
    </div>
  );
};