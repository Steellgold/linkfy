"use client";

import { useState, type ReactElement } from "react";
import { Button } from "#/lib/components/atoms/button";
import { Card } from "#/lib/components/atoms/card";
import { Input } from "#/lib/components/atoms/input";
import { Text } from "#/lib/components/atoms/text";
import { BsCheckLg } from "react-icons/bs";
import { FaRobot } from "react-icons/fa";
import Link from "next/link";

const ResetPassPage = (): ReactElement => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submiting, setSubmiting] = useState<boolean>(false);

  return (
    <>
      <Card size="sm">
        <div className="mb-2 p-0">
          <h1 className="mb-1 text-xl font-bold text-white md:text-2xl">Forgot your password?</h1>
        </div>

        <div className="flex flex-col mt-2">
          <Input
            label="Email address"
            placeholder="john@company.com"
            type="email"
            className="mb-2"
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

          <Button
            className="mt-2"
            onClick={() => {
              setSubmiting(true);
              setTimeout(() => {
                setSubmiting(false);
                setSubmitted(true);

                setTimeout(() => {
                  setSubmitted(false);
                }, 1100);
              }, 2000);
            }}>

            Submit
          </Button>

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