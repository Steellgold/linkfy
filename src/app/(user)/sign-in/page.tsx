"use client";

import { Button } from "#/lib/components/atoms/button";
import { Card } from "#/lib/components/atoms/card";
import { Input } from "#/lib/components/atoms/input";
import { Text } from "#/lib/components/atoms/text";
import Link from "next/link";
import type { ReactElement } from "react";

const SignInPage = (): ReactElement => {
  return (
    <>
      <Card size="sm">
        <div className="mb-2 p-0">
          <h1 className="mb-1 text-xl font-bold text-white md:text-2xl">Connect to your account</h1>
        </div>

        <div className="flex flex-col mt-2">
          <Input
            label="Email address"
            placeholder="john@company.com"
            type="email"
            className="mb-2"
          />

          <Input
            label="Password"
            placeholder="********"
            type="password"
            className="mb-2.5"
          />

          <Button className="mt-2">Sign in</Button>

          <div className="flex flex-col mt-4">
            <Text className="text-gray-400">
              Don&apos;t have an account? <Link className="text-blue-700" href="/sign-up">Sign up</Link>
            </Text>

            <Text className="text-gray-400">
              Forgot your password? <Link className="text-blue-700" href="/forgot-password">Reset it</Link>
            </Text>
          </div>
        </div>
      </Card>
    </>
  );
};

export default SignInPage;