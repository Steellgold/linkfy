import type { Component } from "#/lib/utils/component";
import type { TableDataCellProps } from "./table.type";
import clsx from "clsx";

export const TableDataCell: Component<TableDataCellProps> = ({ children, className, first, ...props }) => {
  return (
    <td scope="row" className={clsx(
      "px-6 py-4",
      { "font-medium whitespace-nowrap text-white": first },
      className
    )} {...props}>
      {children}
    </td>
  );
};