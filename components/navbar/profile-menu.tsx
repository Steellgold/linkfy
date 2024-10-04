"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Loader2, LogOut, Settings, User as UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SignInModal } from "../signin-modal";
import { Button } from "../ui/button";
import Link from "next/link";
import { ReactElement, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const ProfileMenu = (): ReactElement => {
  const [loading, setLoading] = useState(false);
  const { data: session, status, update } = useSession();
  const router = useRouter();

  if (status == "loading") {
    return (
      <Button variant="outline" size="icon" className="rounded-full">
        <Loader2 className="h-4 w-4 animate-spin" />
      </Button>
    )
  }

  if (status === "unauthenticated" || !session?.user) {
    return (
      <SignInModal>
        <Button variant="outline">
          <UserIcon className="h-4 w-4 mr-2" />
          Sign in
        </Button>
      </SignInModal>
    )
  }

  const handleSignOut = async (event: React.FormEvent) => {
    setLoading(true);
    event.preventDefault();
    
    await signOut({ redirect: true, redirectTo: "/logged-out" });
    await update();
    setLoading(false);
    router.refresh();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant={"outline"} className="rounded-full">
          <Avatar className="h-8 w-8">
            {status == "authenticated" && session.user ? (
              <AvatarImage src={session.user.image ?? ""} alt="Profile" />
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
            <p className="text-sm font-medium">{session.user?.name}</p>
            <p className="text-xs text-muted-foreground">{session.user?.email}</p>
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
        
        <DropdownMenuItem onClick={handleSignOut} disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {!loading && <LogOut className="mr-2 h-4 w-4" />}
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}