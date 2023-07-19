import type { ComponentPropsWithRef, ReactElement } from "react";
import type { IconType } from "react-icons";

export type ListProps = ComponentPropsWithRef<"ul"> & {
  variant?: "default" | "premium";
  items: {
    name: string;
    url?: string;
    icon?: ReactElement<IconType>;
  }[];
};