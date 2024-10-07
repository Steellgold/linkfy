"use client";

import { Archive, Calendar, Copy, CornerDownRight, EllipsisVertical, Hourglass, MousePointerClick, PencilLine, QrCode, RemoveFormatting, ScissorsLineDashed, Trash } from "lucide-react";
import { LinkTag } from "./link-tag";
import { dayJS, simplifyDate } from "@/lib/day-js";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Component } from "../component";
import { Favicon } from "../favicon";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import Link from "next/link";
import { useModalStatus } from "../hooks/use-modal";
import { ModalIds } from "../modals/modal-ids";
import { GetLinkType } from "@/lib/actions/link/link.types";
import { toast } from "sonner";
import { DisplayOptions } from "@/app/(workspace)/section.links";

type LinkCardProps = {
  displayOptions: DisplayOptions;
} & GetLinkType;

export const LinkCard: Component<LinkCardProps> = ({ displayOptions, createdAt, createdBy, expires, note, original_url, shortened_url, tags, archived, id }) => {
  const { openModal, setModalData } = useModalStatus();

  return (
    <Card className="p-1 transition-colors duration-200 ease-in-out hover:dark:bg-[#030b1f] hover:bg-[#f9f9f9] hover:dark:border-primary/50 hover:border-primary/10 hover:shadow-md">
      <CardContent className="p-3 flex flex-row justify-between items-center">
        <div className="flex flex-row gap-3 min-w-0 items-center">
          {displayOptions.favicons && (
            <div className="hidden sm:flex bg-border w-8 h-8 p-[5.5px] rounded-full items-center justify-center">
              <Favicon url={original_url || null} />
            </div>
          )}

          <div className="flex flex-col gap-2 min-w-0 flex-1 overflow-hidden">
            <CardTitle className="font-semibold flex items-center gap-2">
              <span className="truncate flex items-center gap-2">
                {shortened_url}
              </span>
            </CardTitle>

            <div className="flex flex-col gap-1 w-full">
              <CardDescription className="flex items-center gap-1 text-muted-foreground text-sm w-full -mt-2 overflow-hidden">
                <CornerDownRight className="h-4 w-4 mr-0.5 flex-shrink-0" />
                <Link href={original_url || ""} className="truncate">
                  {original_url}
                </Link>
              </CardDescription>
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"} size={"icon"} className="flex-shrink-0">
              <EllipsisVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent side="left">
            <DropdownMenuItem>
              <span className="flex items-center gap-2">
                <PencilLine className="h-4 w-4" />
                Edit
              </span>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <span className="flex items-center gap-2">
                <QrCode className="h-4 w-4" />
                Generate QR Code
              </span>
            </DropdownMenuItem>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    onClick={() => {
                      navigator.clipboard.writeText(shortened_url || "");
                      toast.success("Shortened URL copied to clipboard");
                    }}
                  >
                    <ScissorsLineDashed className="mr-2 h-4 w-4" />
                    <span>Shortened URL</span>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem
                    onClick={() => {
                      navigator.clipboard.writeText(original_url || "");
                      toast.success("Original URL copied to clipboard");
                    }}
                  >
                    <RemoveFormatting className="mr-2 h-4 w-4" />
                    <span>Original URL</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            
            <DropdownMenuSeparator />
            
            {archived ? (
              <DropdownMenuItem onClick={() => {
                setModalData({ linkId: id });
                openModal(ModalIds.LINK_UNARCHIVE_CONFIRM);
              }}>
                <span className="flex items-center gap-2">
                  <Archive className="h-4 w-4" />
                  Unarchive
                </span>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onClick={() => {
                  setModalData({ linkId: id });
                  openModal(ModalIds.LINK_ARCHIVE_CONFIRM);
                }}
              >
                <span className="flex items-center gap-2">
                  <Archive className="h-4 w-4" />
                  Archive
                </span>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem
              onClick={() => {
                setModalData({ linkId: id });
                openModal(ModalIds.LINK_DELETE_CONFIRM);
              }}
            >
              <span className="flex items-center gap-2 text-destructive">
                <Trash className="h-4 w-4" />
                Delete
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>        
      </CardContent>

      <CardFooter className={cn("hidden", {
        "block -mt-5 p-3": (
          (expires && displayOptions.expires) ||
          (tags.length > 0 && displayOptions.tags) ||
          (createdAt && displayOptions.createdAt) ||
          (createdBy && displayOptions.createdBy) ||
          (note && displayOptions.notes)
        )
      })}>
        <div className="flex flex-col">
          <div className="flex flex-row flex-wrap gap-1 mt-2 items-center">
            {displayOptions.createdBy && createdBy && (
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="order-last flex flex-row gap-1 bg-primary/10 dark:bg-border rounded-full p-1">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
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
            
            {displayOptions.archived && archived && (
              <span className="px-2 py-1 rounded-md text-xs font-semibold bg-destructive/60 text-white border-destructive/40 border-2 flex items-center gap-0.5">
                <Archive className="h-3 w-3" />
              </span>
            )}

            {displayOptions.clicks && (
              <span className="px-2 py-1 rounded-md text-xs font-semibold border-2 flex items-center gap-0.5">
                <MousePointerClick className="h-4 w-4" />
                {Math.floor(Math.random() * 1000)} <span className="hidden sm:block">clicks</span>
              </span>
            )}

            {displayOptions.createdAt && createdAt && (
              <span className="px-2 py-1 rounded-md text-xs font-semibold border-2 flex items-center gap-0.5">
                <Calendar className="h-3 w-3 mr-1" />
                {simplifyDate(createdAt)}
              </span>
            )}

            {expires && displayOptions.expires && (
              <span className="px-2 py-1 rounded-md text-xs font-semibold border-2 flex items-center gap-0.5">
                <Hourglass className="h-4 w-4 mr-1" />
                Expires in {dayJS(expires).format("MMM DD, YYYY")}
              </span>
            )}

            {tags && displayOptions.tags && tags.length > 0 && tags.map((tag, index) => (
              <LinkTag key={index} {...tag} />
            ))}
          </div>

          {/* {expires && displayOptions.expires && (
            <div className="flex">
              <div className="flex flex-row items-center gap-1 mt-2 text-muted-foreground text-sm">
                <Hourglass className="h-4 w-4 mr-1" />
                <span>Expires in {dayJS(expires).format("MMM DD, YYYY")}</span>
              </div>
            </div>
          )} */}
        </div>
      </CardFooter>
    </Card>
  );
}