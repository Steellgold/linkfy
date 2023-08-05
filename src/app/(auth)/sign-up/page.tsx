/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/lib/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/lib/components/ui/button";
import { Input } from "@/lib/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/lib/components/ui/form";
import { Outfit } from "next/font/google";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Separator } from "@/lib/components/ui/separator";
import Image from "next/image";
import { useTheme } from "next-themes";
import Link from "next/link";

const outfit = Outfit({ subsets: ["latin"] });

const SignUp = (): React.ReactElement => {
  const { theme } = useTheme();

  const formSchema = z.object({
    email: z.string().email().nonempty({
      message: "Your email is required."
    }).min(2, {
      message: "Your email is too short."
    }),
    password: z.string().nonempty({
      message: "Your password is required."
    }).min(8, {
      message: "Your password is too short."
    }),
    confirmPassword: z.string().nonempty({
      message: "Your password confirmation is required."
    }).min(8, {
      message: "Your password confirmation is too short."
    })
  });

  const form = useForm({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = (): void => {
    console.log("Submitted!");
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 md:mt-16 px-3">
      <Card className="w-full max-w-[30rem]">
        <CardHeader className="-mb-3">
          <CardTitle className={outfit.className}>Create your account</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@company.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className={cn("w-full flex gap-1", outfit.className)}>
                Let&apos;s go!
              </Button>
            </form>

            <Separator className="my-3" />

            <div className="flex space-x-2">
              <Button className="w-full flex gap-1">
                <Image src={"/assets/providers/google.png"} alt={"Google"} width={20} height={20} />
              </Button>

              <Button className="w-full flex gap-1">
                <Image
                  src={"/assets/providers/" + (theme == "dark" ? "github" : "github-white") + ".png"}
                  alt={"GitHub"}
                  width={20}
                  height={20}
                />
              </Button>

              <Button className="w-full flex gap-1">
                <Image src={"/assets/providers/discord.png"} alt={"Google"} width={20} height={20} />
              </Button>
            </div>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col justify-start items-start">
          <div>
            Already have an account?&nbsp;<Link href={"/sign-in"} className="text-primary hover:underline">Click here to sign in.</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;