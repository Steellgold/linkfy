import { Button } from "#/lib/components/atoms/button";
import { Input } from "#/lib/components/atoms/input";
import { Card } from "#/lib/components/atoms/card";
import { Text } from "#/lib/components/atoms/text";
import type { ReactElement } from "react";
import Link from "next/link";

const ChangePassPage = (): ReactElement => {
  return (
    <>
      <Card size="sm">
        <div className="p-0">
          <h1 className="mb-1 text-xl font-bold text-white md:text-2xl">Change your password</h1>
        </div>

        <div className="flex flex-col mt-2">
          <form>
            <Input
              id="password"
              label="New password"
              placeholder="••••••••"
              type="password"
              className="mb-2"
              passwordChecker
            />

            <Input
              id="confirm-password"
              label="Confirm new password"
              placeholder="••••••••"
              type="password"
              className="mb-2"
            />

            <Button className="mt-3" fulled>
              Change password
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

export default ChangePassPage;