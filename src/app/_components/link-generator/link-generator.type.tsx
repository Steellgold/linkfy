import type { ComponentPropsWithoutRef } from "react";

export type LinkGeneratorTypes = ComponentPropsWithoutRef<"div"> & {
  isPremium?: boolean;
  userId?: string;
};