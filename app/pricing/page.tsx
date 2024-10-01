import { Component } from "@/components/component";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Feature, FeatureLimits, plans } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { ReactElement } from "react";

const FeatureItem: Component<Feature & { notFree: boolean }> = ({ id, display, notFree }) => {
  return (
    <li className="flex items-center">
      {FeatureLimits[id][notFree ? 1 : 0] !== false ? (
        <Check className={cn("mr-2 h-4 w-4", { "text-gold": notFree })} />
      ) : (
        <X className="mr-2 h-4 w-4 text-muted-foreground" />
      )}
      <span>
        {display.replace("{limit}", FeatureLimits[id][notFree ? 1 : 0].toString())}
      </span>
    </li>
  )
}

const Page = (): ReactElement => {
  return (
    <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
      {plans.map((plan, index) => (
        <Card key={plan.display} className={`w-full ${index === 1 ? 'border-gold' : ''}`}>
          <CardHeader>
            <CardTitle className="text-2xl">{plan.display}</CardTitle>
              <CardDescription>{plan.subtitle}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
            <div className="text-4xl font-bold">
              {plan.price === 0 ? 'Free' : `${plan.price.toFixed(2)}€`}
              <span className="text-xl font-normal">{plan.price > 0 ? '/months' : ''}</span>
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
      ))}
    </div>
  );
}

export default Page;