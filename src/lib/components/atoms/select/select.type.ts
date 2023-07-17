import type { ComponentPropsWithoutRef } from "react";

export type SelectProps = ComponentPropsWithoutRef<"select"> & {
  premiumIndicator?: boolean;
  label?: string;
  options: {
    value: string;
    label: string;
    disabled?: boolean;
  }[];
};