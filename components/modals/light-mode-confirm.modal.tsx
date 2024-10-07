"use client";

import { Cone, Flashlight } from "lucide-react";
import { useModalStatus } from "../hooks/use-modal";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { buttonVariants } from "../ui/button";
import { ModalIds } from "./modal-ids";
import { useTheme } from "next-themes";

export const ModalLightModeSwitchConfirm = () => {
  const { setTheme } = useTheme();
  const { isModalOpen, closeModal } = useModalStatus();

  return (
    <AlertDialog
      open={isModalOpen(ModalIds.LIGHT_MODE_CONFIRM)}
      onOpenChange={(open) => !open && closeModal(ModalIds.LIGHT_MODE_CONFIRM)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="flex items-center gap-1">
            <div className="relative flex items-center gap-1">
              <Flashlight className="z-10 rotate-[93deg] h-6 w-6 fill-white text-black/50" />
              <Cone className="z-0 h-6 w-6 -ml-3 rotate-[-84deg] text-yellow-400 fill-yellow-400" />
            </div>
            Protect your eyes, switch to light mode?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "switchFuckingLightMode" })}
            onClick={() => {
              setTheme("light");
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}