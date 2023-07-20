"use client";

import { PricingCard } from "../../_components/pricing";
import type { ReactElement } from "react";
import { Toaster } from "sonner";

const Pricing = (): ReactElement => {
  return (
    <>
      <Toaster position="top-right" toastOptions={{
        style: {
          backgroundColor: "#1F2937",
          color: "#fff",
          border: "1px solid #4B5563"
        }
      }} />

      <PricingCard showFree />
    </>
  );
};

export default Pricing;