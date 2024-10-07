"use client";

import { cn } from "@/lib/utils";
import { AlignVerticalDistributeCenter, ChartColumn, Rows3, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";

const navItems = [
  { name: 'Links', href: '', icon: <Rows3 className="h-4 w-4" /> },
  { name: 'Settings', href: '/settings', icon: <Settings className="h-4 w-4" /> }
]

export const WorkspaceLinks = (): ReactElement => {
  const path = usePathname();
  const page = path.split("/")[0];

  return (
    <div>
      <ul className="flex flex-row gap-2 text-sm font-medium text-center text-gray-500">
        {navItems.map((item) => (
          <li key={item.name} className="flex items-center">
            <Link href={item.href} className={cn(
              "p-2 flex items-center gap-1.5 rounded-md text-muted-foreground hover:bg-primary/5 hover:dark:bg-primary/5 hover:text-primary",
            {
              "border-b-2 hover:border-primary": item.href === page
            })}>
              {item.icon}
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}