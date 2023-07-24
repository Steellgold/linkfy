"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthProvidersButtons } from "../_components/auth-providers-buttons";
import { Button } from "#/lib/components/atoms/button";
import { Input } from "#/lib/components/atoms/input";
import type { SubmitHandler } from "react-hook-form";
import { useState, type ReactElement } from "react";
import { Text } from "#/lib/components/atoms/text";
import { Card } from "#/lib/components/atoms/card";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";

type FormValues = {
  email: string;
  password: string;
};

export const dynamic = "force-dynamic";

const SignInPage = (): ReactElement => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient();

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async(): Promise<void> => {
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
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-0.5">
            <Input
              id="email"
              label="Email address"
              placeholder="john@company.com"
              type="email"
              className="mb-1.5"
              required
              error={errors.email?.message}
              {...register("email", { required: "This field is required" })}
              onChange={e => setEmail(e.target.value)}
            />

            <Input
              id="password"
              label="Password"
              placeholder="••••••••"
              type="password"
              className="mb-3.5"
              required
              error={errors.password?.message}
              {...register("password", { required: "This field is required", minLength: {
                value: 8,
                message: "Password must be at least 8 characters long"
              } })}
              onChange={e => setPassword(e.target.value)}
            />

            <Button className="">Sign in</Button>
          </form>

          <AuthProvidersButtons withSeparator textSeparator="OR" />

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