export type PricingPlan = {
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: string[];
  popular?: boolean;
};

export type PricingPlans = {
  free: PricingPlan;
  pro: PricingPlan;
};
