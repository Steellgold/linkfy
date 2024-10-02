"use client"
// https://v0.dev/chat/GBlp4OlDnER

import { useState, ReactElement } from "react"
import Link from "next/link"
import { Loader2, Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { ThemeSwitcher } from "./ui/theme-switcher"
import { useSession } from "next-auth/react"
import { SignInModal } from "./signin-modal"
import { useTheme } from "next-themes"
import Image from "next/image"

type NavItem = {
  href: string
  label: string | ReactElement
  children?: ReactElement
  position?: 'left' | 'center' | 'right'
}

const navItems: NavItem[] = [
  { href: '/features', label: 'Features', position: 'center' },
  { href: '/pricing', label: 'Pricing', position: 'center' }
]

export const ResponsiveNavbarComponent = (): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const { status, data } = useSession();
  const { theme } = useTheme();

  const ProfileItem = () => (
    <div className="flex items-center gap-1.5">
      <ThemeSwitcher />

      {status == "authenticated" && data.user ? (
        <Button className="flex items-center text-sm font-medium mx-2">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarImage src={data.user?.image ?? "undefined"} alt="Profile" />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          
          {data.user.name ?? "Profile"}
        </Button>
      ) : status == "loading" ? (
        <Button className="flex items-center text-sm font-medium mx-2" variant="outline" disabled>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />          
          Loading
        </Button>
      ) : (
        <SignInModal>
          <Button variant="outline">
            Sign in
          </Button>
        </SignInModal>
      )}
    </div>
  )

  const renderNavItem = (item: NavItem) => (
    <Link
      key={item.href}
      href={item.href}
      className="text-sm font-medium text-muted-foreground hover:text-primary mx-2"
      onClick={() => setIsOpen(false)}
    >
      {item.children || item.label}
    </Link>
  )

  const leftItems = navItems.filter(item => item.position === 'left')
  const centerItems = navItems.filter(item => item.position === 'center')
  const rightItems = navItems.filter(item => item.position === 'right')

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left section */}
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold mr-4">
                {theme == "dark" ? (
                  <Image src="logo/light/simple-text-big.svg" alt="Logo (light)" width={95} height={50} />
                ) : theme == "light" ? (
                  <Image src="logo/dark/simple-text-big.svg" alt="Logo (dark)" width={95} height={50} />
                ) : (
                  <Image src="logo/light/simple-text-big.svg" alt="Logo (dark)" width={95} height={50} />
                )}
              </Link>
              <div className="hidden md:flex">
                {leftItems.map(renderNavItem)}
              </div>
            </div>

            {/* Center section */}
            <div className="hidden md:flex md:items-center md:justify-center flex-1">
              {centerItems.map(renderNavItem)}
            </div>

            {/* Right section */}
            <div className="flex items-center">
              <div className="hidden md:flex">
                {rightItems.map(renderNavItem)}
                <ProfileItem />
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden ml-2">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Ouvrir le menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <div className="flex flex-col space-y-4 mt-4">
                      {navItems.map(renderNavItem)}
                      <ProfileItem />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}