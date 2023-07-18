import type { Component } from "#/lib/utils/component";
import { RiMotorbikeFill } from "react-icons/ri";
import type { PropsWithChildren } from "react";
import clsx from "clsx";

const UserLayout: Component<PropsWithChildren> = ({ children }) => {
  return (
    <div className="mt-2">
      {children}

      <a href="/history" className="flex text-blue-600 hover:text-blue-500 gap-2 justify-center p-4 items-center group">
        Ride to the history

        <RiMotorbikeFill
          size={20}
          className={clsx(
            "group-hover:rotate-45 group-hover:-translate-x-[10rem] transition-transform",
            "duration-1000 ease-in-out translate-x-0 -scale-x-100"
          )}
        />
      </a>
    </div>
  );
};

export default UserLayout;