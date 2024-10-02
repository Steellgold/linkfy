import { User } from "next-auth";
import { Component } from "../component";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Loader2, LogOut, Settings, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { SignInModal } from "../signin-modal";

type ProfileMenuProps = {
  status: "authenticated" | "loading" | "unauthenticated";
  user?: User;
};

export const ProfileMenu: Component<ProfileMenuProps> = ({ status, user }) => {
  if (status === "unauthenticated" || !user) {
    return (
      <SignInModal>
        <Button variant="outline">Sign in</Button>
      </SignInModal>
    )
  }

  if (status === "loading" || !user) {
    return (
      <Button variant="outline" size="icon" className="rounded-full">
        <Loader2 className="h-4 w-4 animate-spin" />          
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant={"outline"} className="rounded-full">
          <Avatar className="h-8 w-8">
            {status == "authenticated" && user.image ? (
              <AvatarImage src={user.image} alt="Profile" />
            ) : (
              <AvatarFallback>
                <UserIcon className="h-4 w-4" />
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem>
          <Link href="/profile" className="block w-full flex items-center">
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem>
          <Link href="/settings" className="block w-full flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem>
          <Link href="/api/auth/out" className="block w-full flex items-center">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}