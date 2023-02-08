export { default as Button } from "./button.svelte";
export { default as Link } from "./link.svelte";

export interface ButtonProps {
  type?: "button" | "submit";
  disabled?: boolean;
  size: "ultrasmall" | "small" | "medium" | "large";
  variant: "blue" | "red" | "pro" | "action" | "gray"
  withIcon?: boolean;
}

export interface LinkProps {
  href: string;
  size: "ultrasmall" | "small" | "medium" | "large";
  variant: "blue" | "red" | "pro" | "action" | "gray"
  withIcon?: boolean;
}

export const colorClass = {
  blue: "bg-blue-600 hover:bg-blue-700",
  red: "bg-red-600 opacity-80 hover:bg-red-700 hover:opacity-90",
  pro: "bg-pro-300 hover:bg-pro-400",
  action: "bg-transparent",
  gray: "bg-gray-600 hover:bg-gray-500"
};

export const sizeClass = {
  ultrasmall: "px-2 py-1 text-xxs",
  small: "px-3 py-2 text-xs",
  medium: "px-5 py-2.5 text-sm",
  large: "w-full px-5 py-2.5 text-sm"
};