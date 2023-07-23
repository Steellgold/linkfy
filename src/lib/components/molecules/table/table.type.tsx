import type { ComponentPropsWithRef, ReactElement } from "react";
import type { IconType } from "react-icons";

export type TableColumnProps = ComponentPropsWithRef<"th"> & {
  title: string;
  icon?: ReactElement<IconType>;
};

export type TableHeadCellProps = ComponentPropsWithRef<"th"> & { srOnly?: boolean}
export type TableDataCellProps = ComponentPropsWithRef<"td"> & { first?: boolean }
export type TableRowProps = ComponentPropsWithRef<"tr">;
export type TableBodyProps = ComponentPropsWithRef<"tbody">;
export type TableProps = ComponentPropsWithRef<"table">;

export type TableButtonCopyProps = ComponentPropsWithRef<"svg"> & {
  valueToCopy: string;
};

export type TableButtonLinkProps = ComponentPropsWithRef<"link"> & {
  icon: ReactElement<IconType>;
};