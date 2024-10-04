"use client";

import { GetLinksType } from "@/lib/actions/organization/workspace.types";
import { Check, Copy, CornerDownRight, EllipsisVertical, Hourglass, MousePointerClick, PencilLine, QrCode, Trash } from "lucide-react";
import { LinkTag } from "./link-tag";
import { cloneElement, ReactElement, useState } from "react";
import { toast } from "sonner";
import { dayJS } from "@/lib/day-js";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Component } from "../component";
import { Favicon } from "../favicon";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import Link from "next/link";

const ACTIONS: Record<string, {
  action: () => void,
  icon: ReactElement,
  isDanger?: boolean,
}> = {
  "Edit": {
    action: () => console.log("Edit"),
    icon: <PencilLine />,
  },
  "Generate QR Code": {
    action: () => console.log("Generate QR Code"),
    icon: <QrCode />,
  },
  "Copy": {
    action: () => console.log("Copy"),
    icon: <Copy />,
  },
  "Delete": {
    action: () => console.log("Delete"),
    icon: <Trash />,
    isDanger: true,
  },
};

type LinkCardProps = {
  userOptions: {
    showTags?: boolean;
    showExpires?: boolean;
    showCreatedAt?: boolean;
    showCreatedBy?: boolean;
    showNote?: boolean;
  } 
} & GetLinksType;

export const LinkCard: Component<LinkCardProps> = ({ userOptions, createdAt, createdBy, expires, note, ogUrl, toUrl, tags, }) => {
  return (
    <Card className="p-1 transition-colors duration-200 ease-in-out hover:dark:bg-[#030b1f] hover:bg-[#f9f9f9] hover:dark:border-primary/50 hover:border-primary/10 hover:shadow-md">
      <CardContent className="p-3 flex flex-row justify-between items-center">
        <div className="flex flex-row gap-3 min-w-0 items-center">
          <div className="hidden sm:flex bg-border w-8 h-8 p-[5.5px] rounded-full items-center justify-center">
            <Favicon url={ogUrl || null} />
          </div>

          <div className="flex flex-col gap-2 min-w-0 flex-1 overflow-hidden">
            <CardTitle className="font-semibold flex items-center gap-1">

              <Link href={toUrl || ""} className="truncate">
                {toUrl}
              </Link>

              <div className="flex items-center gap-1 flex-shrink-0">
                <CopyShortLink shortUrl={toUrl || ""} />
              </div>
            </CardTitle>

            <CardDescription className="flex items-center gap-1 text-muted-foreground text-sm w-full -mt-2 overflow-hidden">
              <CornerDownRight className="h-4 w-4 mr-0.5 flex-shrink-0" />
              <Link href={ogUrl || ""} className="truncate">
                {ogUrl}
              </Link>
            </CardDescription>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"} size={"icon"} className="flex-shrink-0">
              <EllipsisVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent side="bottom">
            {Object.entries(ACTIONS).map(([key, { action, icon, isDanger }], index, array) => (
              <>
                {index === array.length - 1 && <DropdownMenuSeparator />}
                <DropdownMenuItem key={key} onClick={action} className={cn({ "text-red-500": isDanger })}>
                  <span className="flex items-center gap-2">
                  {cloneElement(icon, { className: "h-4 w-4" })}
                  {key}
                  </span>
                </DropdownMenuItem>
              </>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>        
      </CardContent>

      <CardFooter className={cn("hidden", {
        "block -mt-5 p-3": (
          (expires && userOptions.showExpires) ||
          (tags.length > 0 && userOptions.showTags) ||
          (createdAt && userOptions.showCreatedAt) ||
          (createdBy && userOptions.showCreatedBy) ||
          (note && userOptions.showNote)
        )
      })}>
        <div className="flex flex-col">
          <div className="flex flex-row flex-wrap gap-1 mt-2 items-center">
            {userOptions.showCreatedBy && (
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="order-last flex flex-row gap-1 bg-primary/10 dark:bg-border rounded-full p-1">
                      <img src={createdBy?.user.image || ""} alt={createdBy?.user.name || "Profile Picture"} className="w-6 h-6 rounded-full" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="flex flex-col p-0.5">
                      <span className="font-semibold text-sm">{createdBy?.user.name}</span>
                      <span className="text-xs text-muted">{dayJS(createdAt).format("MMM DD, YYYY [at] HH:mm")}</span>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {tags && userOptions.showTags && tags.length > 0 && tags.map((tag, index) => (
              <LinkTag key={index} {...tag} />
            ))}

            <span className="px-2 py-1 rounded-md text-xs font-semibold border-2 flex items-center gap-0.5">
              <MousePointerClick className="h-4 w-4" />
              {Math.floor(Math.random() * 1000)} <span className="hidden sm:block">clicks</span>
            </span>
          </div>

          {expires && userOptions.showExpires && (
            <div className="flex flex-row items-center gap-1 mt-2 text-muted-foreground text-sm">
              <Hourglass className="h-4 w-4 mr-1" />
              This link expires on {dayJS(expires).format("MMM DD, YYYY [at] HH:mm")}
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

const CopyShortLink = ({ shortUrl }: { shortUrl: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  if (copied) {
    return (
      <button className="bg-primary/10 dark:bg-border rounded-full pointer-events-none cursor-not-allowed p-1">
        <Check className="h-3.5 w-3" />
      </button>
    )
  }

  return (
    <button className="bg-primary/10 dark:bg-border rounded-full p-1" onClick={copyToClipboard}>
      <Copy className="h-3.5 w-3" />
    </button>
  );
}

{/* const ExpireTag = ({ expires }: { expires: string }) => {
  return (
    <div className="px-2 py-1 rounded-md text-xs font-semibold border-2 flex items-center gap-0.5 bg-secondary/10 dark:bg-secondary/50">
      <CalendarClock className="h-3 w-3 mr-1" />
      {dayJS(expires).format("MMM DD, YYYY [at] HH:mm")}
    </div>
  );
} */}