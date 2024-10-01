import type { Metadata } from "next";
import "./globals.css";
import "./fonts/fonts.css";
import { Component } from "@/components/component";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { ResponsiveNavbarComponent } from "@/components/responsive-navbar";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Linkfy",
  description: "Linkfy is a simplist way to share links with your friends. (#Made in France 🇫🇷)",
};

export const RootLayout: Component<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SessionProvider>
            <ResponsiveNavbarComponent />

            <div className="container mx-auto p-4 mt-16">
              {children}
            </div>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;