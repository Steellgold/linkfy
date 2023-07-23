import type { Component } from "#/lib/utils/component";
import type { TableProps } from "./table.type";
import clsx from "clsx";

export const Table: Component<TableProps> = ({ children, className, ...props }) => {
  return (
    <table className={clsx(
      "w-full text-sm text-left text-gray-400",
      className
    )} {...props}>
      {children}
    </table>
  );
};