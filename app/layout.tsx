import { Component } from "@/components/component";
import { PropsWithChildren } from "react";
import localFont from "next/font/local";
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Linkfy",
  description: "Linkfy is a simplist way to share links with your friends. (#Made in France 🇫🇷)",
};

export const RootLayout: Component<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <div className="container mx-auto p-4 mt-16">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;