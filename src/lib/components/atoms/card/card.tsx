import type { Component } from "#/lib/utils/component";
import type { CardProps } from "./card.type";

export const Card: Component<CardProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center mx-auto px-3 py-4 lg:py-0">
      <div className="w-full rounded-lg border-2 p-4 shadow md:mt-0 sm:max-w-md border-gray-700 bg-gray-800 sm:p-5">
        {children}
      </div>
    </div>
  );
};