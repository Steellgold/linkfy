import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-[470px] sm:max-w-[600px]">
        <CardHeader>
          <Image src="https://nextjs.org/icons/next.svg" alt="Geist UI" width={200} height={50} />
        </CardHeader>
        <CardContent>
          <CardDescription>
            Welcome to the Linkfy app. This is a simple app to share links with your friends.
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Button>Get Started</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
