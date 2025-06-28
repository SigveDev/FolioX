"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { PricingPlans } from "@/types/pricing-plans";
import { Check, CreditCard, Crown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PricingCards({ plans }: { plans: PricingPlans }) {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <>
      {/* Billing Toggle */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Choose Your Plan
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Start free and upgrade when you need more power. All plans include our
          core features.
        </p>
        <div className="flex items-center justify-center space-x-4 mb-8">
          <span
            className={`text-sm ${
              !isYearly ? "font-semibold" : "text-muted-foreground"
            }`}
          >
            Monthly
          </span>
          <Switch checked={isYearly} onCheckedChange={setIsYearly} />
          <span
            className={`text-sm ${
              isYearly ? "font-semibold" : "text-muted-foreground"
            }`}
          >
            Yearly
          </span>
          {isYearly && (
            <Badge variant="secondary" className="ml-2">
              Save 17%
            </Badge>
          )}
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
        {/* Free Plan */}
        <Card className="relative flex flex-col">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl">{plans.free.name}</CardTitle>
            <CardDescription className="text-base">
              {plans.free.description}
            </CardDescription>
            <div className="text-4xl font-bold mt-4">
              ${plans.free.price.monthly}
              <span className="text-lg font-normal text-muted-foreground">
                /month
              </span>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              {plans.free.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <Button className="w-full mt-6" variant="outline" asChild>
                <Link href="/signup">Get Started Free</Link>
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Free for ever • No credit card required
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Pro Plan */}
        <Card className="relative border-blue-200 bg-gradient-to-br from-blue-50/50 to-purple-50/50 flex flex-col">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Crown className="mr-1 h-3 w-3" />
              Most Popular
            </Badge>
          </div>
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl">{plans.pro.name}</CardTitle>
            <CardDescription className="text-base">
              {plans.pro.description}
            </CardDescription>
            <div className="text-4xl font-bold mt-4">
              $
              {isYearly
                ? Math.round(plans.pro.price.yearly / 12)
                : plans.pro.price.monthly}
              <span className="text-lg font-normal text-muted-foreground">
                /month
              </span>
            </div>
            {isYearly && (
              <p className="text-sm text-muted-foreground">
                Billed annually (${plans.pro.price.yearly}/year)
              </p>
            )}
          </CardHeader>
          <CardContent className="flex flex-1 flex-col justify-between">
            <div className="space-y-4">
              {plans.pro.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <Button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <CreditCard className="mr-2 h-4 w-4" />
                Start Pro Trial
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                14-day free trial • No credit card required
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
