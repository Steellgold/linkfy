"use client"

import { PropsWithChildren, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Component } from './component'
import { signIn } from 'next-auth/react'
import { FcGoogle } from "react-icons/fc";
import { VscGithubInverted } from "react-icons/vsc";
import { Loading } from './loading'

export const SignInModal: Component<PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [wichLogin, setWichLogin] = useState<"google" | "github">("google");

  const socialAction = (provider: string) => {
    signIn(provider, {
      redirectTo: "/"
    });
    setWichLogin(provider as "google" | "github");
    setIsLoading(true);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex flex-col -space-y-1">
            <DialogTitle className="text-2xl font-bold">
              Let&apos;s sign you in
            </DialogTitle>
          </div>
          <DialogDescription className="text-muted-foreground mt-2">
            Choose a provider to sign in with your account (or create a new one).
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="w-full" onClick={() => socialAction('google')} disabled={isLoading}>
              <Loading isLoading={isLoading && wichLogin == "google"} icon={<FcGoogle className="h-4 w-4 mr-1" />}>
              Google
            </Loading>
            </Button>
            
            <Button variant="outline" className="w-full" onClick={() => socialAction('github')} disabled={isLoading}>
              <Loading isLoading={isLoading && wichLogin == "github"} icon={<VscGithubInverted className="h-4 w-4 mr-1" />}>
                GitHub
              </Loading>               
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}