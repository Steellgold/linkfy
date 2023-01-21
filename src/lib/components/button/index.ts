export { default as Button } from "./button.svelte";
export { default as RedirectButton } from "./redirect.svelte";
export { default as CopyButton } from "./copy.svelte";

export type Variant = "red" | "blue" | "green" | "yellow" | "pro";

export interface ButtonProps {
  disabled?: boolean;
  size?: "small" | "default" | "large";
  variant?: Variant;
  hidden?: boolean;
}