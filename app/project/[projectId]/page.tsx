import Link from "next/link"
import { ArrowLeft, ExternalLink, Github, Heart, Share2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProjectShowcasePage({
  params,
}: {
  params: { projectId: string }
}) {
  // Mock data - in real app this would come from API
  const project = {
    id: 1,
    title: "E-commerce Platform with React & Node.js",
    description:
      "A full-stack e-commerce platform built with modern technologies, featuring real-time inventory management, secure payments, and responsive design.",
    coverImage: "/placeholder.svg?height=600&width=1200",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    category: "Web Development",
    tags: ["React", "Node.js", "MongoDB", "Stripe", "Responsive Design"],
    liveUrl: "https://ecommerce-demo.com",
    githubUrl: "https://github.com/username/ecommerce-platform",
    technologies: [
      { name: "React", category: "Frontend" },
      { name: "Node.js", category: "Backend" },
      { name: "MongoDB", category: "Database" },
      { name: "Express.js", category: "Backend" },
      { name: "Stripe", category: "Payment" },
      { name: "JWT", category: "Authentication" },
    ],
    features: [
      "User authentication and authorization",
      "Product catalog with search and filtering",
      "Shopping cart and checkout process",
      "Secure payment processing with Stripe",
      "Order management and tracking",
      "Admin dashboard for inventory management",
      "Responsive design for all devices",
      "Real-time inventory updates",
    ],
    sections: [
      {
        id: 1,
        title: "Project Overview",
        content: `This e-commerce platform was built to demonstrate modern web development practices and provide a complete shopping experience. The project showcases full-stack development skills using React for the frontend and Node.js for the backend.

The platform includes all essential e-commerce features including user authentication, product management, shopping cart functionality, and secure payment processing. The design is fully responsive and optimized for performance across all devices.`,
        images: ["/placeholder.svg?height=400&width=600"],
      },
      {
        id: 2,
        title: "Key Features",
        content: `The platform includes a comprehensive set of features designed to provide a complete e-commerce experience:

• User Authentication: Secure login/signup with JWT tokens
• Product Catalog: Browse products with advanced search and filtering
• Shopping Cart: Add/remove items with real-time price calculations
• Checkout Process: Streamlined checkout with address and payment forms
• Payment Processing: Secure payments powered by Stripe
• Order Management: Track orders and view purchase history
• Admin Dashboard: Manage products, orders, and inventory
• Responsive Design: Optimized for desktop, tablet, and mobile devices`,
        images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
      },
      {
        id: 3,
        title: "Technology Stack",
        content: `The project leverages modern web technologies to ensure scalability, security, and performance:

Frontend: Built with React using functional components and hooks. State management handled with Context API and local state. Styled with CSS modules for component-scoped styling.

Backend: Node.js with Express.js framework for RESTful API development. MongoDB for data persistence with Mongoose ODM for schema validation.

Authentication: JWT tokens for secure user authentication with bcrypt for password hashing.

Payment Processing: Stripe integration for secure payment handling with webhook support for order confirmation.`,
        images: ["/placeholder.svg?height=400&width=600"],
      },
      {
        id: 4,
        title: "Challenges & Solutions",
        content: `During development, several challenges were encountered and solved:

Real-time Inventory Management: Implemented optimistic locking to prevent overselling and ensure inventory accuracy across concurrent users.

Payment Security: Integrated Stripe's secure payment processing with proper error handling and webhook validation for reliable order processing.

Performance Optimization: Implemented lazy loading for product images, pagination for large product catalogs, and caching strategies for frequently accessed data.

Responsive Design: Used CSS Grid and Flexbox to create layouts that work seamlessly across all device sizes while maintaining visual hierarchy.`,
        images: ["/placeholder.svg?height=400&width=600"],
      },
    ],
    author: {
      name: "Alex Johnson",
      title: "Full Stack Developer",
      avatar: "/placeholder.svg?height=48&width=48",
      bio: "Passionate full-stack developer with expertise in React and Node.js",
    },
    stats: {
      views: 1247,
      likes: 89,
      shares: 23,
    },
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Heart className="mr-2 h-4 w-4" />
              Like ({project.stats.likes})
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
              <div className="flex items-center text-sm text-muted-foreground ml-auto">
                <Eye className="mr-1 h-4 w-4" />
                <span>{project.stats.views} views</span>
              </div>
            </div>

            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {project.liveUrl && (
                <Button asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Live Demo
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button variant="outline" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Technology Stack</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.technologies.map((tech, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-2">{tech.name}</h3>
                  <Badge variant="outline">{tech.category}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {project.features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-blue-600" />
                </div>
                <span className="text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Content */}
      <section className="py-16 bg-muted/30">
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

      {/* Project Gallery */}
      <section className="py-16">
        <div className="container max-w-6xl">
          <h2 className="text-3xl font-bold mb-12">Project Gallery</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {project.images.map((image, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Project screenshot ${index + 1}`}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-200"
                />
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
                      <Link href={`/portfolio/${project.author.name.toLowerCase().replace(" ", "")}`}>
                        View Portfolio
                      </Link>
                    </Button>
                    <Button variant="outline">Contact</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
              <span className="text-sm text-muted-foreground">
                {project.stats.views} views • {project.stats.likes} likes • {project.stats.shares} shares
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
