"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, Save, Eye, User, GraduationCap, Briefcase, Award, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"

export default function CreatePortfolioPage() {
  const [userPlan] = useState("free") // or "pro"
  const [step, setStep] = useState("template") // template, details, projects, preview
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  const [portfolioData, setPortfolioData] = useState({
    // Personal Info
    name: "",
    title: "",
    bio: "",
    location: "",
    email: "",
    phone: "",
    website: "",
    avatar: null,
    coverImage: null,

    // Social Links
    social: {
      linkedin: "",
      twitter: "",
      github: "",
      dribbble: "",
      behance: "",
    },

    // Education
    education: [],

    // Work Experience
    experience: [],

    // Skills
    skills: [],

    // Selected Projects
    selectedProjects: [],

    // Additional Info
    achievements: [],
    certifications: [],
  })

  const templates = [
    {
      id: 1,
      name: "Professional",
      description: "Clean, corporate design perfect for consultants and business professionals",
      image: "/placeholder.svg?height=200&width=300",
      category: "Business",
      features: [
        "Header with contact info",
        "Experience timeline",
        "Skills grid",
        "Project showcase",
        "Testimonials section",
      ],
    },
    {
      id: 2,
      name: "Creative",
      description: "Visual-first design ideal for designers, artists, and creative professionals",
      image: "/placeholder.svg?height=200&width=300",
      category: "Creative",
      features: ["Full-screen hero", "Visual project grid", "About section", "Creative timeline", "Contact form"],
    },
    {
      id: 3,
      name: "Developer",
      description: "Tech-focused layout perfect for developers and technical professionals",
      image: "/placeholder.svg?height=200&width=300",
      category: "Technical",
      features: [
        "Code-style design",
        "Tech stack display",
        "GitHub integration",
        "Project repositories",
        "Technical blog",
      ],
    },
  ]

  // Mock available projects (would come from API)
  const availableProjects = [
    {
      id: 1,
      title: "FinTech Mobile Banking App",
      type: "case-study",
      category: "Mobile App",
      image: "/placeholder.svg?height=200&width=300",
      description: "Complete redesign of a mobile banking experience",
    },
    {
      id: 2,
      title: "E-commerce Platform",
      type: "project",
      category: "Web Design",
      image: "/placeholder.svg?height=200&width=300",
      description: "Modern e-commerce platform with advanced features",
    },
    {
      id: 3,
      title: "Brand Identity System",
      type: "case-study",
      category: "Branding",
      image: "/placeholder.svg?height=200&width=300",
      description: "Complete brand identity for sustainable fashion company",
    },
  ]

  const addEducation = () => {
    setPortfolioData({
      ...portfolioData,
      education: [
        ...portfolioData.education,
        {
          id: Date.now(),
          school: "",
          degree: "",
          field: "",
          startYear: "",
          endYear: "",
          description: "",
        },
      ],
    })
  }

  const addExperience = () => {
    setPortfolioData({
      ...portfolioData,
      experience: [
        ...portfolioData.experience,
        {
          id: Date.now(),
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        },
      ],
    })
  }

  const addSkill = (skill) => {
    if (skill.trim() && !portfolioData.skills.includes(skill.trim())) {
      setPortfolioData({
        ...portfolioData,
        skills: [...portfolioData.skills, skill.trim()],
      })
    }
  }

  const toggleProjectSelection = (projectId) => {
    const isSelected = portfolioData.selectedProjects.includes(projectId)
    if (isSelected) {
      setPortfolioData({
        ...portfolioData,
        selectedProjects: portfolioData.selectedProjects.filter((id) => id !== projectId),
      })
    } else {
      setPortfolioData({
        ...portfolioData,
        selectedProjects: [...portfolioData.selectedProjects, projectId],
      })
    }
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
            <Badge variant="secondary">Portfolio Creation</Badge>
          </div>
        </header>

        <div className="container py-16 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Choose Your Portfolio Template</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select a template that best represents your professional style. You can customize everything later.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {templates.map((template) => (
              <Card
                key={template.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedTemplate?.id === template.id ? "ring-2 ring-blue-500 shadow-lg" : ""
                }`}
                onClick={() => setSelectedTemplate(template)}
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
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Includes:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {template.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" disabled={!selectedTemplate} onClick={() => setStep("details")} className="px-8">
              Continue with {selectedTemplate?.name || "Template"}
              <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Personal Details Step
  if (step === "details") {
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
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
              <Button size="sm" onClick={() => setStep("projects")}>
                Continue
              </Button>
            </div>
          </div>
        </header>

        <div className="container py-8 max-w-4xl">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold">Personal Information</h1>
              <p className="text-muted-foreground mt-2">
                Tell us about yourself. This information will be displayed on your portfolio.
              </p>
            </div>

            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={portfolioData.name}
                      onChange={(e) => setPortfolioData({ ...portfolioData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Professional Title *</Label>
                    <Input
                      id="title"
                      placeholder="Senior UX Designer"
                      value={portfolioData.title}
                      onChange={(e) => setPortfolioData({ ...portfolioData, title: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio *</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell your professional story in 2-3 sentences..."
                    value={portfolioData.bio}
                    onChange={(e) => setPortfolioData({ ...portfolioData, bio: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="San Francisco, CA"
                      value={portfolioData.location}
                      onChange={(e) => setPortfolioData({ ...portfolioData, location: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={portfolioData.email}
                      onChange={(e) => setPortfolioData({ ...portfolioData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      placeholder="johndoe.com"
                      value={portfolioData.website}
                      onChange={(e) => setPortfolioData({ ...portfolioData, website: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <GraduationCap className="mr-2 h-5 w-5" />
                    Education
                  </div>
                  <Button variant="outline" size="sm" onClick={addEducation}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Education
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {portfolioData.education.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No education added yet. Click "Add Education" to get started.
                  </p>
                ) : (
                  portfolioData.education.map((edu, index) => (
                    <div key={edu.id} className="p-4 border rounded-lg space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>School/University</Label>
                          <Input placeholder="University of California" />
                        </div>
                        <div className="space-y-2">
                          <Label>Degree</Label>
                          <Input placeholder="Bachelor of Science" />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Field of Study</Label>
                          <Input placeholder="Computer Science" />
                        </div>
                        <div className="space-y-2">
                          <Label>Start Year</Label>
                          <Input placeholder="2018" />
                        </div>
                        <div className="space-y-2">
                          <Label>End Year</Label>
                          <Input placeholder="2022" />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Work Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Briefcase className="mr-2 h-5 w-5" />
                    Work Experience
                  </div>
                  <Button variant="outline" size="sm" onClick={addExperience}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Experience
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {portfolioData.experience.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No work experience added yet. Click "Add Experience" to get started.
                  </p>
                ) : (
                  portfolioData.experience.map((exp, index) => (
                    <div key={exp.id} className="p-4 border rounded-lg space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Company</Label>
                          <Input placeholder="Google" />
                        </div>
                        <div className="space-y-2">
                          <Label>Position</Label>
                          <Input placeholder="Senior UX Designer" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea placeholder="Describe your role and achievements..." rows={3} />
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Skills & Expertise
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a skill (e.g., UX Design, React, Figma)"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        addSkill(e.target.value)
                        e.target.value = ""
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={(e) => {
                      const input = e.target.parentElement.querySelector("input")
                      addSkill(input.value)
                      input.value = ""
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {portfolioData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {portfolioData.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <button
                          onClick={() => {
                            setPortfolioData({
                              ...portfolioData,
                              skills: portfolioData.skills.filter((_, i) => i !== index),
                            })
                          }}
                          className="ml-1 hover:text-red-500"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Project Selection Step
  if (step === "projects") {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setStep("details")}>
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
              <Button size="sm">Publish Portfolio</Button>
            </div>
          </div>
        </header>

        <div className="container py-8 max-w-6xl">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold">Select Your Projects</h1>
              <p className="text-muted-foreground mt-2">
                Choose which projects and case studies you want to showcase in your portfolio.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Available Projects</CardTitle>
                <CardDescription>
                  Select the projects you want to feature in your portfolio. You can reorder them later.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableProjects.map((project) => (
                    <Card
                      key={project.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        portfolioData.selectedProjects.includes(project.id) ? "ring-2 ring-blue-500" : ""
                      }`}
                      onClick={() => toggleProjectSelection(project.id)}
                    >
                      <div className="aspect-video bg-muted rounded-t-lg overflow-hidden relative">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        {portfolioData.selectedProjects.includes(project.id) && (
                          <div className="absolute top-2 right-2 h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{project.category}</Badge>
                          <Badge variant="secondary" className="text-xs">
                            {project.type === "case-study" ? "Case Study" : "Project"}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <CardDescription className="text-sm">{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={portfolioData.selectedProjects.includes(project.id)}
                            onChange={() => toggleProjectSelection(project.id)}
                          />
                          <span className="text-sm">Include in portfolio</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {portfolioData.selectedProjects.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">No projects selected yet.</p>
                    <p className="text-sm text-muted-foreground">
                      Don't have any projects yet?{" "}
                      <Link href="/create" className="text-blue-600 hover:underline">
                        Create your first project
                      </Link>
                    </p>
                  </div>
                )}

                {portfolioData.selectedProjects.length > 0 && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>{portfolioData.selectedProjects.length} project(s) selected</strong> - These will be
                      featured in your portfolio and visitors can click to view the full details.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return null
}
