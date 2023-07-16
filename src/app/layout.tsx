import "./tailwind.css";

import type { Component } from "#/lib/utils/component";
import type { PropsWithChildren } from "react";
import { Outfit } from "next/font/google";
import clsx from "clsx";
import { Navbar } from "#/lib/components/molecules/navbar";
import { Toaster } from "sonner";

const outfit = Outfit({ subsets: ["latin"] });

export { metadata } from "#/lib/configs/metadata";

const RootLayout: Component<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body className={clsx(outfit.className, "bg-gray-900")}>
        <div className={clsx(
          "absolute top-[-30%] bottom-0 right-0 left-0 w-full h-[75%]",
          "bg-gradient-to-b from-gray-800 to-transparent skew-y-[-10deg] transform-origin-top-left overflow-hidden -z-1"
        )}></div>

        <div className="relative mt-5">
          <Toaster position="top-right" expand toastOptions={{
            style: {
              backgroundColor: "#1F2937",
              color: "#fff",
              border: "1px solid #4B5563"
            }
          }} />

          <Navbar />
        </div>

        <div className="relative mt-10">
          {children}
          <p className="text-center text-gray-500 text-sm mt-4 mb-8 mx-auto max-w-screen-xl">© 2023 - Linkfy</p>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;