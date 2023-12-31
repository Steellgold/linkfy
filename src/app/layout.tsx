/* eslint-disable camelcase */
import { ThemeProvider } from "@/lib/components/theme-provider";
import { Navbar } from "@/lib/molecules/navbar";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { Open_Sans } from "next/font/google";
import { PropsWithChildren } from "react";
import { Providers } from "./provider";
import "./tailwind.css";
export { metadata } from "@/lib/configs/metadata";

const os = Open_Sans({ subsets: ["latin"] });

export const revalidate = 0;

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("bg-white dark:bg-[#09090b]", os.className)}>
        <Analytics />

        <Providers>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <Navbar />
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
