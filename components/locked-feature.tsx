import { FeatureInfo } from "@/lib/pricing";
import { Component } from "./component";
import { buttonVariants } from "./ui/button";
import { cloneElement } from "react";
import Link from "next/link";

export const LockedFeature: Component<FeatureInfo> = ({ featureName, icon }) => {
  return (
    <Link href={"/pricing"} className={buttonVariants({ className: "flex items-center space-x-2", variant: "outline" })}>
      {cloneElement(icon, { className: "h-4 w-4" })}
      <span className="text-sm">{featureName}</span>
    </Link>
  );
}