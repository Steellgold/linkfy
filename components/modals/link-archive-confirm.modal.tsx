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
import { useArchiveLink } from "@/lib/actions/link/link.hook";
import { toast } from "sonner";

type ModalData = {
  linkId: string
}

export const ModalLinkArchiveConfirm = () => {
  const { isModalOpen, closeModal, data } = useModalStatus();
  const linkData = data as ModalData;

  const archiveLink = useArchiveLink();

  return (
    <AlertDialog
      open={isModalOpen(ModalIds.LINK_ARCHIVE_CONFIRM)}
      onOpenChange={(open) => !open && closeModal(ModalIds.LINK_ARCHIVE_CONFIRM)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            After being archived, it will still be active but just not visible in the list, it can be unarchived at any time
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            onClick={() => {
              toast.promise(archiveLink.mutateAsync(linkData.linkId), {
                loading: "Archiving link...",
                success: "Link archived successfully",
                error: "Failed to archive link",
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