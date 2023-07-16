"use client";

import type { Component } from "#/lib/utils/component";
import type { LinksBarProps } from "./links-bar.type";
import { Text } from "#/lib/components/atoms/text";
import { useMediaQuery } from "usehooks-ts";
import { cloneElement } from "react";
import Link from "next/link";
import clsx from "clsx";

export const LinksBar: Component<LinksBarProps> = ({ items }) => {
  const matches = useMediaQuery("(min-width: 640px)");
  const currentPath = window.location.pathname.split("/");
  console.log(currentPath);

  return (
    <nav className="flex items-center px-4 max-w-screen-xl mx-auto">
      <div className={clsx(
        "flex items-center gap-3",
        { "flex-col w-full": !matches }
      )}>
        {items.map(({ icon, title, path }) => (
          <Link key={path} href={currentPath[1] + "/stats/" + path} as={path} className={clsx(
            "flex items-center gap-2 text-gray-300 bg-gray-800 hover:text-gray-400 transition-colors duration-200",
            "p-2 rounded-md hover:bg-gray-900 w-full whitespace-nowrap",
            {
              "bg-gray-950": currentPath[3] === path
            }
          )}>
            {cloneElement(icon, { size: 20 })}
            <Text className="text-sm">{title}</Text>
          </Link>
        ))}
      </div>
    </nav>
  );
};