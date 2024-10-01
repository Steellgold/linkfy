import { ReactElement } from "react";

export const AppBar = (): ReactElement => {
  return (
    <div className="flex items-center justify-between w-full p-4">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold">Linkfy</h1>
      </div>
    </div>
  );
}