"use client";

import type { TableButtonCopyProps } from "../table.type";
import type { Component } from "#/lib/utils/component";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useCopyToClipboard } from "usehooks-ts";
import { TbCopy } from "react-icons/tb";
import { toast } from "sonner";
import clsx from "clsx";

export const TableButtonCopy: Component<TableButtonCopyProps> = ({ valueToCopy, className, ...props }) => {
  const [value, copy] = useCopyToClipboard();

  return (
    <>
      <TbCopy
        className={clsx("h-5 w-5 hover:text-white transition-colors duration-200", className)}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={async() => {
          await copy(valueToCopy);
          if (value) {
            toast("Copied to clipboard!", {
              icon: <BsFillCheckCircleFill />
            });
          }
        }}
        {...props}
      />
    </>
  );
};