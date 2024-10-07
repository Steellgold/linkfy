"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { usePasswordUpdateLink } from "@/lib/actions/link/link.hook";
import { useModalStatus } from "../hooks/use-modal";
import { Dna, EyeIcon, EyeOffIcon } from "lucide-react";
import { ModalIds } from "./modal-ids";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loading } from "../loading";

type ModalData = {
  linkId: string;
  currentPassword: string | null;
}

export const DialogLinkAddPassword = () => {
  const { isModalOpen, closeModal, data } = useModalStatus();
  const linkData = data as ModalData;

  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setPassword(linkData?.currentPassword || "");
    console.log("currentPassword ", linkData?.currentPassword);
  }, [linkData?.currentPassword]);

  const passwordUpdate = usePasswordUpdateLink();

  return (
    <Dialog
      open={isModalOpen(ModalIds.LINK_ADD_PASSWORD)}
      onOpenChange={(open) => {
        if (!open) {
          setPassword("");
          setShowPassword(false);
          closeModal(ModalIds.LINK_ADD_PASSWORD);
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Password protection</DialogTitle>
          <DialogDescription>
            Choose a password to protect this link, all users with access to this link will need to enter this password to view it
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />

          <Button variant="outline" onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </Button>

          <Button variant="outline" onClick={() => setPassword(Math.random().toString(36).slice(-8))}>
            <Dna className="h-5 w-5" />
          </Button>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => closeModal(ModalIds.LINK_ADD_PASSWORD)}>Cancel</Button>

          <Button
            disabled={isLoading}
            onClick={() => {
              setLoading(true);
              toast.promise(passwordUpdate.mutateAsync({ linkId: linkData.linkId, password }), {
                loading: passwordMessage("Updating password...", "Adding password...", "Removing password...", password, linkData?.currentPassword),
                success: passwordMessage("Password updated successfully", "Password added successfully", "Password removed successfully", password, linkData?.currentPassword),
                error: passwordMessage("Failed to update password", "Failed to add password", "Failed to remove password", password, linkData?.currentPassword),
              });

              setTimeout(() => {
                closeModal(ModalIds.LINK_ADD_PASSWORD);
                setPassword("");
                setShowPassword(false);
                setLoading(false);
              }, 1530);
            }}
          >
            <Loading isLoading={isLoading}>
              {passwordMessage("Update password", "Add password", "Remove password", password, linkData?.currentPassword)}
            </Loading>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const passwordMessage = (updtMsg: string, addMsg: string, rmvMsg: string, password: string, currentPassword: string | null) => {
  if (password.length >= 1) {
    if (currentPassword !== null) {
      return updtMsg;
    } else {
      return addMsg;
    }
  } else {
    if (currentPassword == null) {
      return addMsg;
    } else {
      return rmvMsg;
    }
  }
}