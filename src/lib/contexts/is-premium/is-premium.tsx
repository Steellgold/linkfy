"use client";

import { createContext, useContext } from "react";
import type { Component } from "#/lib/utils/component";
import type { PropsWithChildren } from "react";

type PremiumContextType = {
  isPremium: boolean;
  setPremium?: (value: boolean) => void;
}

export const PremiumContext = createContext<PremiumContextType>({
  isPremium: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setPremium: () => {}
});

export const PremiumProvider: Component<PropsWithChildren> = ({ children }) => {
  const { isPremium, setPremium } = useContext(PremiumContext);
  console.log("cc");

  return (
    <PremiumContext.Provider value={{ isPremium, setPremium }}>
      {children}
    </PremiumContext.Provider>
  );
};