"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy, ExternalLink, Link2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { z } from "zod";

const responseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  shortUrl: z.string().optional()
});

const Page = () => {
  const [state, setState] = useState({ message: "", success: false, shortUrl: "" });

  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isPending, setPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    setPending(true);
    e.preventDefault();

    const response = await fetch("/api/links/demo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ baseUrl: url })
    });

    const responseData = responseSchema.safeParse(await response.json());
    if (!responseData.success) {
      console.log(responseData.error);
      setState({
        message: responseData.error.errors[0].message,
        success: false,
        shortUrl: ""
      });
    }

    if (response.ok) {
      setState({
        message: "",
        success: true,
        shortUrl: responseData.data?.shortUrl || ""
      });
    } else {
      setState({
        message: responseData.data?.message || "An error occurred.",
        success: false,
        shortUrl: ""
      });
    }

    setPending(false);
  }

  useEffect(() => {
    console.log(url);
  }, [url]);

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Ridiculously long URL? We got you.</CardTitle>
          <CardDescription>Enter your long URL below to generate a short URL.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                type="url"
                name="baseUrl"
                placeholder="Enter your long URL here"
                className="flex-grow"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                autoFocus
              />

              <Button onClick={handleSubmit} disabled={isPending}>
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Link2 className="h-4 w-4" />
                )}
                <span className="sr-only">Generate Short URL</span>
              </Button>
            </div>

            {state.message && state.success === false && (
              <Alert>
                <AlertTitle>Oops!</AlertTitle>
                <AlertDescription>
                  {state.message}
                </AlertDescription>
              </Alert>
            )}

            {state.shortUrl && state.success && (
              <Alert>
                <AlertDescription className="flex sm:items-center gap-3 sm:gap-0 flex-col sm:flex-row sm:justify-between">
                  <span className="flex flex-col">
                    <span className="text-sm font-medium truncate">{state.shortUrl}</span>
                    <span className="text-xs text-muted-foreground">Expires in 30 minutes</span>
                  </span>
            
                  <div className="flex gap-2">
                    <Link href={state.shortUrl} target="_blank" className={buttonVariants({ variant: "outline" })}>
                      <ExternalLink className="h-4 w-4 mr-1" />
                      <span>Open link</span>
                    </Link>
            
                    <Button variant="outline">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}
            <AlertDescription className="text-xs text-muted-foreground">
              Without an account, your short link will expire in 30 minutes. During this time, you can test the link and see how it works.
            </AlertDescription>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;