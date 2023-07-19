import type { ReactElement } from "react";
import { forwardRef } from "react";
import type { ListProps } from "./list.type";
import { Text } from "../../atoms/text";
import Link from "next/link";
import clsx from "clsx";

export const List = forwardRef<HTMLUListElement, ListProps>(({ className, items, ...props }, ref): ReactElement => {
  return (
    <ul ref={ref} className={clsx(
      "flex flex-col gap-2",
      className
    )} {...props}>
      {items.map(({ name, icon, url }, index) => (
        <li key={index} className="flex gap-2">
          {icon && (
            <Text className="flex items-center gap-2 text-gray-400">
              {icon}
            </Text>
          )}

          {url && (
            <Link href={url} className="text-gray-300 text-base p-3 hover:text-gray-500 transition-colors duration-200">
              {name}
            </Link>
          ) || (
            <Text>{name}</Text>
          )}
        </li>
      ))}
    </ul>
  );
});

List.displayName = "List";