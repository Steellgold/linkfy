"use client";

import { AuthProvidersButtons } from "../_components/auth-providers-buttons";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Checkbox } from "#/lib/components/atoms/checkbox/checkbox";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Button } from "#/lib/components/atoms/button";
import { Input } from "#/lib/components/atoms/input";
import { useState, type ReactElement, useEffect } from "react";
import { Card } from "#/lib/components/atoms/card";
import { Text } from "#/lib/components/atoms/text";
import { useRouter } from "next/navigation";
import { Toaster } from "sonner";
import Link from "next/link";

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  checked: boolean;
};

const SignUpPage = (): ReactElement => {
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    if (confirmPassword !== "" && password !== "" && confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  }, [password, confirmPassword]);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async(): Promise<void> => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    await supabase.auth.signUp({ email, password, options: {
      emailRedirectTo: `${location.origin}/auth/callback`
    } });
    router.push("/");
    router.refresh();
  };

  return (
    <>
      <Toaster />
      <Card size="sm2">
        <div className="p-0">
          <h1 className="mb-1 text-xl font-bold text-white md:text-2xl">Create your account</h1>
        </div>

        <div className="flex flex-col mt-2">
          <form onSubmit={() => handleSubmit(onSubmit)} className="flex flex-col gap-0.5">
            <Input
              id="email"
              label="Email address"
              placeholder="john@company.com"
              type="email"
              className="mb-0.5"
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
              className="mb-0.5"
              passwordChecker
              required
              error={errors.password?.message}
              {...register("password", { required: "This field is required", minLength: {
                value: 8,
                message: "Password must be at least 8 characters long"
              } })}
              onChange={e => setPassword(e.target.value)}
            />

            <Input
              id="confirm-password"
              label="Confirm password"
              placeholder="••••••••"
              type="password"
              className="mb-0.5"
              required
              error={errors.confirmPassword?.message || confirmPasswordError}
              {...register("confirmPassword", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long"
                } })}
              onChange={e => setConfirmPassword(e.target.value)}
            />

            <Checkbox
              id="terms-of-service"
              {...register("checked", { required: "You must agree to the Terms of Service" })}
              error={errors.checked?.message}>
              I agree to the <Link className="text-blue-600 hover:text-blue-500" href="/terms-of-service">Terms of Service</Link>
            </Checkbox>

            <Button className="mt-2">Let&apos;s go</Button>
          </form>

          <AuthProvidersButtons withSeparator textSeparator="OR" />

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