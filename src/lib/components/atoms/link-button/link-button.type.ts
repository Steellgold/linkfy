import type { LinkProps } from "next/link";
import type { ComponentPropsWithoutRef } from "react";

export type LinkButtonProps = LinkProps & ComponentPropsWithoutRef<"a"> & {
  variant?: "primary" | "danger" | "success" | "pro" | "white" | "black";
  fulled?: boolean;
  disabled?: boolean;
};