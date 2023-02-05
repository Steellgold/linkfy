export { default as Input } from "./input.svelte";

export interface InputProps {
  type?: "text" | "email" | "password" | "url";
  placeholder?: string;
  value?: string;
  label?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  tip?: string;

  id?: string;
  name?: string;

  size: "small" | "medium" | "large";
  width: "full" | "auto";
}

export const sizeClass = {
  small: "text-sm",
  medium: "text-base",
  large: "text-lg"
};

export const widthClass = {
  full: "w-full",
  auto: "w-auto"
};

export const disabledClass = {
  true: "text-gray-300 placeholder-gray-500",
  false: "text-white placeholder-gray-400"
};
