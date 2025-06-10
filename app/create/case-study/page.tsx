"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Upload, Plus, Trash2, Save, Eye, Layout, Palette, Monitor, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function CreateCaseStudyPage() {
  const [userPlan] = useState("free") // or "pro"
  const [step, setStep] = useState("template") // Always start with template
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  const [caseStudyData, setCaseStudyData] = useState({
    title: "",
    description: "",
    category: "",
    tags: [],
    coverImage: null,
    client: "",
    duration: "",
    team: "",
    role: "",
    sections: [],
    metrics: [],
  })

  const templates = [
    {
      id: 1,
      name: "UX Research Study",
      description: "Perfect for user research projects and UX design case studies",
      image: "/placeholder.svg?height=200&width=300",
      category: "UX Research",
      features: ["Research methodology", "User insights", "Design solutions", "Testing results", "Impact metrics"],
      sections: [
        {
          id: 1,
          type: "background",
          title: "Project Background",
          content: "",
          placeholder: "What was the business problem or user need that sparked this project?",
        },
        {
          id: 2,
          type: "research",
          title: "Research & Discovery",
          content: "",
          placeholder: "What research methods did you use? What did you discover about users?",
        },
        {
          id: 3,
          type: "insights",
          title: "Key Insights",
          content: "",
          placeholder: "What were the most important insights from your research?",
        },
        {
          id: 4,
          type: "solution",
          title: "Design Solution",
          content: "",
          placeholder: "How did you translate insights into design solutions?",
        },
        {
          id: 5,
          type: "testing",
          title: "Testing & Validation",
          content: "",
          placeholder: "How did you test and validate your design solutions?",
        },
        {
          id: 6,
          type: "results",
          title: "Results & Impact",
          content: "",
          placeholder: "What were the measurable outcomes and business impact?",
        },
      ],
      suggestedCategories: ["UX Research", "User Testing", "Design Strategy"],
      suggestedTags: ["User Research", "Usability Testing", "Design Thinking", "Data Analysis", "User Experience"],
    },
    {
      id: 2,
      name: "Product Development",
      description: "Ideal for end-to-end product development and feature launch case studies",
      image: "/placeholder.svg?height=200&width=300",
      category: "Product",
      features: ["Market analysis", "Product strategy", "Development process", "Launch metrics", "User adoption"],
      sections: [
        {
          id: 1,
          type: "opportunity",
          title: "Market Opportunity",
          content: "",
          placeholder: "What market opportunity or user need did you identify?",
        },
        {
          id: 2,
          type: "strategy",
          title: "Product Strategy",
          content: "",
          placeholder: "What was your product strategy and approach?",
        },
        {
          id: 3,
          type: "development",
          title: "Development Process",
          content: "",
          placeholder: "How did you approach the development and what challenges did you face?",
        },
        {
          id: 4,
          type: "launch",
          title: "Launch & Go-to-Market",
          content: "",
          placeholder: "How did you launch the product and what was your go-to-market strategy?",
        },
        {
          id: 5,
          type: "metrics",
          title: "Success Metrics",
          content: "",
          placeholder: "What metrics did you track and what were the results?",
        },
        {
          id: 6,
          type: "learnings",
          title: "Key Learnings",
          content: "",
          placeholder: "What did you learn from this project and what would you do differently?",
        },
      ],
      suggestedCategories: ["Product Management", "Product Strategy", "Feature Development"],
      suggestedTags: ["Product Strategy", "Market Research", "Agile Development", "Product Launch", "KPIs"],
    },
    {
      id: 3,
      name: "Business Solution",
      description: "Great for business consulting projects and strategic initiatives",
      image: "/placeholder.svg?height=200&width=300",
      category: "Business",
      features: ["Problem analysis", "Strategic framework", "Implementation plan", "Change management", "ROI analysis"],
      sections: [
        {
          id: 1,
          type: "challenge",
          title: "Business Challenge",
          content: "",
          placeholder: "What was the specific business challenge or opportunity?",
        },
        {
          id: 2,
          type: "analysis",
          title: "Situation Analysis",
          content: "",
          placeholder: "What analysis did you conduct to understand the situation?",
        },
        {
          id: 3,
          type: "framework",
          title: "Strategic Framework",
          content: "",
          placeholder: "What framework or methodology did you use to approach the problem?",
        },
        {
          id: 4,
          type: "solution",
          title: "Recommended Solution",
          content: "",
          placeholder: "What solution did you recommend and why?",
        },
        {
          id: 5,
          type: "implementation",
          title: "Implementation",
          content: "",
          placeholder: "How was the solution implemented and what challenges arose?",
        },
        {
          id: 6,
          type: "impact",
          title: "Business Impact",
          content: "",
          placeholder: "What was the measurable business impact and ROI?",
        },
      ],
      suggestedCategories: ["Business Strategy", "Consulting", "Process Improvement"],
      suggestedTags: ["Strategy", "Business Analysis", "Change Management", "ROI", "Process Optimization"],
    },
  ]

  const [newTag, setNewTag] = useState("")

  const addTag = () => {
    if (newTag.trim() && !caseStudyData.tags.includes(newTag.trim())) {
      setCaseStudyData({
        ...caseStudyData,
        tags: [...caseStudyData.tags, newTag.trim()],
      })
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove) => {
    setCaseStudyData({
      ...caseStudyData,
      tags: caseStudyData.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  const updateSection = (sectionId, field, value) => {
    setCaseStudyData({
      ...caseStudyData,
      sections: caseStudyData.sections.map((section) =>
        section.id === sectionId ? { ...section, [field]: value } : section,
      ),
    })
  }

  const selectTemplate = (template) => {
    setSelectedTemplate(template)
    setCaseStudyData({
      ...caseStudyData,
      sections: template.sections.map((section) => ({ ...section })),
      category: template.suggestedCategories[0] || "",
      tags: [...template.suggestedTags.slice(0, 3)] || [],
    })
  }

  // Template Selection Step
  if (step === "template") {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/create">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Create
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
            <h1 className="text-4xl font-bold mb-4">Choose Your Case Study Template</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select a template that matches your case study type. Each template provides a structured framework for
              telling your story.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {templates.map((template) => (
              <Card
                key={template.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedTemplate?.id === template.id ? "ring-2 ring-blue-500 shadow-lg" : ""
                }`}
                onClick={() => selectTemplate(template)}
              >
                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                  <img
                    src={template.image || "/placeholder.svg"}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{template.category}</Badge>
                    {selectedTemplate?.id === template.id && <Badge className="bg-blue-500">Selected</Badge>}
                  </div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium mb-2">Perfect for:</p>
                      <div className="flex flex-wrap gap-1">
                        {template.suggestedCategories.map((cat, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {cat}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Includes {template.sections.length} sections:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {template.sections.slice(0, 3).map((section, index) => (
                          <li key={index} className="flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2" />
                            {section.title}
                          </li>
                        ))}
                        {template.sections.length > 3 && (
                          <li className="text-xs text-muted-foreground">
                            +{template.sections.length - 3} more sections
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              disabled={!selectedTemplate}
              onClick={() => setStep(userPlan === "pro" ? "builder" : "details")}
              className="px-8"
            >
              Continue with {selectedTemplate?.name || "Template"}
              <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
            </Button>
            {userPlan === "pro" && (
              <p className="text-sm text-muted-foreground mt-4">
                You can customize the layout with our drag-and-drop builder after setup
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Drag & Drop Builder (Pro Users)
  if (step === "builder" && userPlan === "pro") {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setStep("template")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center space-x-2">
                <div className="h-6 w-6 rounded bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">FX</span>
                </div>
                <span className="font-bold">FolioX</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
              <Button variant="outline" size="sm" onClick={() => setStep("details")}>
                Continue to Details
              </Button>
            </div>
          </div>
        </header>

        <div className="flex h-[calc(100vh-4rem)]">
          {/* Sidebar */}
          <div className="w-80 border-r bg-muted/30 p-6 overflow-y-auto">
            <h2 className="font-bold text-lg mb-6">Customize Layout</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-20 flex-col">
                  <Layout className="h-6 w-6 mb-2" />
                  <span className="text-xs">Section</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Monitor className="h-6 w-6 mb-2" />
                  <span className="text-xs">Hero</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Upload className="h-6 w-6 mb-2" />
                  <span className="text-xs">Image</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Plus className="h-6 w-6 mb-2" />
                  <span className="text-xs">Text</span>
                </Button>
              </div>
            </div>

            <Separator className="my-6" />

            <h3 className="font-semibold mb-4">Template: {selectedTemplate?.name}</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="templateTitle">Case Study Title</Label>
                <Input id="templateTitle" placeholder="My Case Study" />
              </div>
              <div>
                <Label htmlFor="templateDesc">Description</Label>
                <Textarea id="templateDesc" placeholder="Case study description..." rows={3} />
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 bg-white p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
                <Palette className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Customize Your Case Study</h3>
                <p className="text-muted-foreground mb-6">
                  Drag elements from the sidebar to customize your {selectedTemplate?.name} template
                </p>
                <Button variant="outline">Start Customizing</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Case Study Details Step
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => setStep(userPlan === "pro" ? "builder" : "template")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">FX</span>
              </div>
              <span className="font-bold">FolioX</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button variant="outline" size="sm">
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button size="sm">Publish Case Study</Button>
          </div>
        </div>
      </header>

      <div className="container py-8 max-w-4xl">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Case Study Details</h1>
            <p className="text-muted-foreground mt-2">
              Document your {selectedTemplate?.name || "case study"} with detailed insights and outcomes
            </p>
          </div>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Case Study Information</CardTitle>
              <CardDescription>Basic details about your case study</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Case Study Title *</Label>
                <Input
                  id="title"
                  placeholder={
                    selectedTemplate?.name === "UX Research Study"
                      ? "e.g., Improving User Onboarding Through Research-Driven Design"
                      : selectedTemplate?.name === "Product Development"
                        ? "e.g., Launching a Mobile App That Increased User Engagement by 40%"
                        : "e.g., Digital Transformation Strategy That Reduced Costs by 30%"
                  }
                  value={caseStudyData.title}
                  onChange={(e) => setCaseStudyData({ ...caseStudyData, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Executive Summary *</Label>
                <Textarea
                  id="description"
                  placeholder={
                    selectedTemplate?.name === "UX Research Study"
                      ? "A comprehensive user research study that identified key pain points and led to a 45% improvement in user satisfaction..."
                      : selectedTemplate?.name === "Product Development"
                        ? "End-to-end product development case study showcasing strategy, execution, and measurable business impact..."
                        : "Strategic business initiative that transformed operations and delivered significant ROI..."
                  }
                  value={caseStudyData.description}
                  onChange={(e) => setCaseStudyData({ ...caseStudyData, description: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="client">Client/Company</Label>
                  <Input
                    id="client"
                    placeholder="Company Name"
                    value={caseStudyData.client}
                    onChange={(e) => setCaseStudyData({ ...caseStudyData, client: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Project Duration</Label>
                  <Input
                    id="duration"
                    placeholder="3 months"
                    value={caseStudyData.duration}
                    onChange={(e) => setCaseStudyData({ ...caseStudyData, duration: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="team">Team Size</Label>
                  <Input
                    id="team"
                    placeholder="5 people"
                    value={caseStudyData.team}
                    onChange={(e) => setCaseStudyData({ ...caseStudyData, team: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Your Role</Label>
                  <Input
                    id="role"
                    placeholder="Lead UX Researcher"
                    value={caseStudyData.role}
                    onChange={(e) => setCaseStudyData({ ...caseStudyData, role: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" variant="outline" onClick={addTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {selectedTemplate && (
                  <div className="text-xs text-muted-foreground">
                    Suggested: {selectedTemplate.suggestedTags.join(", ")}
                  </div>
                )}
                {caseStudyData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {caseStudyData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="ml-1 hover:text-red-500">
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Cover Image */}
          <Card>
            <CardHeader>
              <CardTitle>Case Study Images</CardTitle>
              <CardDescription>Upload images to support your case study narrative</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Upload Case Study Images</h3>
                <p className="text-sm text-muted-foreground mb-4">Drag and drop your images here, or click to browse</p>
                <Button variant="outline">Choose Files</Button>
                <p className="text-xs text-muted-foreground mt-2">Recommended: 1200x600px, JPG or PNG, max 5MB each</p>
              </div>
            </CardContent>
          </Card>

          {/* Case Study Sections */}
          <Card>
            <CardHeader>
              <CardTitle>Case Study Content</CardTitle>
              <CardDescription>
                {selectedTemplate?.name === "UX Research Study"
                  ? "Document your research methodology, insights, and design solutions"
                  : selectedTemplate?.name === "Product Development"
                    ? "Detail your product strategy, development process, and launch results"
                    : "Outline your business challenge, solution, and measurable impact"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {caseStudyData.sections.map((section, index) => (
                <div key={section.id} className="space-y-4 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                      </div>
                      <Input
                        value={section.title}
                        onChange={(e) => updateSection(section.id, "title", e.target.value)}
                        className="font-semibold border-none p-0 h-auto focus-visible:ring-0"
                      />
                    </div>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea
                    placeholder={section.placeholder || `Describe ${section.title.toLowerCase()}...`}
                    value={section.content}
                    onChange={(e) => updateSection(section.id, "content", e.target.value)}
                    rows={5}
                  />
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      Add Images
                    </Button>
                    {selectedTemplate?.name === "UX Research Study" && (
                      <Button variant="outline" size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Research Data
                      </Button>
                    )}
                    {selectedTemplate?.name === "Product Development" && (
                      <Button variant="outline" size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Metrics
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Section
              </Button>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Key Metrics & Results</CardTitle>
              <CardDescription>Add quantifiable results and impact metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Metric Name</Label>
                  <Input placeholder="e.g., User Satisfaction" />
                </div>
                <div className="space-y-2">
                  <Label>Value</Label>
                  <Input placeholder="e.g., +45%" />
                </div>
                <div className="space-y-2">
                  <Label>Context</Label>
                  <Input placeholder="e.g., vs. baseline" />
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Metric
              </Button>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t">
            <Button variant="outline" asChild>
              <Link href="/dashboard">Cancel</Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
              <Button>Publish Case Study</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
