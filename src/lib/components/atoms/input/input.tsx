import type { Component } from "#/lib/utils/component";
import clsx from "clsx";
import type { InputProps } from "./input.type";

export const Input: Component<InputProps> = ({ type, name, placeholder, disabled, className, ...props }) => {
  return (
    <input
      className={clsx(
        "border",
        "rounded-lg block p-2.5 border-gray-600  placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
        "border-gray-600 bg-gray-700 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
        {
          "text-white bg-gray-700": !disabled,
          "text-gray-400 bg-gray-700 cursor-not-allowed": disabled
        },
        className
      )}
      type={type}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      {...props}
    />
  );
};