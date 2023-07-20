import type { ComponentPropsWithoutRef, ReactElement } from "react";
import type { IconType } from "react-icons";

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "danger" | "success" | "premium" | "free" | "white" | "black" | "transparent" | "discord";
  fulled?: boolean;
  icon?: {
    icon: ReactElement<IconType>;
    position?: "left" | "right";
  };
};