export { default as Button } from "./button.svelte";
export { default as ButtonLink } from "./button-link.svelte";

export type ButtonProps = {
  type?: "button" | "submit";
  size: "xs" | "sm" | "md" | "lg";
  variant: "blue" | "red" | "pro" | "action" | "gray";
  disabled: boolean;
  href?: string;
  full?: boolean;
}

export const Variants = {
  blue: "bg-blue-600 hover:bg-blue-700",
  red: "bg-red-600 opacity-80 hover:bg-red-700 hover:opacity-90",
  pro: "bg-pro-300 hover:bg-pro-400",
  action: "bg-transparent",
  gray: "bg-gray-600 hover:bg-gray-500"
};

export const SizeClasses = {
  xs: "px-2 py-1 text-xxs",
  sm: "px-3 py-2 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-4 py-2 text-base"
};