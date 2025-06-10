"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, User, FileText, Presentation, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function CreatePage() {
  const [userPlan] = useState("free") // or "pro"
  const [selectedType, setSelectedType] = useState(null)

  const creationTypes = [
    {
      id: "portfolio",
      name: "Portfolio",
      description: "Create a complete professional portfolio with your bio, experience, and selected projects",
      icon: User,
      features: [
        "Personal information & bio",
        "Education & work experience",
        "Skills & achievements",
        "Project selection & linking",
        "Contact information",
        "Social media integration",
      ],
      color: "blue",
      available: true,
    },
    {
      id: "project",
      name: "Project Showcase",
      description: "Showcase a single project with images, descriptions, and key highlights",
      icon: Presentation,
      features: [
        "Project overview",
        "Image galleries",
        "Key features & highlights",
        "Technologies used",
        "Live demo links",
        "Quick project summary",
      ],
      color: "green",
      available: true,
    },
    {
      id: "case-study",
      name: "Case Study",
      description: "Create detailed, story-driven case studies with research, process, and results",
      icon: FileText,
      features: [
        "Problem & solution framework",
        "Research & discovery",
        "Design process documentation",
        "Results & metrics",
        "Lessons learned",
        "Detailed methodology",
      ],
      color: "purple",
      available: true,
    },
  ]

  if (!selectedType) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
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
            <Badge
              variant={userPlan === "pro" ? "default" : "secondary"}
              className={userPlan === "pro" ? "bg-gradient-to-r from-blue-600 to-purple-600" : ""}
            >
              {userPlan === "pro" && <Crown className="mr-1 h-3 w-3" />}
              {userPlan === "pro" ? "Pro Plan" : "Free Plan"}
            </Badge>
          </div>
        </header>

        <div className="container py-16 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">What would you like to create?</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the type of content you want to create. Each option is designed for different purposes and
              storytelling approaches.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {creationTypes.map((type) => {
              const IconComponent = type.icon
              const colorClasses = {
                blue: "bg-blue-100 text-blue-600 border-blue-200 hover:border-blue-300",
                green: "bg-green-100 text-green-600 border-green-200 hover:border-green-300",
                purple: "bg-purple-100 text-purple-600 border-purple-200 hover:border-purple-300",
              }

              return (
                <Card
                  key={type.id}
                  className={`cursor-pointer transition-all hover:shadow-lg border-2 ${
                    selectedType?.id === type.id ? `ring-2 ring-${type.color}-500 shadow-lg` : ""
                  }`}
                  onClick={() => setSelectedType(type)}
                >
                  <CardHeader className="text-center">
                    <div
                      className={`h-16 w-16 rounded-lg ${colorClasses[type.color]} flex items-center justify-center mx-auto mb-4`}
                    >
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-xl">{type.name}</CardTitle>
                    <CardDescription className="text-center">{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm font-medium">Includes:</p>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        {type.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <div className={`h-1.5 w-1.5 rounded-full bg-${type.color}-500 mr-2`} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {selectedType?.id === type.id && <Badge className={`mt-4 bg-${type.color}-500`}>Selected</Badge>}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              disabled={!selectedType}
              onClick={() => {
                if (selectedType) {
                  // Navigate to the appropriate creation flow
                  window.location.href = `/create/${selectedType.id}`
                }
              }}
              className="px-8"
            >
              Continue with {selectedType?.name || "Selection"}
              <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
            </Button>
            {userPlan === "free" && (
              <p className="text-sm text-muted-foreground mt-4">
                Want unlimited projects and advanced features?{" "}
                <Link href="/pricing" className="text-blue-600 hover:underline">
                  Upgrade to Pro
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return null
}
