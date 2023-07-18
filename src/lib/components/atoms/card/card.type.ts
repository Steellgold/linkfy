import type { ComponentPropsWithoutRef } from "react";

export type CardProps = ComponentPropsWithoutRef<"div"> & {
  size?: "sm" | "sm2" | "md" | "lg" | "xl";
};