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
import { useUnarchiveLink } from "@/lib/actions/link/link.hook";
import { toast } from "sonner";

type ModalData = {
  linkId: string
}

export const ModalLinkUnarchiveConfirm = () => {
  const { isModalOpen, closeModal, data } = useModalStatus();
  const linkData = data as ModalData;

  const unarchiveLink = useUnarchiveLink();

  return (
    <AlertDialog
      open={isModalOpen(ModalIds.LINK_UNARCHIVE_CONFIRM)}
      onOpenChange={(open) => !open && closeModal(ModalIds.LINK_UNARCHIVE_CONFIRM)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reread the link?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will unarchive the link and make it visible in the list again.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            onClick={() => {
              toast.promise(unarchiveLink.mutateAsync(linkData.linkId), {
                loading: "Unarchiving link...",
                success: "Link unarchived successfully",
                error: "Failed to unarchive link"
              });
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}