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
          <DialogTitle className="text-2xl font-bold">
            Sign to your account
          </DialogTitle>
          <DialogDescription className="text-gray-500 mt-2">
            Receive a magic link or sign in with Google or GitHub to access your account.
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