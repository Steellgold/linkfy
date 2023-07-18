import type { ComponentPropsWithoutRef } from "react";

export type InputProps = ComponentPropsWithoutRef<"input"> & {
  text?: string;
  premiumIndicator?: boolean;
  label?: string;
  error?: string;
  passwordChecker?: boolean;
};