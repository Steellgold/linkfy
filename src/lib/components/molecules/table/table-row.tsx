import type { Component } from "#/lib/utils/component";
import type { TableRowProps } from "./table.type";

export const TableRow: Component<TableRowProps> = ({ children, ...props }) => {
  return (
    <tr {...props}>
      {children}
    </tr>
  );
};