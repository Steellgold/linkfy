"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { useModalStatus } from "../hooks/use-modal";
import { QRCode } from 'react-qrcode-logo';
import { ModalIds } from "./modal-ids";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { ClipboardCopy, ImageDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type ModalData = {
  url?: string;
}

type ThemeColor = {
  name: string;
  colors: string[];
}

const themes: ThemeColor[] = [
  { name: "Default", colors: ["#FFFFFF", "#000000", "#000000"] },
  { name: "Default (Inverted)", colors: ["#000000", "#FFFFFF", "#FFFFFF"] },
  { name: "Blood", colors: ["#2c0404", "#dd2727", "#b33030"] },
  { name: "Water", colors: ["#06042c", "#283ade", "#3041b3"] },
  { name: "Lion", colors: ["#3e2b2b", "#b5651d", "#d9a566"] },
  { name: "Space", colors: ["#000000", "#1c1c1c", "#383838"] },
  { name: "Galaxy", colors: ["#1c1b33", "#5c33ff", "#7e57c2"] },
  { name: "Emerald", colors: ["#054d44", "#1abc9c", "#16a085"] },
  { name: "Meadow", colors: ["#3a5f0b", "#6b8e23", "#9acd32"] },
  { name: "Mystic", colors: ["#2b1b17", "#6e3b3b", "#b57281"] },
  { name: "Ocean Breeze", colors: ["#004f6e", "#00a0b0", "#00d9d2"] },
  { name: "Rust", colors: ["#4e1a1a", "#8b3e2f", "#d07f55"] },
  { name: "Tropic", colors: ["#006d5b", "#00a693", "#66b2a7"] },
  { name: "Obsidian", colors: ["#1c1c1c", "#2b2b2b", "#4a4a4a"] }
];


export const DialogQRCode = () => {
  const { isModalOpen, closeModal, data } = useModalStatus();
  const linkData = data as ModalData;

  const [selectedTheme, setTheme] = useState<ThemeColor>(themes[0]);

  const downloadImage = () => {
    const canvas = document.getElementById("qr-code-component") as HTMLCanvasElement | null;

    if(canvas) {
      const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl
      downloadLink.download = `your_name.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  }

  const copyImage = async () => {
    const canvas = document.getElementById("qr-code-component") as HTMLCanvasElement | null;
  
    if (canvas) {
      try {
        const dataUrl = canvas.toDataURL("image/png");
        const blob = await (await fetch(dataUrl)).blob();
  
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob })
        ]);
  
        toast.success("Your QR code has been copied to the clipboard");
      } catch (err) {
        console.error(err);
        toast.error("Failed to copy QR code to clipboard");
      }
    }
  };
  

  return (
    <Dialog
      open={isModalOpen(ModalIds.LINK_QR_CODE)}
      onOpenChange={(open) => {
        if (!open) {
          closeModal(ModalIds.LINK_QR_CODE);
          setTheme(themes[0]);
        }
      }}
    >
      <DialogContent className="sm:max-w-[410px]">
        <DialogHeader>
          <DialogTitle>QR Code</DialogTitle>
          <DialogDescription>
            Share this QR code to easily access/share the link
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center bg-primary/5 p-4 w-full">
          <div className="flex flex-col rounded-md">
            <QRCode
              value={linkData?.url || ""}
              size={128}
              bgColor={selectedTheme.colors[0]}
              fgColor={selectedTheme.colors[1]}
              eyeColor={selectedTheme.colors[2]}
              id="qr-code-component"
            />

            <p className="text-xs text-center text-muted-foreground mt-2">
              Theme: <strong>{selectedTheme.name}</strong>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {themes.map((theme) => (
            <Button
              key={theme.name}
              variant="outline"
              className={cn("w-10 h-10 p-0 rounded-full overflow-hidden relative", {
                "ring-2 ring-primary": selectedTheme.name === theme.name
              })}
              title={theme.name}
              onClick={() => setTheme(theme)}
            >
              {theme.colors.map((color: string, index: number) => {
                const rotation = (index / theme.colors.length) * 360;
                const skew = (1 / theme.colors.length) * 360;
                 return (
                  <div
                    key={index}
                    className="absolute inset-0"
                    style={{
                      backgroundColor: color,
                      transform: `rotate(${rotation}deg) skew(${skew}deg)`,
                      transformOrigin: '50% 50%',
                      borderColor: theme.colors[(index + 1) % theme.colors.length]
                    }}
                  />
                );
              })}
            </Button>
          ))}
        </div>

        <p className="text-xs text-center text-muted-foreground mt-2">
          See other themes at{" "}
          <Link
            className="text-primary hover:underline"
            href="https://qr-color.vercel.app/">QR Color</Link>
          &nbsp;from the same author.
        </p>

        <DialogFooter className="mt-3">
          <Button variant="outline" onClick={() => downloadImage()}>
            <ImageDown className="h-4 w-4 mr-1" />
            Download
          </Button>

          <Button variant="outline" onClick={() => copyImage()}>
            <ClipboardCopy className="h-4 w-4 mr-1" />
            Copy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}