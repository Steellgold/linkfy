"use client";

import React, { createContext, useState, PropsWithChildren } from "react";
import { Component } from "@/components/component";

type ModalState = {
  [key: string]: boolean
}

type ModalContextType = {
  data: unknown;
  setModalData: (data: unknown) => void

  openModal: (id: string) => void
  closeModal: (id: string) => void
  toggleModal: (id: string) => void
  isModalOpen: (id: string) => boolean
}

export const ModalContext = createContext<ModalContextType | null>(null)

export const ModalProvider: Component<PropsWithChildren> = ({ children }) => {
  const [modalState, setModalState] = useState<ModalState>({})
  const [data, setData] = useState<unknown>([])

  const openModal = (id: string) => {
    setModalState(prev => ({ ...prev, [id]: true }))
  }

  const closeModal = (id: string) => {
    setModalState(prev => ({ ...prev, [id]: false }))
    setData(null)
  }

  const toggleModal = (id: string) => {
    setModalState(prev => ({ ...prev, [id]: !prev[id] }))
    if (!modalState[id]) {
      setData(null)
    }
  }

  const isModalOpen = (id: string) => {
    return !!modalState[id]
  }

  const setModalData = (data: unknown) => {
    setData(data)
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal, toggleModal, isModalOpen, data, setModalData }}>
      {children}
    </ModalContext.Provider>
  )
}