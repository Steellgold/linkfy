import type { LinkButtonProps } from "./link-button.type";
import { forwardRef } from "react";
import Link from "next/link";
import clsx from "clsx";

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(({
  className, children, fulled, variant, disabled, icon, ...props }, ref) => {
  return <Link
    ref={ref}
    className={clsx(
      "flex items-center justify-center px-4 py-2 rounded-md transition duration-300 ease-in-out focus:outline-none",
      {
        "text-white bg-blue-600 hover:bg-blue-700 focus:bg-blue-700": !variant || variant == "primary",
        "text-black bg-gray-100 hover:bg-gray-50 focus:bg-gray-50": variant == "white",
        "text-white bg-gray-950 hover:bg-gray-900 focus:bg-gray-900": variant == "black",
        "text-black pro-button": variant == "premium",
        "text-black free-button": variant == "free",
        "text-white bg-red-600 hover:bg-red-500 focus:bg-red-500": variant == "danger",
        "text-white bg-green-800 hover:bg-green-700 focus:bg-green-700": variant == "success",
        "w-full": fulled,
        "opacity-50 cursor-not-allowed": disabled
      },
      "transition-colors duration-200",
      className
    )}
    {...props}
  >
    {icon?.icon && !icon?.position && (
      <> {icon.icon}
          &nbsp;
      </>
    )}

    {icon?.position == "left" && (
      <>
        {icon.icon}
          &nbsp;
      </>
    )}
    {children}
    {icon?.position == "right" && (
      <>
          &nbsp;
        {icon.icon}
      </>
    )}
  </Link>;
});

LinkButton.displayName = "LinkButton";