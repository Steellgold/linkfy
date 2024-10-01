import { PropsWithChildren, ReactElement } from "react";
import { Component } from "./component";
import { Loader2 } from "lucide-react";

export const Loading: Component<PropsWithChildren & {
  isLoading: boolean,
  icon?: ReactElement
}> = ({ children, isLoading, icon }) => {
  return (
    <div className="flex justify-center items-center">
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          {children}
        </div>
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </div>
  );
}