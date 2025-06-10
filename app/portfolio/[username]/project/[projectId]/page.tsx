import Link from "next/link"
import { ArrowLeft, Calendar, Users, ExternalLink, Heart, Share2, Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProjectCaseStudyPage({
  params,
}: {
  params: { username: string; projectId: string }
}) {
  // Mock data - in real app this would come from API
  const project = {
    id: 1,
    title: "FinTech Mobile Banking App",
    description: "Complete redesign of a mobile banking experience focusing on accessibility and user trust",
    coverImage: "/placeholder.svg?height=600&width=1200",
    category: "Mobile App",
    year: "2024",
    client: "SecureBank",
    duration: "4 months",
    team: "3 designers, 2 developers",
    role: "Lead UX Designer",
    tags: ["UX Design", "Mobile", "Fintech", "Accessibility"],
    metrics: [
      { label: "User Satisfaction", value: "+45%", description: "Increase in user satisfaction scores" },
      { label: "Task Completion", value: "+32%", description: "Improvement in task completion rates" },
      { label: "App Store Rating", value: "4.8/5", description: "New app store rating after redesign" },
      { label: "Support Tickets", value: "-28%", description: "Reduction in customer support tickets" },
    ],
    sections: [
      {
        id: 1,
        title: "The Challenge",
        content: `SecureBank's mobile app had a 2.1-star rating and users complained about confusing navigation and lack of trust indicators. The challenge was to redesign the entire experience while maintaining security standards.

Key issues identified:
• Poor information architecture leading to user confusion
• Lack of clear visual hierarchy
• Missing trust and security indicators
• Accessibility issues for users with disabilities
• Outdated visual design that didn't reflect the brand`,
        images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
      },
      {
        id: 2,
        title: "Research & Discovery",
        content: `I conducted comprehensive user research to understand the pain points and opportunities for improvement.

Research Methods:
• User interviews with 15 existing customers
• Competitive analysis of 8 banking apps
• Usability testing of the current app
• Analytics review of user behavior patterns
• Stakeholder interviews with business teams

Key findings showed users needed clearer visual hierarchy, better onboarding, and more transparent security features. Users particularly struggled with finding account information and completing transactions.`,
        images: [
          "/placeholder.svg?height=400&width=600",
          "/placeholder.svg?height=400&width=600",
          "/placeholder.svg?height=400&width=600",
        ],
      },
      {
        id: 3,
        title: "Design Process",
        content: `Using a human-centered design approach, I created user personas, journey maps, and wireframes. The design system focused on trust, clarity, and accessibility with WCAG 2.1 AA compliance.

Design Process:
1. Information Architecture - Restructured the app's navigation
2. Wireframing - Created low-fidelity wireframes for key flows
3. Prototyping - Built interactive prototypes for testing
4. Visual Design - Developed a cohesive design system
5. Accessibility - Ensured WCAG 2.1 AA compliance
6. Testing - Conducted usability testing throughout

The new design emphasized clear visual hierarchy, consistent interaction patterns, and prominent security indicators to build user trust.`,
        images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
      },
      {
        id: 4,
        title: "Results & Impact",
        content: `The redesigned app launched to 4.8-star ratings and 45% increase in user satisfaction. Daily active users increased by 32% and customer support tickets decreased by 28%.

Business Impact:
• 45% increase in user satisfaction scores
• 32% improvement in task completion rates
• 28% reduction in customer support tickets
• 4.8/5 app store rating (up from 2.1/5)
• 25% increase in daily active users
• 15% increase in mobile transaction volume

The project was considered a major success by both users and the business, leading to increased customer retention and acquisition.`,
        images: ["/placeholder.svg?height=400&width=600"],
      },
    ],
    author: {
      name: "Sarah Chen",
      title: "Senior UX Designer",
      avatar: "/placeholder.svg?height=48&width=48",
      bio: "Passionate about creating user-centered designs that solve real problems.",
    },
    relatedProjects: [
      {
        id: 2,
        title: "E-commerce Platform Redesign",
        image: "/placeholder.svg?height=200&width=300",
        category: "Web Design",
      },
      {
        id: 3,
        title: "Healthcare Dashboard",
        image: "/placeholder.svg?height=200&width=300",
        category: "Dashboard",
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/portfolio/${params.username}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Link>
          </Button>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Heart className="mr-2 h-4 w-4" />
              Like
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div className="h-96 bg-gradient-to-r from-blue-100 to-purple-100 overflow-hidden">
          <img
            src={project.coverImage || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container relative -mt-32">
          <div className="bg-background/95 backdrop-blur rounded-lg p-8 shadow-lg max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline">{project.category}</Badge>
              <Badge variant="secondary">{project.year}</Badge>
              <div className="flex items-center text-sm text-muted-foreground ml-auto">
                <Eye className="mr-1 h-4 w-4" />
                <span>1,247 views</span>
              </div>
            </div>

            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{project.description}</p>

            <div className="grid md:grid-cols-4 gap-6 mb-6">
              <div>
                <div className="flex items-center text-sm text-muted-foreground mb-1">
                  <Calendar className="mr-2 h-4 w-4" />
                  Duration
                </div>
                <p className="font-medium">{project.duration}</p>
              </div>
              <div>
                <div className="flex items-center text-sm text-muted-foreground mb-1">
                  <Users className="mr-2 h-4 w-4" />
                  Team
                </div>
                <p className="font-medium">{project.team}</p>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Client</div>
                <p className="font-medium">{project.client}</p>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">My Role</div>
                <p className="font-medium">{project.role}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Key Results</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.metrics.map((metric, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{metric.value}</div>
                  <h3 className="font-semibold mb-2">{metric.label}</h3>
                  <p className="text-sm text-muted-foreground">{metric.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Content */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="space-y-16">
            {project.sections.map((section, index) => (
              <div key={section.id} className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6">{section.title}</h2>
                  <div className="prose prose-lg max-w-none">
                    {section.content.split("\n\n").map((paragraph, pIndex) => (
                      <p key={pIndex} className="mb-4 text-muted-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {section.images && section.images.length > 0 && (
                  <div
                    className={`grid gap-6 ${
                      section.images.length === 1
                        ? "grid-cols-1"
                        : section.images.length === 2
                          ? "grid-cols-1 md:grid-cols-2"
                          : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    }`}
                  >
                    {section.images.map((image, imgIndex) => (
                      <div key={imgIndex} className="rounded-lg overflow-hidden shadow-lg">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${section.title} - Image ${imgIndex + 1}`}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {index < project.sections.length - 1 && <Separator className="mt-16" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Author Info */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-4xl">
          <Card>
            <CardContent className="p-8">
              <div className="flex items-start space-x-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={project.author.avatar || "/placeholder.svg"} alt={project.author.name} />
                  <AvatarFallback className="text-lg">
                    {project.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{project.author.name}</h3>
                  <p className="text-lg text-muted-foreground mb-4">{project.author.title}</p>
                  <p className="text-muted-foreground mb-6">{project.author.bio}</p>
                  <div className="flex space-x-4">
                    <Button asChild>
                      <Link href={`/portfolio/${params.username}`}>View Portfolio</Link>
                    </Button>
                    <Button variant="outline">Contact</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Related Projects */}
      <section className="py-16">
        <div className="container max-w-6xl">
          <h2 className="text-3xl font-bold mb-12">More Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {project.relatedProjects.map((relatedProject) => (
              <Card key={relatedProject.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={relatedProject.image || "/placeholder.svg"}
                    alt={relatedProject.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{relatedProject.category}</Badge>
                  </div>
                  <CardTitle className="text-lg">{relatedProject.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/portfolio/${params.username}/project/${relatedProject.id}`}>
                      View Case Study
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground">
              © 2025 {project.author.name}. Built with{" "}
              <Link href="/" className="text-blue-600 hover:underline">
                FolioX
              </Link>
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download Case Study
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
