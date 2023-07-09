import type { Component } from "#/lib/utils/component";
import type { NavbarProps } from "./navbar.type";
import { LinkButton } from "../../atoms/link-button";
import { BiUserCircle } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";

export const Navbar: Component<NavbarProps> = () => {
  return (
    <nav className="bg-transparent flex justify-between items-center px-4 max-w-screen-xl mx-auto">
      <Link href={"/"} className="flex items-center">
        <Image src="/link.png" alt="logo" width={35} height={35} />
      </Link>

      <div className="flex items-center">
        <Link href={"/pricing"} className="text-gray-300 text-base mr-4 hover:text-gray-500 transition-colors duration-200">
          Pricing
        </Link>

        <LinkButton variant="primary" href="/sign-in">
          <BiUserCircle className="mr-2" />
          Sign in
        </LinkButton>
      </div>
    </nav>
  );
};