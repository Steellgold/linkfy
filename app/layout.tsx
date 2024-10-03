import { getWorkspacesQuery } from "@/lib/actions/organization/workspace.hook";
import { HydrationBoundary } from "@/components/providers/hydration-boundary";
import { ResponsiveNavbarComponent } from "@/components/responsive-navbar";
import { TanStackQuery } from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { AsyncComponent } from "@/components/component";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";
import type { Metadata } from "next";
import "./fonts/fonts.css";
import "./globals.css";
import { auth } from "@/auth";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Linkfy",
  description: "Linkfy is a simplist way to share links with your friends. (#Made in France 🇫🇷)",
};

export const RootLayout: AsyncComponent<PropsWithChildren> = async({ children }) => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body>
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
        </body>
      </html>
    </SessionProvider>
  );
}

export default RootLayout;