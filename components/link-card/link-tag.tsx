import { Color } from "@prisma/client";
import { LinkTag as LinkTagType } from "@/lib/actions/workspace/workspace.types";
import { cn } from "@/lib/utils";
import { Tag } from "lucide-react";
import { Component } from "../component";

const colorClasses: Record<Color, string> = {
  [Color.RED]: "bg-red-500/60 dark:bg-red-500/50 text-white hover:bg-red-500/50 dark:hover:bg-red-500/40 border-red-500",
  [Color.ORANGE]: "bg-orange-500/60 dark:bg-orange-500/50 text-white hover:bg-orange-500/50 dark:hover:bg-orange-500/40 border-orange-500",
  [Color.YELLOW]: "bg-yellow-500/60 dark:bg-yellow-500/50 text-white hover:bg-yellow-500/50 dark:hover:bg-yellow-500/40 border-yellow-500",
  [Color.GREEN]: "bg-green-500/60 dark:bg-green-500/50 text-white hover:bg-green-500/50 dark:hover:bg-green-500/40 border-green-500",
  [Color.BLUE]: "bg-blue-500/60 dark:bg-blue-500/50 text-white hover:bg-blue-500/50 dark:hover:bg-blue-500/40 border-blue-500",
  [Color.INDIGO]: "bg-indigo-500/60 dark:bg-indigo-500/50 text-white hover:bg-indigo-500/50 dark:hover:bg-indigo-500/40 border-indigo-500",
  [Color.VIOLET]: "bg-violet-500/60 dark:bg-violet-500/50 text-white hover:bg-violet-500/50 dark:hover:bg-violet-500/40 border-violet-500",
  [Color.BLACK]: "bg-black/60 dark:bg-black/50 text-white hover:bg-black/50 dark:hover:bg-black/40 border-black",
  [Color.BROWN]: "bg-[#654321]/60 dark:bg-[#654321]/50 text-white hover:bg-[#654321]/50 dark:hover:bg-[#654321]/40 border-[#654321]",
  [Color.MAGENTA]: "bg-[#ff00ff]/60 dark:bg-[#ff00ff]/50 text-white hover:bg-[#ff00ff]/50 dark:hover:bg-[#ff00ff]/40 border-[#ff00ff]",
};

export const LinkTag: Component<LinkTagType> = ({ name, color }) => {
  return (
    <div className={cn(
      "px-1 sm:px-2 py-1 rounded-md text-xs font-semibold border-2 flex items-center gap-0.5",
      colorClasses[color]
    )}>
      <Tag className={cn("h-3 w-3 sm:mr-1")} />
      <span className="hidden sm:block">{name}</span>
    </div>
  );
};
