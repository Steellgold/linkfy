"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "#/lib/components/atoms/button";
import type { SubmitHandler } from "react-hook-form";
import { Input } from "#/lib/components/atoms/input";
import { useState, type ReactElement } from "react";
import { Card } from "#/lib/components/atoms/card";
import { Text } from "#/lib/components/atoms/text";
import { BsCheckLg } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { FaRobot } from "react-icons/fa";
import Link from "next/link";
import { Toaster, toast } from "sonner";

type FormValues = {
  email: string;
};

const ResetPassPage = (): ReactElement => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submiting, setSubmiting] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const supabase = createClientComponentClient();

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async(): Promise<void> => {
    setSubmiting(true);

    await supabase.auth.resetPasswordForEmail(email).then(() => {
      setSubmitted(true);
      setSubmiting(false);
      toast.success("The email has been sent, please check your inbox (if you don't see it, check your spam folder)");
    }).catch(() => {
      toast.error("An error occurred while sending the email");
      setSubmiting(false);
    });
  };

  return (
    <>
      <Toaster position="top-right" toastOptions={{
        style: {
          backgroundColor: "#1F2937",
          color: "#fff",
          border: "1px solid #4B5563"
        }
      }} />

      <Card size="sm">
        <div className="p-0">
          <h1 className="mb-1 text-xl font-bold text-white md:text-2xl">Forgot your password?</h1>
        </div>

        <div className="flex flex-col mt-2">
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-0.5">
            <Input
              id="email"
              label="Email address"
              placeholder="john@company.com"
              type="email"
              className="mb-2"
              required
              error={errors.email?.message}
              {...register("email", { required: "This field is required" })}
              onChange={(e) => setEmail(e.target.value)}
              onPaste={(e) => setEmail(e.currentTarget.value)}
            />

            {submiting && (
              <Text className="text-gray-400">
                <FaRobot className="inline-block animate-spin mr-1" />
              Sending the secret super secure email...
              </Text>
            )}

            {submitted && (
              <Text className="text-green-500">
                <BsCheckLg className="inline-block mr-1" />
              The super secret secure email has been sent !
              </Text>
            )}

            <Button>
              Submit
            </Button>
          </form>

          <div className="flex flex-col mt-4">
            <Text className="text-gray-400">
              Remember your password? <Link href="/sign-in" className="text-blue-600 hover:text-blue-500">Sign in</Link>
            </Text>
          </div>
        </div>
      </Card>
    </>
  );
};

export default ResetPassPage;