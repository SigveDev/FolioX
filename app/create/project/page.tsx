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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CreateProjectPage() {
  const [userPlan] = useState("free") // or "pro"
  const [step, setStep] = useState(userPlan === "free" ? "template" : "template") // Always start with template
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [showBuilder, setShowBuilder] = useState(false)

  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    category: "",
    tags: [],
    coverImage: null,
    images: [],
    technologies: [],
    liveUrl: "",
    githubUrl: "",
    features: [],
    sections: [],
  })

  const templates = [
    {
      id: 1,
      name: "Tech Showcase",
      description: "Perfect for web apps, mobile apps, and technical projects",
      image: "/placeholder.svg?height=200&width=300",
      category: "Technical",
      features: ["Project overview", "Tech stack", "Key features", "Live demo", "Code repository"],
      sections: [
        {
          id: 1,
          type: "overview",
          title: "Project Overview",
          content: "",
          placeholder: "Describe what this project is and what problem it solves...",
        },
        {
          id: 2,
          type: "features",
          title: "Key Features",
          content: "",
          placeholder: "List the main features and functionality of your project...",
        },
        {
          id: 3,
          type: "technology",
          title: "Technology Stack",
          content: "",
          placeholder: "What technologies, frameworks, and tools did you use?",
        },
        {
          id: 4,
          type: "challenges",
          title: "Challenges & Solutions",
          content: "",
          placeholder: "What challenges did you face and how did you solve them?",
        },
      ],
      suggestedCategories: ["Web Development", "Mobile App", "API Development"],
      suggestedTags: ["React", "Node.js", "JavaScript", "API", "Database"],
    },
    {
      id: 2,
      name: "Design Portfolio",
      description: "Ideal for UI/UX designs, graphics, and visual projects",
      image: "/placeholder.svg?height=200&width=300",
      category: "Design",
      features: ["Visual showcase", "Design process", "Tools used", "Client feedback", "Before/after"],
      sections: [
        {
          id: 1,
          type: "concept",
          title: "Design Concept",
          content: "",
          placeholder: "What was the design vision and creative direction?",
        },
        {
          id: 2,
          type: "process",
          title: "Design Process",
          content: "",
          placeholder: "Walk through your design process from ideation to final design...",
        },
        {
          id: 3,
          type: "tools",
          title: "Tools & Techniques",
          content: "",
          placeholder: "What design tools and techniques did you use?",
        },
        {
          id: 4,
          type: "outcome",
          title: "Final Outcome",
          content: "",
          placeholder: "Show the final design and its impact...",
        },
      ],
      suggestedCategories: ["UI Design", "Graphic Design", "Brand Design"],
      suggestedTags: ["Figma", "Adobe Creative Suite", "UI/UX", "Branding", "Typography"],
    },
    {
      id: 3,
      name: "Business Project",
      description: "Great for business solutions, marketing campaigns, and strategy projects",
      image: "/placeholder.svg?height=200&width=300",
      category: "Business",
      features: ["Business context", "Strategy", "Implementation", "Results", "Lessons learned"],
      sections: [
        {
          id: 1,
          type: "context",
          title: "Business Context",
          content: "",
          placeholder: "What was the business need or opportunity?",
        },
        {
          id: 2,
          type: "strategy",
          title: "Strategy & Approach",
          content: "",
          placeholder: "What strategy did you develop and why?",
        },
        {
          id: 3,
          type: "implementation",
          title: "Implementation",
          content: "",
          placeholder: "How did you execute the strategy?",
        },
        {
          id: 4,
          type: "results",
          title: "Results & Impact",
          content: "",
          placeholder: "What were the outcomes and business impact?",
        },
      ],
      suggestedCategories: ["Marketing", "Strategy", "Business Development"],
      suggestedTags: ["Strategy", "Marketing", "Analytics", "Growth", "ROI"],
    },
  ]

  const [newTag, setNewTag] = useState("")

  const addTag = () => {
    if (newTag.trim() && !projectData.tags.includes(newTag.trim())) {
      setProjectData({
        ...projectData,
        tags: [...projectData.tags, newTag.trim()],
      })
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove) => {
    setProjectData({
      ...projectData,
      tags: projectData.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  const updateSection = (sectionId, field, value) => {
    setProjectData({
      ...projectData,
      sections: projectData.sections.map((section) =>
        section.id === sectionId ? { ...section, [field]: value } : section,
      ),
    })
  }

  const selectTemplate = (template) => {
    setSelectedTemplate(template)
    setProjectData({
      ...projectData,
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
            <h1 className="text-4xl font-bold mb-4">Choose Your Project Template</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select a template that best fits your project type. Each template is optimized for different kinds of
              projects and showcases.
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
                <Label htmlFor="templateTitle">Project Title</Label>
                <Input id="templateTitle" placeholder="My Awesome Project" />
              </div>
              <div>
                <Label htmlFor="templateDesc">Description</Label>
                <Textarea id="templateDesc" placeholder="Project description..." rows={3} />
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 bg-white p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
                <Palette className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Customize Your Layout</h3>
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

  // Project Details Step
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
            <Button size="sm">Publish Project</Button>
          </div>
        </div>
      </header>

      <div className="container py-8 max-w-4xl">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Project Details</h1>
            <p className="text-muted-foreground mt-2">
              Add your project information using the {selectedTemplate?.name || "selected template"}
            </p>
          </div>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
              <CardDescription>Basic details about your project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  placeholder={
                    selectedTemplate?.name === "Tech Showcase"
                      ? "e.g., E-commerce Platform with React & Node.js"
                      : selectedTemplate?.name === "Design Portfolio"
                        ? "e.g., Mobile App UI Design for FinTech Startup"
                        : "e.g., Marketing Campaign for Sustainable Fashion Brand"
                  }
                  value={projectData.title}
                  onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Project Description *</Label>
                <Textarea
                  id="description"
                  placeholder={
                    selectedTemplate?.name === "Tech Showcase"
                      ? "A full-stack e-commerce platform built with modern technologies..."
                      : selectedTemplate?.name === "Design Portfolio"
                        ? "A complete UI/UX design for a mobile banking application..."
                        : "A comprehensive marketing strategy that increased brand awareness..."
                  }
                  value={projectData.description}
                  onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={projectData.category}
                    onValueChange={(value) => setProjectData({ ...projectData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedTemplate?.suggestedCategories.map((cat) => (
                        <SelectItem key={cat} value={cat.toLowerCase().replace(/\s+/g, "-")}>
                          {cat}
                        </SelectItem>
                      ))}
                      <SelectItem value="web-development">Web Development</SelectItem>
                      <SelectItem value="mobile-app">Mobile App</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
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
                  {projectData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {projectData.tags.map((tag, index) => (
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
              </div>

              {/* Project Links */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="liveUrl">Live Demo URL</Label>
                  <Input
                    id="liveUrl"
                    placeholder="https://myproject.com"
                    value={projectData.liveUrl}
                    onChange={(e) => setProjectData({ ...projectData, liveUrl: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="githubUrl">Repository URL</Label>
                  <Input
                    id="githubUrl"
                    placeholder="https://github.com/username/project"
                    value={projectData.githubUrl}
                    onChange={(e) => setProjectData({ ...projectData, githubUrl: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cover Image */}
          <Card>
            <CardHeader>
              <CardTitle>Project Images</CardTitle>
              <CardDescription>Upload images to showcase your project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Upload Project Images</h3>
                <p className="text-sm text-muted-foreground mb-4">Drag and drop your images here, or click to browse</p>
                <Button variant="outline">Choose Files</Button>
                <p className="text-xs text-muted-foreground mt-2">Recommended: 1200x600px, JPG or PNG, max 5MB each</p>
              </div>
            </CardContent>
          </Card>

          {/* Project Sections */}
          <Card>
            <CardHeader>
              <CardTitle>Project Content</CardTitle>
              <CardDescription>
                {selectedTemplate?.name === "Tech Showcase"
                  ? "Document your technical project with code, features, and implementation details"
                  : selectedTemplate?.name === "Design Portfolio"
                    ? "Showcase your design process, tools, and creative decisions"
                    : "Detail your business project strategy, execution, and results"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {projectData.sections.map((section, index) => (
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
                    rows={4}
                  />
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      Add Images
                    </Button>
                    {selectedTemplate?.name === "Tech Showcase" && (
                      <Button variant="outline" size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Code
                      </Button>
                    )}
                    {selectedTemplate?.name === "Business Project" && (
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
              <Button>Publish Project</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
