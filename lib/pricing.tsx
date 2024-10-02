import { Globe, LifeBuoy, Link2, MousePointerClick, Users } from "lucide-react";
import { ReactElement } from "react";

export enum FeatureId {
  NewLinksPerMonth,
  TeamSize,
  CustomDomain,
  PrioritySupport,
  RealtimeEvents,
}

enum PlanId {
  Free,
  Pro,
  Business,
}

export const FeatureLimits: Record<FeatureId, Record<PlanId, number | boolean>> = {
  [FeatureId.NewLinksPerMonth]: {
    [PlanId.Free]: 30,
    [PlanId.Pro]: 1000,
    [PlanId.Business]: true,
  },
  [FeatureId.TeamSize]: {
    [PlanId.Free]: 1,
    [PlanId.Pro]: 5,
    [PlanId.Business]: 20,
  },
  [FeatureId.CustomDomain]: {
    [PlanId.Free]: 3,
    [PlanId.Pro]: 5,
    [PlanId.Business]: 50,
  },
  [FeatureId.PrioritySupport]: {
    [PlanId.Free]: false,
    [PlanId.Pro]: true,
    [PlanId.Business]: true,
  },
  [FeatureId.RealtimeEvents]: {
    [PlanId.Free]: false,
    [PlanId.Pro]: false,
    [PlanId.Business]: true,
  },
};

export type FeatureInfo = {
  icon: ReactElement;
  featureName: string;
  featureDescription: string;
}

export const features: Record<FeatureId, FeatureInfo> = {
  [FeatureId.NewLinksPerMonth]: {
    icon: <Link2 size={24} />,
    featureName: "New links per month",
    featureDescription: "The number of new links you can create per month.",
  },
  [FeatureId.TeamSize]: {
    icon: <Users size={24} />,
    featureName: "Team size",
    featureDescription: "The number of team members you can invite.",
  },
  [FeatureId.CustomDomain]: {
    icon: <Globe size={24} />,
    featureName: "Custom domain",
    featureDescription: "Use your own domain for your links.",
  },
  [FeatureId.PrioritySupport]: {
    icon: <LifeBuoy size={24} />,
    featureName: "Priority support",
    featureDescription: "Get faster support for your issues.",
  },
  [FeatureId.RealtimeEvents]: {
    icon: <MousePointerClick size={24} />,
    featureName: "Realtime events",
    featureDescription: "Get realtime events for your links.",
  },
};

export type Feature = {
  id: FeatureId;
  display: string;
  available?: boolean;
}

export type Plan = {
  display: string;
  price: number;
  features: Feature[];
}

export const plans: Plan[] = [
  {
    display: "Pro",
    price: 5.99,
    features: [
      { id: FeatureId.NewLinksPerMonth, display: "30 new links per month", available: true },
      { id: FeatureId.TeamSize, display: "5 team members", available: true },
      { id: FeatureId.CustomDomain, display: "5 custom domains", available: true },
      { id: FeatureId.PrioritySupport, display: "Priority support", available: true },
      { id: FeatureId.RealtimeEvents, display: "Realtime events", available: false },
    ],
  },
  {
    display: "Business",
    price: 9.99,
    features: [
      { id: FeatureId.NewLinksPerMonth, display: "Unlimited new links per month", available: true },
      { id: FeatureId.TeamSize, display: "20 team members", available: true },
      { id: FeatureId.CustomDomain, display: "50 custom domains", available: true },
      { id: FeatureId.PrioritySupport, display: "Priority support", available: true },
      { id: FeatureId.RealtimeEvents, display: "Realtime events", available: false },
    ]
  }
];