import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy, ExternalLink, Link2 } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Ridiculously long URL? We got you.</CardTitle>
          <CardDescription>Enter your long URL below to generate a short URL.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex space-x-2">
              <Input
                type="url"
                placeholder="Enter your long URL here"
                autoFocus
                className="flex-grow"
              />
              
              <Button type="submit">
                <Link2 className="h-4 w-4" />
                <span className="sr-only">Generate Short URL</span>
              </Button>
            </div>

            <Alert>
              <AlertDescription className="flex sm:items-center gap-3 sm:gap-0 flex-col sm:flex-row sm:justify-between">
                <span className="flex flex-col">
                  <span className="text-sm font-medium truncate">https://example.com</span>
                  <span className="text-xs text-muted-foreground">Expires in 30 minutes</span>
                </span>

                <div className="flex gap-2">
                  <Link href="https://example.com" target="_blank" className={buttonVariants({ variant: "outline" })}>
                    <ExternalLink className="h-4 w-4 mr-1" />
                    <span>Open link</span>
                  </Link>

                  <Button variant="outline">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </AlertDescription>
            </Alert>

            <AlertDescription className="text-xs text-muted-foreground">
              Without an account, your short link will expire in 30 minutes. During this time, you can test the link and see how it works.
            </AlertDescription>
          </div>

          {/* {"https://example.com" ? (
            <div className="space-y-2">
              <div className="p-3 bg-secondary rounded-md flex items-center justify-between">
                <span className="text-sm font-medium truncate">{shortUrl}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy short URL</span>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Tip: This link is valid for 30 minutes for testing purposes only.
              </p>
            </div>
          )} */}

          {/* <div className="space-y-2">
            <h3 className="text-sm">Upgrade to unlock more features like:</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[FeatureId.CustomLink, FeatureId.CustomDomain, FeatureId.BetterAnalytics].map((feature, index) => <LockedFeature key={index} {...FeatureInfos[feature]} />)}
            </div>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;