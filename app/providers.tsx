import { auth } from "@/auth";
import { AsyncComponent } from "@/components/component";
import { HydrationBoundary } from "@/components/providers/hydration-boundary";
import { ModalProvider } from "@/components/providers/modal-provider";
import { TanStackQuery } from "@/components/providers/query-provider";
import { ResponsiveNavbarComponent } from "@/components/responsive-navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { getWorkspacesQuery } from "@/lib/actions/workspace/workspace.hook";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";
import { Toaster } from "sonner";

export const Providers: AsyncComponent<PropsWithChildren> = async({ children }) => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <ModalProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <TanStackQuery>
            <HydrationBoundary queries={[getWorkspacesQuery()]}>
              <ResponsiveNavbarComponent />
              <Toaster />

              {children}
            </HydrationBoundary>
          </TanStackQuery>
        </ThemeProvider>
      </ModalProvider>
    </SessionProvider>
  );
}