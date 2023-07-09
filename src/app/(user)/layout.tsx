import type { Component } from "#/lib/utils/component";
import type { PropsWithChildren } from "react";
import { RiMotorbikeFill } from "react-icons/ri";
import clsx from "clsx";

const UserLayout: Component<PropsWithChildren> = ({ children }) => {
  return (
    <div className="mt-2">
      {children}

      <a href="/" className="flex text-blue-600 hover:text-blue-500 gap-2 justify-center p-4 items-center group">
        Ride to the home

        <RiMotorbikeFill
          size={20}
          className={clsx(
            "group-hover:rotate-45 group-hover:-translate-x-[9.7rem] transition-transform",
            "duration-1000 ease-in-out translate-x-0 -scale-x-100"
          )}
        />
      </a>
    </div>
  );
};

export default UserLayout;