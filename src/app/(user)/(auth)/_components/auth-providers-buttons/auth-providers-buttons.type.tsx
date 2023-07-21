import type { ComponentPropsWithoutRef } from "react";

export type AuthProvidersButtonProps = ComponentPropsWithoutRef<"div"> & {
  withSeparator?: boolean;
  textSeparator?: string;
};