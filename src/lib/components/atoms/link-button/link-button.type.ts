import type { ComponentPropsWithoutRef, ReactElement } from "react";
import type { IconType } from "react-icons";
import type { LinkProps } from "next/link";

export type LinkButtonProps = LinkProps & ComponentPropsWithoutRef<"a"> & {
  variant?: "primary" | "danger" | "success" | "pro" | "white" | "black";
  fulled?: boolean;
  disabled?: boolean;
  icon?: {
    icon: ReactElement<IconType>;
    position?: "left" | "right";
  };
};