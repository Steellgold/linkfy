import type { Component } from "#/lib/utils/component";
import type { CardProps } from "./card.type";
import clsx from "clsx";

export const Card: Component<CardProps> = ({ children, variant, size, className }) => {
  return (
    <div className="flex flex-col items-center mx-auto px-3">
      <div className={clsx(
        "w-full rounded-lg border-2 p-4 shadow sm:p-5",
        {
          // SIZES
          "sm:max-w-md": size == "sm" || !size,
          "sm:max-w-[29rem]": size == "sm2",
          "sm:max-w-xl": size == "md",
          "sm:max-w-2xl": size == "lg",
          "sm:max-w-3xl": size == "xl",
          // VARIANTS
          "border-gray-700 bg-gray-800": variant == "default" || !variant,
          "border-dashed bg-origin-border bg-clip-border border-gold hover:border-gold-100": variant == "premium",
          "border-dashed bg-origin-border bg-clip-border border-blue-200 hover:border-blue-300": variant == "free",
          "bg-transparent border-transparent shadow-none": variant == "disabled"
        },
        "transition-colors duration-200",
        className
      )}>
        {children}
      </div>
    </div>
  );
};