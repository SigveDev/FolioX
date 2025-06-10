"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import LandingPageHeader from "@/components/landingpage/header";
import LandingPageFooter from "@/components/landingpage/footer";

export default function ExamplesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const examples = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "UX Designer",
      domain: "sarahchen.foliox.app",
      image: "/placeholder.svg?height=300&width=400",
      category: "UX Design",
      views: "2.1k",
      likes: 89,
      plan: "pro",
      featured: true,
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      title: "Frontend Developer",
      domain: "marcus.foliox.app",
      image: "/placeholder.svg?height=300&width=400",
      category: "Development",
      views: "1.8k",
      likes: 67,
      plan: "free",
    },
    {
      id: 3,
      name: "Emily Watson",
      title: "Brand Designer",
      domain: "emilywatson.foliox.app",
      image: "/placeholder.svg?height=300&width=400",
      category: "Branding",
      views: "3.2k",
      likes: 124,
      plan: "pro",
    },
    {
      id: 4,
      name: "David Kim",
      title: "Product Designer",
      domain: "davidkim.foliox.app",
      image: "/placeholder.svg?height=300&width=400",
      category: "Product Design",
      views: "1.5k",
      likes: 45,
      plan: "free",
    },
    {
      id: 5,
      name: "Lisa Thompson",
      title: "Graphic Designer",
      domain: "lisathompson.foliox.app",
      image: "/placeholder.svg?height=300&width=400",
      category: "Graphic Design",
      views: "2.7k",
      likes: 98,
      plan: "pro",
    },
    {
      id: 6,
      name: "Alex Johnson",
      title: "Web Developer",
      domain: "alexjohnson.foliox.app",
      image: "/placeholder.svg?height=300&width=400",
      category: "Development",
      views: "1.9k",
      likes: 56,
      plan: "free",
    },
  ];

  const categories = [
    "All",
    "UX Design",
    "Development",
    "Branding",
    "Product Design",
    "Graphic Design",
  ];

  const filteredExamples = examples.filter(
    (example) =>
      selectedCategory === "All" || example.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <LandingPageHeader activeSection="examples" />

      <div className="container py-16 mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Portfolio Examples
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get inspired by these beautiful portfolios created with FolioX. See
            what's possible with our platform.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === selectedCategory ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Portfolio */}
        {examples
          .filter((example) => example.featured)
          .map((example) => (
            <Card key={example.id} className="mb-12 overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-video md:aspect-auto">
                  <img
                    src={example.image || "/placeholder.svg"}
                    alt={`${example.name}'s portfolio`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary">Featured</Badge>
                    <Badge
                      variant={example.plan === "pro" ? "default" : "outline"}
                    >
                      {example.plan === "pro" ? "Pro" : "Free"}
                    </Badge>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{example.name}</h2>
                  <p className="text-lg text-muted-foreground mb-4">
                    {example.title}
                  </p>
                  <p className="text-muted-foreground mb-6">
                    A stunning portfolio showcasing innovative{" "}
                    {example.category.toLowerCase()} work with detailed case
                    studies and beautiful presentation.
                  </p>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{example.views} views</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{example.likes} likes</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button asChild>
                      <Link href={`/portfolio/${example.domain.split(".")[0]}`}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Portfolio
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/signup">Use This Template</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExamples
            .filter((example) => !example.featured)
            .map((example) => (
              <Card
                key={example.id}
                className="group hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={example.image || "/placeholder.svg"}
                    alt={`${example.name}'s portfolio`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline">{example.category}</Badge>
                    <Badge
                      variant={example.plan === "pro" ? "default" : "secondary"}
                    >
                      {example.plan === "pro" ? "Pro" : "Free"}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{example.name}</h3>
                  <p className="text-muted-foreground mb-4">{example.title}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{example.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{example.likes}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" className="flex-1" asChild>
                      <Link href={`/portfolio/${example.domain.split(".")[0]}`}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/signup">Use Template</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 py-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Create Your Portfolio?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join these talented professionals and start showcasing your work
            with FolioX today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/signup">Start Building Free</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <LandingPageFooter />
    </div>
  );
}
