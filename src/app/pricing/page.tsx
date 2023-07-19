"use client";

import type { ReactElement } from "react";
import { Toaster } from "sonner";
import { PricingCard } from "../_components/pricing";
import { RiMotorbikeFill } from "react-icons/ri";
import clsx from "clsx";

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

      <PricingCard />

      <div className="mt-2">
        <a href="/" className="flex text-blue-600 hover:text-blue-500 gap-2 justify-center p-4 items-center group">
          Ride to the home
          <RiMotorbikeFill
            size={20}
            className={clsx(
              "group-hover:rotate-45 group-hover:-translate-x-[9.7rem] transition-transform",
              "duration-1000 ease-in-out translate-x-0 -scale-x-100"
            )}
          />
        </a>
      </div>
    </>
  );
};

export default Pricing;