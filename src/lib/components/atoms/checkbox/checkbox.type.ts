import type { ComponentPropsWithRef, PropsWithChildren } from "react";

export type CheckboxProps = ComponentPropsWithRef<"input"> & PropsWithChildren & {
  label?: string;
  error?: string;
};