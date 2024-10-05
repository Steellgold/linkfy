import { getWorkspacesQuery } from "@/lib/actions/organization/workspace.hook";
import { HydrationBoundary } from "@/components/providers/hydration-boundary";
import { ResponsiveNavbarComponent } from "@/components/responsive-navbar";
import { TanStackQuery } from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { AsyncComponent } from "@/components/component";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";
import localFont from "next/font/local";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import { auth } from "@/auth";
// import "./fonts/fonts.css";
import "./globals.css";
import { ModalProvider } from "@/components/providers/modal-provider";

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

export const RootLayout: AsyncComponent<PropsWithChildren> = async({ children }) => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ModalProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
              <TanStackQuery>
                <HydrationBoundary queries={[getWorkspacesQuery()]}>
                  <ResponsiveNavbarComponent />
                  <Toaster />

                  <div className="container mx-auto p-4 mt-16">
                    {children}
                  </div>

                </HydrationBoundary>
              </TanStackQuery>
            </ThemeProvider>
          </ModalProvider>
        </body>
      </html>
    </SessionProvider>
  );
}

export default RootLayout;