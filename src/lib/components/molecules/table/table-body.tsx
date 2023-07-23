import type { Component } from "#/lib/utils/component";
import type { TableBodyProps } from "./table.type";

export const TableBody: Component<TableBodyProps> = ({ children, ...props }) => {
  return (
    <tbody {...props}>
      {children}
    </tbody>
  );
};