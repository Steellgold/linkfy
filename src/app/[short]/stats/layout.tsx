import type { LinksBarItem } from "./_components/links-bar/links-bar.type";
import type { Component } from "#/lib/utils/component";
import { LuMousePointerClick } from "react-icons/lu";
import { LinksBar } from "./_components/links-bar";
import { RiMotorbikeFill } from "react-icons/ri";
import { TbMathSymbols } from "react-icons/tb";
import type { PropsWithChildren } from "react";
import { AiFillChrome } from "react-icons/ai";
import { BsFlag } from "react-icons/bs";
import clsx from "clsx";

const UserLayout: Component<PropsWithChildren> = ({ children }) => {
  const items: LinksBarItem[] = [
    {
      icon: <LuMousePointerClick />,
      title: "Clicks and views",
      path: "clicks"
    },
    {
      icon: <BsFlag />,
      title: "Countries",
      path: "countries"
    },
    {
      icon: <TbMathSymbols />,
      title: "Operating systems",
      path: "os"
    },
    {
      icon: <AiFillChrome />,
      title: "Browsers",
      path: "browsers"
    },
    {
      icon: <RiMotorbikeFill />,
      title: "Referrers",
      path: "referrers"
    }
  ];

  return (
    <div className="mt-2">
      <LinksBar items={items} />

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