import type { Component } from "#/lib/utils/component";
import type { CardProps } from "./card.type";
import clsx from "clsx";

export const Card: Component<CardProps> = ({ children, size }) => {
  return (
    <div className="flex flex-col items-center mx-auto px-3 py-4 lg:py-0">
      <div className={clsx(
        "w-full rounded-lg border-2 p-4 shadow md:mt-0 border-gray-700 bg-gray-800 sm:p-5",
        {
          "sm:max-w-md": size == "sm" || !size,
          "sm:max-w-[29rem]": size == "sm2",
          "sm:max-w-xl": size == "md",
          "sm:max-w-2xl": size == "lg",
          "sm:max-w-3xl": size == "xl"
        }
      )}>
        {children}
      </div>
    </div>
  );
};