"use client";
/* eslint-disable @typescript-eslint/no-misused-promises */

import type { AuthProvidersButtonProps } from "./auth-providers-buttons.type";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "#/lib/components/atoms/button";
import type { Component } from "#/lib/utils/component";
import { BsDiscord, BsGithub } from "react-icons/bs";
import { Text } from "#/lib/components/atoms/text";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

export const dynamic = "force-dynamic";

export const AuthProvidersButtons: Component<AuthProvidersButtonProps> = ({ textSeparator, withSeparator }) => {

  const [clickedGoogle, setClickedGoogle] = useState(false);
  const [clickedGithub, setClickedGithub] = useState(false);
  const [clickedDiscord, setClickedDiscord] = useState(false);

  const supabase = createClientComponentClient();

  return (
    <>
      {withSeparator && (
        <div className="flex items-center gap-2 mt-2">
          <hr className="flex-grow border-gray-600" />
          {textSeparator && <Text className="text-gray-400">{textSeparator}</Text> }
          <hr className="flex-grow border-gray-600" />
        </div>
      )}

      <div className="flex justify-center gap-2 mt-2">
        <Button
          fulled
          variant="white"
          icon={{ icon: <FcGoogle className="w-6 h-6" /> }}
          disabled={clickedDiscord || clickedGoogle || clickedGithub}
          loading={clickedGoogle}
          onClick={async() => {
            setClickedGoogle(true);
            await supabase.auth.signInWithOAuth({
              provider: "google",
              options: {
                redirectTo: `${location.origin}/auth/callback`
              }
            });
          }} />

        <Button
          fulled
          variant="black"
          icon={{ icon: <BsGithub className="w-6 h-6" /> }}
          disabled={clickedDiscord || clickedGoogle || clickedGithub}
          loading={clickedGithub}
          onClick={async() => {
            setClickedGithub(true);
            await supabase.auth.signInWithOAuth({
              provider: "github",
              options: {
                redirectTo: `${location.origin}/auth/callback`
              }
            });
          }} />

        <Button
          fulled
          variant="discord"
          icon={{ icon: <BsDiscord className="w-6 h-6" /> }}
          disabled={clickedDiscord || clickedGoogle || clickedGithub}
          loading={clickedDiscord}
          onClick={async() => {
            setClickedDiscord(true);
            await supabase.auth.signInWithOAuth({
              provider: "discord",
              options: {
                redirectTo: `${location.origin}/auth/callback`
              }
            });
          }} />
      </div>
    </>
  );
};