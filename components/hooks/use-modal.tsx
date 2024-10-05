"use client";

import { useContext } from 'react'
import { ModalContext } from '@/components/providers/modal-provider'

export function useModalStatus() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModalStatus must be used within a ModalProvider')
  }
  return context
}