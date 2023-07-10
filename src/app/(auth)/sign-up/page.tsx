"use client";

import { Button } from "#/lib/components/atoms/button";
import { Card } from "#/lib/components/atoms/card";
import { Checkbox } from "#/lib/components/atoms/checkbox/checkbox";
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
            placeholder="••••••••"
            type="password"
            className="mb-2.5"
          />

          <Input
            label="Confirm password"
            placeholder="••••••••"
            type="password"
            className="mb-2.5"
          />

          <Checkbox>
            I agree to the <Link className="text-blue-600 hover:text-blue-500" href="/terms-of-service">Terms of Service</Link>
          </Checkbox>

          <Button className="mt-2">Let&apos;s go</Button>

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

export default SignInPage;