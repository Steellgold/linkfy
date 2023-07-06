import type { Component } from "#/lib/utils/component";
import type { TextProps } from "./text.type";
import clsx from "clsx";

export const Text: Component<TextProps> = ({ className, children, ...props }) => {
  return <p className={clsx("text-gray", className)} {...props}>{children}</p>;
};