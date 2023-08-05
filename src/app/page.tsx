/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/lib/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/lib/components/ui/button";
import { Input } from "@/lib/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/lib/components/ui/form";
import { Outfit } from "next/font/google";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Copy, Link, QrCode, Unlink } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const outfit = Outfit({ subsets: ["latin"] });

const Home = (): React.ReactElement => {
  const [slug, setSlug] = useState<string | null>(null);

  const formSchema = z.object({
    url: z.string().url().nonempty({
      message: "Your URL is required."
    }).min(2, {
      message: "Your URL is too short."
    })
  });

  const form = useForm({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = () => {
    // TODO: Submit the form and get the slug.
    setSlug(Math.random().toString(36).substring(7));
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 md:mt-16 px-3">
      <Card className="w-full max-w-[30rem]">
        <CardHeader className="-mb-3">
          <CardTitle className={outfit.className}>Shorten your links</CardTitle>
          <CardDescription className={outfit.className}>
            Generate your short link with a single click and share it with your friends, customers, or social media.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <div className={cn({ "flex space-x-2": slug !== null })}>
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input className="max-w-3xl" placeholder="https://example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.formState.isSubmitted && slug !== null && <Input value={slug} className="w-full" readOnly />}
              </div>
              <div className="flex space-x-2">
                <Button type="submit" className="w-full flex gap-1">
                  <Link className="h-3.5 w-3.5" />
                  Shorten
                </Button>
                <Button>
                  <QrCode className="h-3.5 w-3.5" />
                </Button>
                <Button>
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;