"use client";

import { Button } from "#/lib/components/atoms/button";
import { Card } from "#/lib/components/atoms/card";
import { Checkbox } from "#/lib/components/atoms/checkbox/checkbox";
import { Input } from "#/lib/components/atoms/input";
import { Text } from "#/lib/components/atoms/text";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactElement } from "react";

const SignUpPage = (): ReactElement => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checked, setChecked] = useState(false);

  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignUp = async(e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await supabase.auth.signUp({ email, password });

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
          <form onSubmit={handleSignUp} className="flex flex-col gap-0.5">
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
              className="mb-2.5"
              onChange={e => setPassword(e.target.value)}
            />

            <Input
              id="confirm-password"
              label="Confirm password"
              placeholder="••••••••"
              type="password"
              className="mb-2.5"
              onChange={e => setConfirmPassword(e.target.value)}
            />

            <Checkbox onChange={e => setChecked(e.target.checked)}>
              I agree to the <Link className="text-blue-600 hover:text-blue-500" href="/terms-of-service">Terms of Service</Link>
            </Checkbox>

            <Button className="mt-2">Let&apos;s go</Button>
          </form>

          <div className="flex flex-col mt-4">
            <Text className="text-gray-400">
            Already have an account ? <Link className="text-blue-600 hover:text-blue-500" href="/sign-in">Sign in</Link>
            </Text>
          </div>
        </div>
      </Card>
    </>
  );
};

export default SignUpPage;