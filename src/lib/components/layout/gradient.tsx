"use client";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export const HomeLayoutGradient = (): React.ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const { theme } = useTheme();

  return (
    <div className={cn(
      "absolute top-[-30%] bottom-0 right-0 left-0 w-full h-[75%] skew-y-[-10deg] transform-origin-top-left overflow-hidden -z-10", {
        "bg-gradient-to-b from-[#131318] to-transparent": theme == "dark",
        "bg-gradient-to-b from-[#d6d6d6] to-transparent": theme == "light"
      }
    )} />
  );
};