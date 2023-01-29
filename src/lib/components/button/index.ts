export { default as Button } from "./button.svelte";
export { default as Link } from "./link.svelte";

export interface ButtonProps {
  type?: "button" | "submit",
  disabled?: boolean,
  size: "small" | "medium" | "large",
  variant: "blue" | "red" | "pro",
  withIcon?: boolean
}

export interface LinkProps {
  href: string,
  size: "small" | "medium" | "large",
  variant: "blue" | "red" | "pro",
  withIcon?: boolean
}

export const colorClass = {
  "blue": "bg-blue-600 hover:bg-blue-700 focus:ring-blue-800",
  "red": "bg-red-600 hover:bg-red-700 focus:ring-red-800",
  "pro": "bg-pro-600 hover:bg-pro-700 focus:ring-pro-800"
};

export const sizeClass = {
  "small": "px-3 py-2 text-xs",
  "medium": "px-5 py-2.5 text-sm",
  "large": "w-full px-5 py-2.5 text-sm"
};