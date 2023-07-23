import type { Component } from "#/lib/utils/component";
import type { TableHeadCellProps } from "./table.type";
import clsx from "clsx";

export const TableHeadCell: Component<TableHeadCellProps> = ({ children, className, srOnly, ...props }) => {
  return (
    <th scope="col" className={clsx(
      "px-6 py-3",
      { "sr-only": srOnly },
      className
    )} {...props}>
      {children}
    </th>
  );
};