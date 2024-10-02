import { Component } from "@/components/component";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Feature, FeatureLimits, plans } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { Check, Minus, X } from "lucide-react";
import { ReactElement } from "react";
import { OrganizationText } from "./organization.text";

const FeatureItem: Component<Feature & { notFree: boolean }> = ({ id, display, notFree, available }) => {
  return (
    <li className="flex items-center">
      <>
        {available ? (
          <>
            {FeatureLimits[id][notFree ? 1 : 0] !== false ? (
              <Check className={cn("mr-2 h-4 w-4", { "text-gold": notFree })} />
            ) : (
              <X className="mr-2 h-4 w-4 text-muted-foreground" />
            )}
          </>
        ) : (
          <Minus className="mr-2 h-4 w-4 text-muted-foreground" />
        )}
      </>
      <span>
        {display.replace("{limit}", FeatureLimits[id][notFree ? 1 : 0].toString())}
        {!available && notFree && <Badge className="ml-2 font-normal" variant={"outline"}>Not available yet</Badge>}
      </span>
    </li>
  )
}

const Page = (): ReactElement => {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {plans.map((plan, index) => (
          <div key={plan.display}>
            <Card className={`w-full ${index === 1 ? 'border-gold' : ''}`}>
              <CardHeader>
                <CardTitle className="text-2xl">{plan.display}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="text-4xl font-bold">
                  {plan.price === 0 ? 'Free' : `$${plan.price.toFixed(2)}`}
                  <span className="text-xl font-normal">{plan.price > 0 ? '/month' : ''}</span>
                </div>
                
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <FeatureItem key={feature.id} {...feature} notFree={plan.price > 0} />
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Button className="w-full" variant={index === 1 ? 'gold' : 'default'}>
                  {plan.price === 0 ? 'Get Started' : 'Upgrade'}
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>

      <div className="container mx-auto p-4 mt-7">
        <p className="text-center text-sm text-muted-foreground mb-3">
          You will be charged for the <OrganizationText /> organization, be sure to select the correct organization before upgrading.
        </p>

        <p className="text-center text-sm text-muted-foreground">
          * Prices are in USD. All plans come with a 14-day money back guarantee.
        </p>
      </div>
    </>
  );
}

export default Page;