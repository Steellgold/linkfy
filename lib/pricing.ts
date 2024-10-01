enum FeatureId {
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
      { id: FeatureId.NumberOfLinks, display: "{limit} links limit" },
      { id: FeatureId.TemporaryLinks, display: "{limit} temporary links" },
      { id: FeatureId.APIAccess, display: "{limit} API requests per day" },
      { id: FeatureId.SimpleAnalytics, display: "Simple analytics" },
      { id: FeatureId.PrioritySupport, display: "Priority support" },
      { id: FeatureId.CustomLink, display: "Generate links as you want" },
      { id: FeatureId.CustomDomain, display: "Custom domain" },
    ],
  },
  {
    display: "Plus",
    subtitle: "For users who want more",
    price: 1.99,
    features: [
      { id: FeatureId.NumberOfLinks, display: "Unlimited links" },
      { id: FeatureId.TemporaryLinks, display: "Unlimited temporary links" },
      { id: FeatureId.APIAccess, display: "Unlimited API requests per day" },
      { id: FeatureId.BetterAnalytics, display: "Better analytics" },
      { id: FeatureId.PrioritySupport, display: "Priority support" },
      { id: FeatureId.CustomLink, display: "Generate links as you want" },
      { id: FeatureId.LimitCustomDomain, display: "{limit} custom domains" },
    ],
  }
];