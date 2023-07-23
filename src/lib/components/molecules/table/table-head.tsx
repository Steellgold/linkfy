import type { Component } from "#/lib/utils/component";
import type { PropsWithChildren } from "react";

export const TableHead: Component<PropsWithChildren> = ({ children, ...props }) => {
  return (
    <thead className="text-xs uppercase bg-gray-700 text-gray-400" {...props}>
      {children}
    </thead>
  );
};