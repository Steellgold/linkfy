"use client";

import type { ComponentPropsWithoutRef, ReactElement } from "react";
import { buttonVariants } from "@/lib/components/ui/button";
import { ChooseTheme } from "@/lib/components/ui/choose-theme";
import type { Component } from "@/lib/utils/component";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const Navbar: Component<ComponentPropsWithoutRef<"nav">> = ({ ...props }): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const { theme } = useTheme();

  return (
    <nav className={cn("flex justify-between items-center px-5 mx-auto max-w-screen-xl mt-3", props.className)} {...props} suppressHydrationWarning>
      {theme == "dark" && (
        <Image src={"/assets/logo-light.png"} alt={"Linkfy"} width={40} height={40} />
      ) || theme == "light" && (
        <Image src={"/assets/logo-dark.png"} alt={"Linkfy"} width={40} height={40} />
      ) || (
        <Image src={"/assets/logo-light.png"} alt={"Linkfy"} width={40} height={40} />
      )}

      <div className="flex h-5 items-center space-x-2 text-sm">
        <Link href={"/"} className={buttonVariants({ variant: "link" })}>Pricing</Link>
        <Link href={"/"} className={buttonVariants({ variant: "link" })}>API</Link>
        <Link href={"/sign-in"} className={buttonVariants({ variant: "outline" })}>Sign in</Link>
        <ChooseTheme />
      </div>
    </nav>
  );
};