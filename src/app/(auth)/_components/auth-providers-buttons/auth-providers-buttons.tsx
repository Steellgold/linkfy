/* eslint-disable @typescript-eslint/no-misused-promises */

import type { AuthProvidersButtonProps } from "./auth-providers-buttons.type";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "#/lib/components/atoms/button";
import type { Component } from "#/lib/utils/component";
import { BsDiscord, BsGithub } from "react-icons/bs";
import { Text } from "#/lib/components/atoms/text";
import { FcGoogle } from "react-icons/fc";

export const AuthProvidersButtons: Component<AuthProvidersButtonProps> = ({ textSeparator, withSeparator }) => {
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
        <Button fulled variant="white" onClick={() => supabase.auth.signInWithOAuth({ provider: "google" })}>
          <FcGoogle className="w-6 h-6" />
        </Button>

        <Button fulled variant="black" onClick={() => supabase.auth.signInWithOAuth({ provider: "github" })}>
          <BsGithub className="w-6 h-6" />
        </Button>

        <Button fulled variant="discord" onClick={() => supabase.auth.signInWithOAuth({ provider: "discord" })}>
          <BsDiscord className="w-6 h-6" />
        </Button>
      </div>
    </>
  );
};