export { default as Input } from "./input.svelte";

export interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  label?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  autofocus?: boolean;

  id?: string;
  name?: string;

  size: "small" | "medium" | "large";
  width: "full" | "auto";
}

export const sizeClass = {
  "small": "text-sm",
  "medium": "text-base",
  "large": "text-lg"
};

export const widthClass = {
  "full": "w-full",
  "auto": "w-auto"
};