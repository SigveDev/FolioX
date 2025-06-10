import {
  ArrowRight,
  Check,
  Layout,
  Palette,
  BarChart3,
  Globe,
  Smartphone,
  Monitor,
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
import Link from "next/link";
import LandingPageHeader from "@/components/landingpage/header";
import LandingPageFooter from "@/components/landingpage/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <LandingPageHeader activeSection="home" />

      {/* Hero Section */}
      <section className="py-20 px-8">
        <div className="container max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            ✨ Now in Beta
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Create Beautiful
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Case Study{" "}
            </span>
            Portfolios
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            FolioX helps freelancers, creators, and professionals build
            stunning, story-driven portfolios that showcase their best work with
            detailed case studies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/signup">
                Start Building Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8"
              asChild
            >
              <Link href="/examples">View Examples</Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Free forever • No credit card required • 2 projects included
          </p>
        </div>
      </section>

      {/* Features Overview */}
      <section id="features" className="py-20 px-8 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Two Tiers, Endless Possibilities
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start with our structured free tier, then upgrade to Pro for
              complete creative control with our drag-and-drop builder.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Free Tier */}
            <Card className="relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">Free Tier</CardTitle>
                  <Badge variant="secondary">Always Free</Badge>
                </div>
                <CardDescription>
                  Perfect for getting started with professional portfolios
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Up to 2 projects</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Predefined layout templates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>FolioX subdomain (yourname.foliox.app)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Basic profile settings</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Mobile responsive design</span>
                </div>
              </CardContent>
            </Card>

            {/* Pro Tier */}
            <Card className="relative border-blue-200 bg-gradient-to-br from-blue-50/50 to-purple-50/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">Pro Tier</CardTitle>
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600">
                    Most Popular
                  </Badge>
                </div>
                <CardDescription>
                  Full creative control with advanced features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Unlimited projects</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Drag-and-drop builder</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Custom domain support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Advanced analytics & insights</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Full layout customization</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Priority support</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feature Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-3">
                <Layout className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-1">Smart Templates</h3>
              <p className="text-sm text-muted-foreground">
                Pre-designed layouts optimized for case studies
              </p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mx-auto mb-3">
                <Palette className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-1">Drag & Drop</h3>
              <p className="text-sm text-muted-foreground">
                Visual builder with complete creative control
              </p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-1">Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Track views and engagement on your projects
              </p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center mx-auto mb-3">
                <Globe className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-1">Custom Domain</h3>
              <p className="text-sm text-muted-foreground">
                Use your own domain for professional branding
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* User Journey */}
      <section className="py-20 px-8">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How FolioX Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Simple steps to create your professional portfolio
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Free User Journey */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Badge variant="outline" className="mr-3">
                  Free
                </Badge>
                Getting Started
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-semibold text-sm">
                      1
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Sign Up</h4>
                    <p className="text-muted-foreground">
                      Create account with email or social login
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-semibold text-sm">
                      2
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Choose Template</h4>
                    <p className="text-muted-foreground">
                      Pick from 3 professional layout templates
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-semibold text-sm">
                      3
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Create Projects</h4>
                    <p className="text-muted-foreground">
                      Add up to 3 projects with guided form interface
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-semibold text-sm">
                      4
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Share & Grow</h4>
                    <p className="text-muted-foreground">
                      Get your yourname.foliox.app link and start sharing
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pro User Journey */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Badge className="mr-3 bg-gradient-to-r from-blue-600 to-purple-600">
                  Pro
                </Badge>
                Advanced Creation
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-600 font-semibold text-sm">
                      1
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Upgrade to Pro</h4>
                    <p className="text-muted-foreground">
                      Unlock unlimited projects and advanced features
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-600 font-semibold text-sm">
                      2
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Design Freedom</h4>
                    <p className="text-muted-foreground">
                      Use drag-and-drop builder with custom blocks
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-600 font-semibold text-sm">
                      3
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Rich Content</h4>
                    <p className="text-muted-foreground">
                      Add videos, testimonials, metrics, and embeds
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-600 font-semibold text-sm">
                      4
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Custom Domain</h4>
                    <p className="text-muted-foreground">
                      Connect your own domain for professional branding
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-8 bg-muted/30">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground">
              Start free, upgrade when you need more power
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <Card>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">Free</CardTitle>
                <div className="text-4xl font-bold">$0</div>
                <CardDescription>Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>2 projects</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Template layouts</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>FolioX subdomain</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Mobile responsive</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Basic analytics</span>
                </div>
                <Button className="w-full mt-6" variant="outline" asChild>
                  <Link href="/signup">Get Started Free</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="border-blue-200 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-blue-600 to-purple-600">
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">Pro</CardTitle>
                <div className="text-4xl font-bold">
                  $15
                  <span className="text-lg font-normal text-muted-foreground">
                    /month
                  </span>
                </div>
                <CardDescription>For serious professionals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Unlimited projects</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Drag-and-drop builder</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Custom domain</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Advanced analytics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Priority support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Custom themes</span>
                </div>
                <Button
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  asChild
                >
                  <Link href="/signup">Start Pro Trial</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground">
              All plans include SSL, CDN, and 99.9% uptime guarantee
            </p>
          </div>
        </div>
      </section>

      {/* Responsive Design */}
      <section className="py-20 px-8">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for Every Device
            </h2>
            <p className="text-xl text-muted-foreground">
              Your portfolio looks perfect on desktop, tablet, and mobile
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Monitor className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Desktop</h3>
              <p className="text-muted-foreground">
                Full-featured experience with drag-and-drop builder
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 rounded-lg bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <Layout className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Tablet</h3>
              <p className="text-muted-foreground">
                Optimized layouts that adapt beautifully to tablets
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 rounded-lg bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Mobile</h3>
              <p className="text-muted-foreground">
                Touch-friendly interface perfect for mobile browsing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Build Your Portfolio?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of professionals who trust FolioX to showcase their
            best work
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8"
              asChild
            >
              <Link href="/signup">
                Start Building Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-white text-white bg-transparent hover:bg-white hover:text-blue-600"
              asChild
            >
              <Link href="/examples">View Live Examples</Link>
            </Button>
          </div>
          <p className="text-sm mt-4 opacity-75">
            No credit card required • 14-day Pro trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <LandingPageFooter />
    </div>
  );
}
