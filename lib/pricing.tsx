import { BarChart, BarChart2, Clock, Code, Globe, Link, Link2, ShieldCheck } from "lucide-react";
import { ReactElement } from "react";

export enum FeatureId {
  NumberOfLinks,
  TemporaryLinks,
  APIAccess,
  PrioritySupport,
  CustomLink,
  CustomDomain,
  LimitCustomDomain,
  SimpleAnalytics,
  BetterAnalytics,
}

enum PlanId {
  Free,
  Plus,
}

export const FeatureLimits: Record<FeatureId, Record<PlanId, number | boolean>> = {
  [FeatureId.NumberOfLinks]: {
    [PlanId.Free]: 50,
    [PlanId.Plus]: -1,
  },
  [FeatureId.TemporaryLinks]: {
    [PlanId.Free]: 10,
    [PlanId.Plus]: -1,
  },
  [FeatureId.APIAccess]: {
    [PlanId.Free]: 30,
    [PlanId.Plus]: -1,
  },
  [FeatureId.PrioritySupport]: {
    [PlanId.Free]: false,
    [PlanId.Plus]: true,
  },
  [FeatureId.CustomLink]: {
    [PlanId.Free]: false,
    [PlanId.Plus]: true,
  },
  [FeatureId.CustomDomain]: {
    [PlanId.Free]: false,
    [PlanId.Plus]: false,
  },
  [FeatureId.LimitCustomDomain]: {
    [PlanId.Free]: 0,
    [PlanId.Plus]: 5,
  },
  [FeatureId.SimpleAnalytics]: {
    [PlanId.Free]: true,
    [PlanId.Plus]: false,
  },
  [FeatureId.BetterAnalytics]: {
    [PlanId.Free]: false,
    [PlanId.Plus]: true,
  },
};

export type FeatureInfo = {
  icon: ReactElement;
  featureName: string;
  featureDescription: string;
}

export const FeatureInfos: Record<FeatureId, FeatureInfo> = {
  [FeatureId.NumberOfLinks]: {
    icon: <Link2 className="h-5 w-5" />,
    featureName: "Unlimited Links",
    featureDescription: "Generate as many links as you want.",
  },
  [FeatureId.TemporaryLinks]: {
    icon: <Clock className="h-5 w-5" />,
    featureName: "Temporary Links",
    featureDescription: "Set an expiration date for your links.",
  },
  [FeatureId.APIAccess]: {
    icon: <Code className="h-5 w-5" />,
    featureName: "API Access",
    featureDescription: "Integrate with your own services.",
  },
  [FeatureId.PrioritySupport]: {
    icon: <ShieldCheck className="h-5 w-5" />,
    featureName: "Priority Support",
    featureDescription: "Get help when you need it.",
  },
  [FeatureId.CustomLink]: {
    icon: <Link className="h-5 w-5" />,
    featureName: "Custom Link",
    featureDescription: "Create links with your own custom alias.",
  },
  [FeatureId.CustomDomain]: {
    icon: <Globe className="h-5 w-5" />,
    featureName: "Custom Domain",
    featureDescription: "Use your own domain for your links.",
  },
  [FeatureId.LimitCustomDomain]: {
    icon: <Globe className="h-5 w-5" />,
    featureName: "Custom Domain Limit",
    featureDescription: "Set a limit for custom domains.",
  },
  [FeatureId.SimpleAnalytics]: {
    icon: <BarChart2 className="h-5 w-5" />,
    featureName: "Simple Analytics",
    featureDescription: "View basic analytics for your links.",
  },
  [FeatureId.BetterAnalytics]: {
    icon: <BarChart className="h-5 w-5" />,
    featureName: "Better Analytics",
    featureDescription: "Get more detailed analytics for your links.",
  },
};

export type Feature = {
  id: FeatureId;
  display: string;
  available?: boolean;
}

export type Plan = {
  display: string;
  subtitle: string;
  price: number;
  features: Feature[];
}

export const plans: Plan[] = [
  {
    display: "Free",
    subtitle: "Perfect for beginners",
    price: 0,
    features: [
      { id: FeatureId.NumberOfLinks, display: "{limit} links limit", available: true },
      { id: FeatureId.TemporaryLinks, display: "{limit} temporary links", available: true },
      { id: FeatureId.SimpleAnalytics, display: "Simple analytics", available: true },
      { id: FeatureId.CustomDomain, display: "Custom domain", available: false },
    ],
  },
  {
    display: "Plus",
    subtitle: "For users who want more",
    price: 1.99,
    features: [
      { id: FeatureId.NumberOfLinks, display: "Unlimited links", available: true },
      { id: FeatureId.TemporaryLinks, display: "Unlimited temporary links", available: true },
      { id: FeatureId.BetterAnalytics, display: "Better analytics", available: true },
      { id: FeatureId.PrioritySupport, display: "Priority support", available: true },
      { id: FeatureId.CustomLink, display: "Generate links as you want", available: true },
      { id: FeatureId.LimitCustomDomain, display: "{limit} custom domains", available: false },
    ],
  }
];