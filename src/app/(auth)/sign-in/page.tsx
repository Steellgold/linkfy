"use client";

import { Button } from "#/lib/components/atoms/button";
import { Card } from "#/lib/components/atoms/card";
import { Input } from "#/lib/components/atoms/input";
import { Text } from "#/lib/components/atoms/text";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactElement } from "react";

const SignInPage = (): ReactElement => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignIn = async(e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await supabase.auth.signInWithPassword({
      email,
      password
    });

    router.push("/");
    router.refresh();
  };

  return (
    <>
      <Card size="sm">
        <div className="p-0">
          <h1 className="mb-1 text-xl font-bold text-white md:text-2xl">Connect to your account</h1>
        </div>

        <div className="flex flex-col mt-2">
          <form onSubmit={handleSignIn} className="flex flex-col gap-0.5">
            <Input
              id="email"
              label="Email address"
              placeholder="john@company.com"
              type="email"
              className="mb-1.5"
              onChange={e => setEmail(e.target.value)}
            />

            <Input
              id="password"
              label="Password"
              placeholder="••••••••"
              type="password"
              className="mb-3.5"
              onChange={e => setPassword(e.target.value)}
            />

            <Button className="">Sign in</Button>
          </form>

          <div className="flex flex-col mt-4">
            <Text className="text-gray-400">
              Don&apos;t have an account? <Link className="text-blue-600 hover:text-blue-500" href="/sign-up">Sign up</Link>
            </Text>

            <Text className="text-gray-400">
              Forgot your password? <Link className="text-blue-600 hover:text-blue-500" href="/reset-password">Reset it</Link>
            </Text>
          </div>
        </div>
      </Card>
    </>
  );
};

export default SignInPage;