import type { ComponentPropsWithoutRef } from "react";

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "danger" | "success" | "pro" | "white" | "black";
  fulled?: boolean;
};