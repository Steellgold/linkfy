import type { ComponentPropsWithoutRef } from "react";

export type CardProps = ComponentPropsWithoutRef<"div"> & {
  size?: "sm" | "md" | "lg" | "xl";
};