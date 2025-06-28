"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  Download,
  Calendar,
  Crown,
  AlertCircle,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function BillingPage() {
  const [currentPlan] = useState("free"); // or "pro"

  const billingHistory = [
    {
      id: 1,
      date: "Dec 1, 2025",
      description: "Pro Plan - Monthly",
      amount: "$15.00",
      status: "paid",
      invoice: "INV-001",
    },
    {
      id: 2,
      date: "Nov 1, 2025",
      description: "Pro Plan - Monthly",
      amount: "$15.00",
      status: "paid",
      invoice: "INV-002",
    },
    {
      id: 3,
      date: "Oct 1, 2025",
      description: "Pro Plan - Monthly",
      amount: "$15.00",
      status: "paid",
      invoice: "INV-003",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">FX</span>
              </div>
              <span className="font-bold">FolioX</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">Billing & Subscription</h1>
            <p className="text-muted-foreground mt-2">
              Manage your subscription and billing information
            </p>
          </div>

          {/* Current Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Current Plan
                <Badge
                  variant={currentPlan === "pro" ? "default" : "secondary"}
                  className="ml-2"
                >
                  {currentPlan === "pro" ? (
                    <>
                      <Crown className="mr-1 h-3 w-3" />
                      Pro
                    </>
                  ) : (
                    "Free"
                  )}
                </Badge>
              </CardTitle>
              <CardDescription>
                {currentPlan === "pro"
                  ? "You have access to all Pro features including unlimited projects and drag-and-drop builder"
                  : "You're currently on the free plan with access to 2 projects and template layouts"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentPlan === "free" ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Plan</span>
                    <span className="font-medium">Free Forever</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Projects</span>
                    <span className="font-medium">2 / 2 used</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Features</span>
                    <span className="font-medium">
                      Template layouts, Basic analytics
                    </span>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h4 className="font-semibold">Upgrade to Pro</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-600" />
                        <span>Unlimited projects</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-600" />
                        <span>Drag-and-drop builder</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-600" />
                        <span>Custom domain</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-600" />
                        <span>Advanced analytics</span>
                      </div>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                      asChild
                    >
                      <Link href="/pricing">Upgrade to Pro - $15/month</Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Plan</span>
                    <span className="font-medium">Pro Monthly</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Price</span>
                    <span className="font-medium">$15.00 / month</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Next billing date</span>
                    <span className="font-medium">January 1, 2025</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Payment method</span>
                    <span className="font-medium">•••• •••• •••• 4242</span>
                  </div>
                  <Separator />
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">
                      Update Payment Method
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Switch to Yearly (Save 20%)
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full text-red-600 hover:text-red-700"
                  >
                    Cancel Subscription
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Method */}
          {currentPlan === "pro" && (
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>
                  Manage your payment information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="h-10 w-10 rounded bg-blue-100 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-sm text-muted-foreground">
                      Expires 12/2027
                    </p>
                  </div>
                  <Badge variant="secondary">Default</Badge>
                </div>
                <Button variant="outline" className="w-full">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Update Payment Method
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Billing History */}
          {currentPlan === "pro" && (
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>
                  Download invoices and view payment history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {billingHistory.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded bg-green-100 flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">{item.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-medium">{item.amount}</p>
                          <Badge variant="secondary" className="text-xs">
                            {item.status}
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Invoice
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Usage */}
          <Card>
            <CardHeader>
              <CardTitle>Usage</CardTitle>
              <CardDescription>Current usage for your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Projects</span>
                <span className="font-medium">
                  {currentPlan === "pro" ? "5 / Unlimited" : "2 / 2"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Storage</span>
                <span className="font-medium">
                  2.1 GB / {currentPlan === "pro" ? "100 GB" : "1 GB"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Bandwidth</span>
                <span className="font-medium">
                  45 GB / {currentPlan === "pro" ? "Unlimited" : "10 GB"}
                </span>
              </div>
              {currentPlan === "free" && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    You're approaching your storage limit. Consider upgrading to
                    Pro for unlimited storage.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Support */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
              <CardDescription>
                Get support with billing questions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                If you have any questions about your billing or need help with
                your subscription, our support team is here to help.
              </p>
              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">
                  Contact Support
                </Button>
                <Button variant="outline" className="flex-1">
                  View FAQ
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
