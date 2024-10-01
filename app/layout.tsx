import type { Metadata } from "next";
import "./globals.css";
import "./fonts/fonts.css";
import { Component } from "@/components/component";
import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Linkfy",
  description: "Linkfy is a simplist way to share links with your friends. (#Made in France 🇫🇷)",
};

export const RootLayout: Component<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

export default RootLayout;