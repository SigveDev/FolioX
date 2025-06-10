import Link from "next/link"
import { ExternalLink, Mail, Linkedin, Twitter, Github, Download, Calendar, Users, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function PortfolioPage({ params }: { params: { username: string } }) {
  // Mock data - in real app this would come from API based on username
  const portfolio = {
    name: "Sarah Chen",
    title: "Senior UX Designer",
    bio: "Passionate about creating user-centered designs that solve real problems. 5+ years of experience in fintech and e-commerce.",
    location: "San Francisco, CA",
    email: "sarah@example.com",
    website: "sarahchen.com",
    avatar: "/placeholder.svg?height=120&width=120",
    coverImage: "/placeholder.svg?height=400&width=1200",
    plan: "pro", // or "free"
    social: {
      linkedin: "linkedin.com/in/sarahchen",
      twitter: "@sarahchen",
      github: "github.com/sarahchen",
    },
    projects: [
      {
        id: 1,
        title: "FinTech Mobile Banking App",
        description: "Complete redesign of a mobile banking experience focusing on accessibility and user trust",
        image: "/placeholder.svg?height=300&width=400",
        category: "Mobile App",
        year: "2024",
        client: "SecureBank",
        duration: "4 months",
        team: "3 designers, 2 developers",
        tags: ["UX Design", "Mobile", "Fintech", "Accessibility"],
        metrics: [
          { label: "User Satisfaction", value: "+45%" },
          { label: "Task Completion", value: "+32%" },
          { label: "App Store Rating", value: "4.8/5" },
        ],
        sections: [
          {
            title: "The Challenge",
            content:
              "SecureBank's mobile app had a 2.1-star rating and users complained about confusing navigation and lack of trust indicators. The challenge was to redesign the entire experience while maintaining security standards.",
          },
          {
            title: "Research & Discovery",
            content:
              "I conducted user interviews with 15 existing customers and analyzed competitor apps. Key findings showed users needed clearer visual hierarchy, better onboarding, and more transparent security features.",
          },
          {
            title: "Design Process",
            content:
              "Using a human-centered design approach, I created user personas, journey maps, and wireframes. The design system focused on trust, clarity, and accessibility with WCAG 2.1 AA compliance.",
          },
          {
            title: "Results & Impact",
            content:
              "The redesigned app launched to 4.8-star ratings and 45% increase in user satisfaction. Daily active users increased by 32% and customer support tickets decreased by 28%.",
          },
        ],
      },
      {
        id: 2,
        title: "E-commerce Platform Redesign",
        description: "Redesigning the checkout flow to reduce cart abandonment and increase conversions",
        image: "/placeholder.svg?height=300&width=400",
        category: "Web Design",
        year: "2023",
        client: "ShopEasy",
        duration: "6 months",
        team: "2 designers, 4 developers",
        tags: ["UX Design", "E-commerce", "Conversion Optimization"],
        metrics: [
          { label: "Conversion Rate", value: "+28%" },
          { label: "Cart Abandonment", value: "-35%" },
          { label: "Revenue", value: "+$2.1M" },
        ],
      },
      {
        id: 3,
        title: "Healthcare Dashboard",
        description: "Designing a comprehensive dashboard for healthcare professionals to manage patient data",
        image: "/placeholder.svg?height=300&width=400",
        category: "Dashboard",
        year: "2023",
        client: "MedTech Solutions",
        duration: "8 months",
        team: "4 designers, 6 developers",
        tags: ["UX Design", "Healthcare", "Data Visualization"],
        metrics: [
          { label: "Task Efficiency", value: "+40%" },
          { label: "Error Reduction", value: "-60%" },
          { label: "User Adoption", value: "95%" },
        ],
      },
    ],
  }

  const featuredProject = portfolio.projects[0]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-end">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
            <Button size="sm">
              <Mail className="mr-2 h-4 w-4" />
              Contact
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        {/* Cover Image */}
        <div className="h-64 md:h-80 bg-gradient-to-r from-blue-100 to-purple-100 overflow-hidden">
          <img src={portfolio.coverImage || "/placeholder.svg"} alt="Cover" className="w-full h-full object-cover" />
        </div>

        {/* Profile Info */}
        <div className="container relative">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16 md:-mt-20">
            <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
              <AvatarImage src={portfolio.avatar || "/placeholder.svg"} alt={portfolio.name} />
              <AvatarFallback className="text-2xl">
                {portfolio.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 bg-background/95 backdrop-blur rounded-lg p-6 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold">{portfolio.name}</h1>
                  <p className="text-xl text-muted-foreground">{portfolio.title}</p>
                  <p className="text-muted-foreground mt-2">{portfolio.location}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href={`https://${portfolio.social.linkedin}`} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={`https://${portfolio.social.twitter}`} target="_blank" rel="noopener noreferrer">
                      <Twitter className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={`https://${portfolio.social.github}`} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={`https://${portfolio.website}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>

              <p className="mt-4 text-muted-foreground max-w-2xl">{portfolio.bio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="py-16">
        <div className="container">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Featured Project</h2>
            <p className="text-muted-foreground">My latest and most impactful work</p>
          </div>

          <Card className="overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="aspect-video lg:aspect-auto">
                <img
                  src={featuredProject.image || "/placeholder.svg"}
                  alt={featuredProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline">{featuredProject.category}</Badge>
                  <Badge variant="secondary">{featuredProject.year}</Badge>
                </div>
                <h3 className="text-2xl font-bold mb-3">{featuredProject.title}</h3>
                <p className="text-muted-foreground mb-6">{featuredProject.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <Calendar className="mr-2 h-4 w-4" />
                      Duration
                    </div>
                    <p className="font-medium">{featuredProject.duration}</p>
                  </div>
                  <div>
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <Users className="mr-2 h-4 w-4" />
                      Team
                    </div>
                    <p className="font-medium">{featuredProject.team}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredProject.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button asChild>
                  <Link href={`/portfolio/${params.username}/project/${featuredProject.id}`}>View Full Case Study</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Impact & Results</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProject.metrics.map((metric, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{metric.value}</div>
                  <p className="text-muted-foreground">{metric.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects */}
      <section className="py-16">
        <div className="container">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-2">All Projects</h2>
            <p className="text-muted-foreground">A collection of my design work and case studies</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.projects.map((project) => (
              <Card key={project.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{project.category}</Badge>
                    <span className="text-sm text-muted-foreground">{project.year}</span>
                  </div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">{project.client}</div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/portfolio/${params.username}/project/${project.id}`}>View Case Study</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            I'm always interested in new opportunities and exciting projects. Let's discuss how we can create something
            amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Mail className="mr-2 h-5 w-5" />
              Get In Touch
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground">
              © 2025 {portfolio.name}. Built with{" "}
              <Link href="/" className="text-blue-600 hover:underline">
                FolioX
              </Link>
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a
                href={`mailto:${portfolio.email}`}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href={`https://${portfolio.social.linkedin}`}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={`https://${portfolio.social.twitter}`}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
