"use client"
// https://v0.dev/chat/GBlp4OlDnER

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Loader2, LogOut, Menu, Settings, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "@/components/ui/button"
import { useState, ReactElement } from "react"
import { useSession } from "next-auth/react"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import { SignInModal } from "./signin-modal"
import { useGetOrganizations } from "@/lib/actions/organization/organization.hook"
import { useOrganizationStore } from "@/lib/store/organization.store"
import { Skeleton } from "./ui/skeleton"

type NavItem = {
  href: string
  label: string | ReactElement
  children?: ReactElement
  position?: 'left' | 'center' | 'right'
}

const navItems: NavItem[] = []

export const ResponsiveNavbarComponent = (): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const { status, data } = useSession();
  const { theme } = useTheme();
  const { selectedOrganizationId, setSelectedOrganizationId } = useOrganizationStore();

  const orgsQuery = useGetOrganizations();

  const OrganizationSelector = () => (
    <>
      {orgsQuery.status == "pending" || orgsQuery.status == "error" ? (
        <Skeleton className="w-32 h-8" />
      ) : (
        <>
          {orgsQuery.data.length > 1 ? (
            <>
              <Select
                onValueChange={(value) => setSelectedOrganizationId(value)}
                defaultValue={selectedOrganizationId ?? undefined}
              >
                <SelectTrigger className="w-[260px]">
                  <SelectValue placeholder="Select organization" />
                </SelectTrigger>
                <SelectContent>
                  {orgsQuery.data.map(org => (
                    <SelectItem key={org.id} value={org.id}>
                      {org.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          ) : (
            // TODO: Create organization button with dialog
            <Button size="sm" className="w-[260px]">
              Create organization
            </Button>
          )}
        </>
      )}
    </>
  )

  const ProfileMenu = () => (
    status === "authenticated" ? (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"icon"} variant={"outline"} className="rounded-full">
            <Avatar className="h-8 w-8">
              {status == "authenticated" && data.user ? (
                <AvatarImage src={data.user?.image ?? "undefined"} alt="Profile" />
              ) : (
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              )}
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              {status == "authenticated" && data.user && (
                <p className="text-sm font-medium">{data.user?.name}</p>
              )}
              
              {status == "authenticated" && data.user && (
                <p className="text-xs text-muted-foreground">{data.user?.email}</p>
              )}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ) : status === "loading" ? (
      <Button variant="outline" size="icon" className="rounded-full">
        <Loader2 className="h-4 w-4 animate-spin" />          
      </Button>
    ) : (
      <SignInModal>
        <Button variant="outline">Sign in</Button>
      </SignInModal>
    )
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
                <div className="flex gap-2">
                  <OrganizationSelector />
                  <ProfileMenu />
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <div className="flex flex-col space-y-4 mt-4">
                      {navItems.map(renderNavItem)}

                      <div className="flex flex-row justify-between">
                        <OrganizationSelector />
                        <ProfileMenu />
                      </div>
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