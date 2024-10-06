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
import { useDeleteLink } from "@/lib/actions/link/link.hook";
import { toast } from "sonner";

type ModalData = {
  linkId: string
}

export const ModalLinkDeleteConfirm = () => {
  const { isModalOpen, closeModal, data } = useModalStatus();
  const linkData = data as ModalData;

  const deleteLink = useDeleteLink();

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
              toast.promise(deleteLink.mutateAsync(linkData.linkId), {
                loading: "Deleting link...",
                success: "Link deleted successfully",
                error: "Failed to delete link",
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