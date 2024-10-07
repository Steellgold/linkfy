"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { useModalStatus } from "../hooks/use-modal"
import { ModalIds } from "../modals/modal-ids"
import { ModalLightModeSwitchConfirm } from "../modals/light-mode-confirm.modal"

export const ThemeSwitcher = () => {
  const { setTheme, theme } = useTheme();
  const { openModal } = useModalStatus();

  return <>
    <ModalLightModeSwitchConfirm />
    
    <Button
      variant="outline"
      size="icon"
      className="rounded-full"
      onClick={() => {
        if (theme === "dark") {
          openModal(ModalIds.LIGHT_MODE_CONFIRM);
        } else {
          setTheme("dark");
        }
      }}
    >
      <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  </>
}
