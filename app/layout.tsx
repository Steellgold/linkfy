import type { Metadata } from "next";
import "./globals.css";
import "./fonts/fonts.css";
import { Component } from "@/components/component";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import { TanStackQuery } from "@/components/providers/query-provider";
import { ResponsiveNavbarComponent } from "@/components/responsive-navbar";
import { HydrationBoundary } from "@/components/providers/hydration-boundary";
import { getOrganizationsQuery } from "@/lib/actions/organization/organization.hook";

export const metadata: Metadata = {
  title: "Linkfy",
  description: "Linkfy is a simplist way to share links with your friends. (#Made in France 🇫🇷)",
};

export const RootLayout: Component<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SessionProvider>
            <TanStackQuery>
              <HydrationBoundary queries={[getOrganizationsQuery()]}>
                <ResponsiveNavbarComponent />

                <div className="container mx-auto p-4 mt-16">
                  {children}
                </div>
              </HydrationBoundary>
            </TanStackQuery>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;