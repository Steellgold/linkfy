import { Component } from "@/components/component";
import { PropsWithChildren, ReactElement } from "react";
import { WorkspaceLinks } from "./workspace.links";

type LayoutProps = {
  header?: string;
  subheader?: string;
  actions?: ReactElement;
  mobileAction?: ReactElement;
} & PropsWithChildren;

export const WorkspaceLayout: Component<LayoutProps> = ({ header, subheader, children, actions, mobileAction }) => {
  return (
    <div className="flex flex-col h-full">
      <WorkspaceLinks />

      <div className="flex items-center justify-between p-2 border-gray-200 dark:border-gray-800">
        <div>
          <h1 className="text-2xl font-semibold">{header}</h1>
          {subheader && <p className="text-gray-500">{subheader}</p>}
        </div>

        <div className="hidden sm:block sm:flex sm:flex-row gap-1.5">
          {actions}
          {mobileAction}
        </div>

        <div className="block sm:hidden">{mobileAction}</div>
      </div>

      <div className="sm:hidden flex flex-col sm:flex-row sm:items-center justify-between p-2 border-gray-200 dark:border-gray-800">
        {actions}
      </div>

      <div className="flex-1 overflow-y-auto mt-2">
        {children}
      </div>
    </div>
  );
};