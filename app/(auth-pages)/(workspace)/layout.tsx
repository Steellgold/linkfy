import { Component } from "@/components/component";
import { PropsWithChildren, ReactElement } from "react";

type LayoutProps = {
  header?: string;
  subheader?: string;
  end: ReactElement;
  mobileActions?: ReactElement;
} & PropsWithChildren;

export const WorkspaceLayout: Component<LayoutProps> = ({ header, subheader, children, end, mobileActions }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 border-gray-200 dark:border-gray-800">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">{header}</h1>
          <p className="text-gray-500">{subheader}</p>
        </div>
        <div className="hidden sm:block">
          {mobileActions}
        </div>
      </div>

      <div className="block sm:hidden sm:mb-2 mt-1 w-full">
        {mobileActions}
      </div>

      <div className="flex-1 overflow-y-auto mt-2">
        {children}
      </div>
    </div>
  );
}