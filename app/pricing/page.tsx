"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Crown, ArrowLeft, CreditCard, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import LandingPageHeader from "@/components/landingpage/header";
import LandingPageFooter from "@/components/landingpage/footer";

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = {
    free: {
      name: "Free",
      description: "Perfect for getting started",
      price: { monthly: 0, yearly: 0 },
      features: [
        "2 projects",
        "Template layouts",
        "FolioX subdomain",
        "Mobile responsive",
        "Basic analytics",
        "Community support",
      ],
    },
    pro: {
      name: "Pro",
      description: "For serious professionals",
      price: { monthly: 15, yearly: 144 },
      features: [
        "Unlimited projects",
        "Drag-and-drop builder",
        "Custom domain",
        "Advanced analytics",
        "Priority support",
        "Custom themes",
        "SEO optimization",
        "Export portfolio",
      ],
      popular: true,
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <LandingPageHeader activeSection="pricing" />

      <div className="container py-16 max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start free and upgrade when you need more power. All plans include
            our core features.
          </p>

          {/* Billing Toggle */}
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
          <Card className="relative">
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
            <CardContent className="space-y-4">
              {plans.free.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
              <Button className="w-full mt-6" variant="outline" asChild>
                <Link href="/signup">Get Started Free</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="relative border-blue-200 bg-gradient-to-br from-blue-50/50 to-purple-50/50">
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
            <CardContent className="space-y-4">
              {plans.pro.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
              <Button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <CreditCard className="mr-2 h-4 w-4" />
                Start Pro Trial
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                14-day free trial • No credit card required
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features Comparison */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Comparison
          </h2>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-semibold">Features</th>
                      <th className="text-center p-4 font-semibold">Free</th>
                      <th className="text-center p-4 font-semibold">Pro</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4">Number of projects</td>
                      <td className="text-center p-4">2</td>
                      <td className="text-center p-4">Unlimited</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4">Template layouts</td>
                      <td className="text-center p-4">
                        <Check className="h-5 w-5 text-green-600 mx-auto" />
                      </td>
                      <td className="text-center p-4">
                        <Check className="h-5 w-5 text-green-600 mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4">Drag-and-drop builder</td>
                      <td className="text-center p-4">-</td>
                      <td className="text-center p-4">
                        <Check className="h-5 w-5 text-green-600 mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4">Custom domain</td>
                      <td className="text-center p-4">-</td>
                      <td className="text-center p-4">
                        <Check className="h-5 w-5 text-green-600 mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4">Advanced analytics</td>
                      <td className="text-center p-4">Basic</td>
                      <td className="text-center p-4">
                        <Check className="h-5 w-5 text-green-600 mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4">Priority support</td>
                      <td className="text-center p-4">-</td>
                      <td className="text-center p-4">
                        <Check className="h-5 w-5 text-green-600 mx-auto" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trust Indicators */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Secure & Reliable</h3>
            <p className="text-sm text-muted-foreground">
              SSL encryption, 99.9% uptime, and regular backups
            </p>
          </div>
          <div className="text-center">
            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">
              Global CDN ensures your portfolio loads instantly
            </p>
          </div>
          <div className="text-center">
            <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Cancel Anytime</h3>
            <p className="text-sm text-muted-foreground">
              No long-term contracts. Cancel or change plans anytime
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Can I upgrade or downgrade anytime?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! You can upgrade to Pro anytime to unlock unlimited
                  projects and advanced features. You can also downgrade, though
                  you'll need to reduce your projects to 2 or fewer.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  What happens to my data if I cancel?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your portfolio remains accessible for 30 days after
                  cancellation. You can export your data anytime, and we'll help
                  you migrate to another platform if needed.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you offer refunds?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We offer a 14-day free trial for Pro plans. If you're not
                  satisfied within the first 30 days of your paid subscription,
                  we'll provide a full refund.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of professionals showcasing their work with FolioX
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/signup">Start Free Trial</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/examples">View Examples</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <LandingPageFooter />
    </div>
  );
}
