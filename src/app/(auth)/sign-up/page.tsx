"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Checkbox } from "#/lib/components/atoms/checkbox/checkbox";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Button } from "#/lib/components/atoms/button";
import { Input } from "#/lib/components/atoms/input";
import { useState, type ReactElement } from "react";
import { Card } from "#/lib/components/atoms/card";
import { Text } from "#/lib/components/atoms/text";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { BsDiscord, BsGithub } from "react-icons/bs";
import { Toaster } from "sonner";
import Link from "next/link";

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  checked: boolean;
};

const SignUpPage = (): ReactElement => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checked, setChecked] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async(): Promise<void> => {
    await supabase.auth.signUp({ email, password });
    router.push("/");
    router.refresh();
  };

  const router = useRouter();
  const supabase = createClientComponentClient();

  return (
    <>
      <Toaster />
      <Card size="sm2">
        <div className="p-0">
          <h1 className="mb-1 text-xl font-bold text-white md:text-2xl">Create your account</h1>
        </div>

        <div className="flex flex-col mt-2">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-0.5">
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
              error={errors.confirmPassword?.message}
              {...register("confirmPassword", { required: "This field is required", minLength: {
                value: 8,
                message: "Password must be at least 8 characters long"
              } })}
              onChange={e => setConfirmPassword(e.target.value)}
            />

            <Checkbox
              id="terms-of-service"
              {...register("checked", { required: "You must agree to the Terms of Service" })}
              error={errors.checked?.message}
              onChange={e => setChecked(e.target.checked)}>
              I agree to the <Link className="text-blue-600 hover:text-blue-500" href="/terms-of-service">Terms of Service</Link>
            </Checkbox>

            <Button className="mt-2">Let&apos;s go</Button>
          </form>

          <div className="flex flex-col mt-4">
            <Text className="text-gray-400">
              Already have an account ? <Link className="text-blue-600 hover:text-blue-500" href="/sign-in">Sign in</Link>
            </Text>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <hr className="flex-grow border-gray-600" />
            <Text className="text-gray-400">OR</Text>
            <hr className="flex-grow border-gray-600" />
          </div>

          <div className="flex justify-center gap-2">
            <Button className="mt-2" variant="black" onClick={() => supabase.auth.signInWithOAuth({ provider: "google" })}>
              <FcGoogle className="mr-1 w-6 h-6" />
            </Button>

            <Button className="mt-2" variant="black" onClick={() => supabase.auth.signInWithOAuth({ provider: "github" })}>
              <BsGithub className="mr-1 w-6 h-6" />
            </Button>

            <Button className="mt-2" variant="black" onClick={() => supabase.auth.signInWithOAuth({ provider: "discord" })}>
              <BsDiscord className="mr-1 w-6 h-6" />
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default SignUpPage;