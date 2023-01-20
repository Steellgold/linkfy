export { default as Button } from "./button.svelte";
export { default as RedirectButton } from "./redirect.svelte";
export { default as CopyButton } from "./copy.svelte";

export interface ButtonProps {
  disabled?: boolean;
  size?: "small" | "default" | "large";
  variant?: "red" | "blue" | "green" | "yellow" | "gray" | "white" | "pro"
  hidden?: boolean;
}