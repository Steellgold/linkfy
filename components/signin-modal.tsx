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
  const [isLoading, setIsLoading] = useState(false)

  const socialAction = (provider: string) => {
    signIn(provider)
    setIsLoading(true)
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
        
        {/* {!isSent ? ( */}
        <div className="flex flex-col">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="w-full" onClick={() => socialAction('google')} disabled={isLoading}>
              <Loading isLoading={isLoading} icon={<FcGoogle className="h-4 w-4 mr-1" />}>
              Google
            </Loading>
            </Button>
            
            <Button variant="outline" className="w-full" onClick={() => socialAction('github')} disabled={isLoading}>
              <Loading isLoading={isLoading} icon={<VscGithubInverted className="h-4 w-4 mr-1" />}>
                GitHub
              </Loading>               
            </Button>
          </div>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-primary/20"></div>
            <div className="mx-4 text-primary/50">OR</div>
            <div className="flex-grow border-t border-primary/20"></div>
          </div>

          {/* <form action={resendAction}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-resend" className="text-sm">Sign in with magic link</Label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      id="email-resend"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john.doe@example.com"
                      className="flex-grow"
                      required
                    />
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full sm:w-auto"
                    >
                      {isLoading ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span className="sm:hidden ml-1 sm:ml-0">Send</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </form> */}
        </div>
        {/* // ) : (
        //   <div className="py-6 text-center text-sm text-gray-600">
        //     A magic link has been sent to your email address. Please check your inbox and if you don&apos;t see it, check your spam folder.
        //   </div>
        // )} */}
      </DialogContent>
    </Dialog>
  )
}