export { default as Toggle } from "./toggle.svelte";

export interface ToggleProps {
  label: string;
  disabled?: boolean;
  checked?: boolean;
}

export const sizeClass = {
  small: "text-sm",
  medium: "text-base",
  large: "text-lg"
};

export const disabledClass = {
  true: "text-gray-300",
  false: "text-white"
};

export const checkedClass = {
  true: "bg-blue-600",
  false: "bg-gray-600"
};