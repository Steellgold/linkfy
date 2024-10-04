"use client";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Component } from "./component";
import { GetLinksType } from "@/lib/actions/organization/workspace.types";
import { CalendarClock, Check, Copy, CornerDownRight } from "lucide-react";
import { Favicon } from "./favicon";
import { LinkTag } from "./link-tag";
import { useState } from "react";
import { toast } from "sonner";
import { dayJS } from "@/lib/day-js";
import { cn } from "@/lib/utils";

export const LinkCard: Component<GetLinksType> = ({ createdAt, createdBy, expires, note, ogUrl, toUrl, tags, }) => {
  return (
    <Card className="p-1 transition-colors duration-200 ease-in-out cursor-pointer hover:dark:bg-[#030b1f] hover:bg-[#f9f9f9] hover:dark:border-primary/50 hover:border-primary/10 hover:shadow-md">
      <CardHeader className="p-3">
        <div className="flex flex-row gap-3 items-center">
          <div className="hidden sm:flex bg-border w-8 h-8 p-[5.5px] rounded-full items-center justify-center">
            <Favicon url={ogUrl || null} />
          </div>

          <div className="flex flex-col gap-2 min-w-0 flex-1">
            <CardTitle className="font-semibold flex items-center gap-1">
              <span className="truncate">{toUrl}</span>
              <div className="flex items-center gap-1 flex-shrink-0">
                <span className="hidden sm:block">
                  {expires && <ExpireTag expires={expires.toDateString()} />}
                </span>
                <CopyShortLink shortUrl={toUrl || ""} />
              </div>
            </CardTitle>

            <CardDescription className="flex items-center gap-1 text-muted-foreground text-sm w-full -mt-2">
              <CornerDownRight className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="truncate">
                {ogUrl}
              </span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardFooter className={cn("hidden", {
        "block -mt-5 p-3": expires || tags
      })}>
        <div className="flex flex-row flex-wrap gap-1 mt-2 items-center">
          <span className="sm:hidden order-last">
            {expires && <ExpireTag expires={expires.toDateString()} />}
          </span>
          {tags && tags.length > 0 && tags.map((tag, index) => (
            <LinkTag key={index} {...tag} />
          ))}
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

const ExpireTag = ({ expires }: { expires: string }) => {
  return (
    <div className="px-2 py-1 rounded-md text-xs font-semibold border-2 flex items-center gap-0.5">
      <CalendarClock className="h-3 w-3 mr-1" />
      {dayJS(expires).format("MMM DD, YYYY [at] HH:mm")}
    </div>
  );
}