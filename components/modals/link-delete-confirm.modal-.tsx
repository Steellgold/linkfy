"use client";

import { useModalStatus } from "../hooks/use-modal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { ModalIds } from "./modal-ids";
import { buttonVariants } from "../ui/button";


export const ModalLinkDeleteConfirm = () => {
  const { isModalOpen, closeModal } = useModalStatus();
  
  return (
    <AlertDialog
      open={isModalOpen(ModalIds.LINK_DELETE_CONFIRM)}
      onOpenChange={(open) => !open && closeModal(ModalIds.LINK_DELETE_CONFIRM)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your link
            and remove all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            onClick={() => {
              // Delete link
              console.log("caca")
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}