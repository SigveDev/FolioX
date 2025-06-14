import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Heart,
  Share2,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProjectDataParser from "@/components/template-parser";
import type { NodeType } from "@/components/template-parser";
import { JSX } from "react";
import { Project } from "@/types/project";
import { UserProfile } from "@/types/user-profiles";

const data = [
  {
    tag: "div",
    classNames: "w-full flex flex-col gap-4 jusify-center items-center",
    children: [
      {
        tag: "h2",
        classNames: "h-fit w-full text-center text-2xl font-semibold",
        content: "__header-1__",
      },
      {
        tag: "div",
        classNames:
          "w-full h-fit grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
        children: "__cards-map-1__",
      },
    ],
  },
  {
    tag: "div",
    classNames: "w-full h-fit bg-gray-50",
    children: [
      {
        tag: "div",
        classNames:
          "w-full h-fit flex flex-col gap-4 justify-center items-center py-8 px-4 max-w-[1200px] mx-auto",
        children: [
          {
            tag: "h2",
            classNames: "h-fit w-full text-center text-2xl font-semibold",
            content: "__header-2__",
          },
          {
            tag: "div",
            classNames:
              "w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2",
            children: "__list-map-2__",
          },
        ],
      },
    ],
  },
  {
    tag: "div",
    classNames:
      "w-full h-fit grid grid-cols-1 lg:grid-cols-2 gap-4 mx-auto max-w-[1200px] px-4 py-8",
    children: [
      {
        tag: "div",
        classNames: "w-full flex flex-col gap-2 w-full h-fit",
        children: [
          {
            tag: "h2",
            classNames: "text-2xl font-semibold",
            content: "__header-3__",
          },
          {
            tag: "p",
            classNames: "",
            content: "__paragraph-3__",
          },
        ],
      },
      {
        tag: "div",
        classNames: "w-full h-full flex justify-center items-center",
        children: [
          {
            tag: "img",
            classNames: "w-full h-full object-cover rounded-lg",
            src: "__img-src-3__",
            alt: "__img-alt-3__",
          },
        ],
      },
    ],
  },
  {
    tag: "div",
    classNames:
      "w-full h-fit grid grid-cols-1 lg:grid-cols-2 gap-4 mx-auto max-w-[1200px] px-4 py-8",
    children: [
      {
        tag: "div",
        classNames:
          "w-full h-full flex justify-center items-center order-last lg:order-first",
        children: [
          {
            tag: "img",
            classNames: "w-full h-full object-cover rounded-lg",
            src: "__img-src-4__",
            alt: "__img-alt-4__",
          },
        ],
      },
      {
        tag: "div",
        classNames:
          "w-full flex flex-col gap-2 w-full h-fit order-first lg:order-last",
        children: [
          {
            tag: "h2",
            classNames: "text-2xl font-semibold",
            content: "__header-4__",
          },
          {
            tag: "p",
            classNames: "",
            content: "__paragraph-4__",
          },
        ],
      },
    ],
  },
  {
    tag: "div",
    classNames:
      "w-full h-fit grid grid-cols-1 gap-4 mx-auto max-w-[1200px] px-4 py-8",
    children: [
      {
        tag: "div",
        classNames: "w-full flex flex-col gap-2 w-full h-fit",
        children: [
          {
            tag: "h2",
            classNames: "text-2xl font-semibold",
            content: "__header-5__",
          },
          {
            tag: "p",
            classNames: "",
            content: "__paragraph-5__",
          },
        ],
      },
      {
        tag: "div",
        classNames: "w-full h-full flex justify-center items-center",
        children: [
          {
            tag: "img",
            classNames: "w-full h-full object-cover rounded-lg",
            src: "__img-src-5__",
            alt: "__img-alt-5__",
          },
        ],
      },
    ],
  },
  {
    tag: "div",
    classNames:
      "w-full flex flex-col gap-4 justify-center items-center mx-auto max-w-[1200px] px-4 py-8",
    children: [
      {
        tag: "h2",
        classNames: "h-fit w-full text-center text-2xl font-semibold",
        content: "__header-6__",
      },
      {
        tag: "div",
        classNames:
          "w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2",
        children: "__img-map-6__",
      },
    ],
  },
];

export default function ProjectShowcasePage({
  params,
}: {
  params: { projectId: string };
}) {
  // Mock data - in real app this would come from API
  const project: Project = {
    $id: "1",
    $createdAt: new Date().toISOString(),
    $updatedAt: new Date().toISOString(),
    user_id: "238947294872", // assuming from portfolio_slug
    title: "E-commerce Platform with React & Node.js",
    description:
      "A full-stack e-commerce platform built with modern technologies, featuring real-time inventory management, secure payments, and responsive design.",
    portfolio_slug: "alexjohnson",
    type: "project", // assumed value
    category: "Web Development",
    template_id: undefined,
    custom_layout: undefined,
    cover_image_url: "/placeholder.svg?height=600&width=1200",
    live_url: "https://ecommerce-demo.com",
    github_url: "https://github.com/username/ecommerce-platform",
    client: undefined,
    duration: undefined,
    team_size: undefined,
    user_role: undefined,
    is_published: true,
    is_featured: true,
    view_count: 1247,
    like_count: 89,
    published_at: new Date(),
    taggs: ["React", "Node.js", "MongoDB", "Stripe", "Responsive Design"],
    replacements: "",
    share_count: 12,
    $collectionId: "",
    $databaseId: "",
    $permissions: [],
  };

  const projectAuthor: UserProfile = {
    $id: "19u98191281",
    $createdAt: new Date().toISOString(),
    $updatedAt: new Date().toISOString(),
    user_id: "alexjohnson",
    username: "alexjohnson",
    full_name: "Alex Johnson",
    professional_title: "Full Stack Developer",
    bio: "Passionate full-stack developer with expertise in React and Node.js",
    location: undefined,
    phone: undefined,
    website: undefined,
    avatar_url: "/placeholder.svg?height=48&width=48",
    cover_image_url: undefined,
    email: undefined,
    resume_url: undefined,
    pro: true,
    $collectionId: "",
    $databaseId: "",
    $permissions: [],
  };

  const replacements: Record<string, string | NodeType[]> = {
    "__header-1__": "Technology Stack",
    "__cards-map-1__": [
      {
        tag: "div" as keyof JSX.IntrinsicElements,
        classNames:
          "p-4 border border-gray-200 rounded-lg flex flex-col items-center",
        children: [
          {
            tag: "h3" as keyof JSX.IntrinsicElements,
            classNames: "text-lg font-semibold mb-2",
            content: "React",
          },
          {
            tag: "p" as keyof JSX.IntrinsicElements,
            classNames: "text-sm px-2 py-1 rounded-full border border-gray-200",
            content: "Frontend",
          },
        ],
      },
      {
        tag: "div" as keyof JSX.IntrinsicElements,
        classNames:
          "p-4 border border-gray-200 rounded-lg flex flex-col items-center",
        children: [
          {
            tag: "h3" as keyof JSX.IntrinsicElements,
            classNames: "text-lg font-semibold mb-2",
            content: "Next.js",
          },
          {
            tag: "p" as keyof JSX.IntrinsicElements,
            classNames: "text-sm px-2 py-1 rounded-full border border-gray-200",
            content: "Frontend",
          },
        ],
      },
      {
        tag: "div" as keyof JSX.IntrinsicElements,
        classNames:
          "p-4 border border-gray-200 rounded-lg flex flex-col items-center",
        children: [
          {
            tag: "h3" as keyof JSX.IntrinsicElements,
            classNames: "text-lg font-semibold mb-2",
            content: "Tailwind CSS",
          },
          {
            tag: "p" as keyof JSX.IntrinsicElements,
            classNames: "text-sm px-2 py-1 rounded-full border border-gray-200",
            content: "Frontend",
          },
        ],
      },
      {
        tag: "div" as keyof JSX.IntrinsicElements,
        classNames:
          "p-4 border border-gray-200 rounded-lg flex flex-col items-center",
        children: [
          {
            tag: "h3" as keyof JSX.IntrinsicElements,
            classNames: "text-lg font-semibold mb-2",
            content: "Node.js",
          },
          {
            tag: "p" as keyof JSX.IntrinsicElements,
            classNames: "text-sm px-2 py-1 rounded-full border border-gray-200",
            content: "Backend",
          },
        ],
      },
      {
        tag: "div" as keyof JSX.IntrinsicElements,
        classNames:
          "p-4 border border-gray-200 rounded-lg flex flex-col items-center",
        children: [
          {
            tag: "h3" as keyof JSX.IntrinsicElements,
            classNames: "text-lg font-semibold mb-2",
            content: "MongoDB",
          },
          {
            tag: "p" as keyof JSX.IntrinsicElements,
            classNames: "text-sm px-2 py-1 rounded-full border border-gray-200",
            content: "Database",
          },
        ],
      },
      {
        tag: "div" as keyof JSX.IntrinsicElements,
        classNames:
          "p-4 border border-gray-200 rounded-lg flex flex-col items-center",
        children: [
          {
            tag: "h3" as keyof JSX.IntrinsicElements,
            classNames: "text-lg font-semibold mb-2",
            content: "Stripe",
          },
          {
            tag: "p" as keyof JSX.IntrinsicElements,
            classNames: "text-sm px-2 py-1 rounded-full border border-gray-200",
            content: "Payment",
          },
        ],
      },
    ],
    "__header-2__": "Key Features",
    "__list-map-2__": [
      {
        tag: "div" as keyof JSX.IntrinsicElements,
        classNames: "flex gap-2 items-center justify-start",
        children: [
          {
            tag: "div" as keyof JSX.IntrinsicElements,
            classNames:
              "h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5",
            children: [
              {
                tag: "div" as keyof JSX.IntrinsicElements,
                classNames: "h-2 w-2 rounded-full bg-blue-600",
                content: "",
              },
            ],
          },
          {
            tag: "p" as keyof JSX.IntrinsicElements,
            classNames: "text-sm",
            content: "Mobile Responsive",
          },
        ],
      },
      {
        tag: "div" as keyof JSX.IntrinsicElements,
        classNames: "flex gap-2 items-center justify-start",
        children: [
          {
            tag: "div" as keyof JSX.IntrinsicElements,
            classNames:
              "h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5",
            children: [
              {
                tag: "div" as keyof JSX.IntrinsicElements,
                classNames: "h-2 w-2 rounded-full bg-blue-600",
                content: "",
              },
            ],
          },
          {
            tag: "p" as keyof JSX.IntrinsicElements,
            classNames: "text-sm",
            content: "Real-time Inventory",
          },
        ],
      },
      {
        tag: "div" as keyof JSX.IntrinsicElements,
        classNames: "flex gap-2 items-center justify-start",
        children: [
          {
            tag: "div" as keyof JSX.IntrinsicElements,
            classNames:
              "h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5",
            children: [
              {
                tag: "div" as keyof JSX.IntrinsicElements,
                classNames: "h-2 w-2 rounded-full bg-blue-600",
                content: "",
              },
            ],
          },
          {
            tag: "p" as keyof JSX.IntrinsicElements,
            classNames: "text-sm",
            content: "Secure Payments with Stripe",
          },
        ],
      },
      {
        tag: "div" as keyof JSX.IntrinsicElements,
        classNames: "flex gap-2 items-center justify-start",
        children: [
          {
            tag: "div" as keyof JSX.IntrinsicElements,
            classNames:
              "h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5",
            children: [
              {
                tag: "div" as keyof JSX.IntrinsicElements,
                classNames: "h-2 w-2 rounded-full bg-blue-600",
                content: "",
              },
            ],
          },
          {
            tag: "p" as keyof JSX.IntrinsicElements,
            classNames: "text-sm",
            content: "Admin Dashboard for Management",
          },
        ],
      },
    ],
    "__header-3__": "Project Overview",
    "__paragraph-3__":
      "This e-commerce platform was built to demonstrate modern web development practices and provide a complete shopping experience. The project showcases full-stack development skills using React for the frontend and Node.js for the backend. \n \n The platform includes all essential e-commerce features including user authentication, product management, shopping cart functionality, and secure payment processing. The design is fully responsive and optimized for performance across all devices.",
    "__img-src-3__": "/placeholder.svg?height=400&width=600",
    "__img-alt-3__": "Screenshot of the project overview section",
    "__header-4__": "Key Features",
    "__paragraph-4__":
      "The platform includes a comprehensive set of features designed to provide a complete e-commerce experience: \n \n • User Authentication: Secure login/signup with JWT tokens \n • Product Catalog: Browse products with advanced search and filtering \n • Shopping Cart: Add/remove items with real-time price calculations \n • Checkout Process: Streamlined checkout with address and payment forms \n • Payment Processing: Secure payments powered by Stripe \n • Order Management: Track orders and view purchase history \n • Admin Dashboard: Manage products, orders, and inventory \n • Responsive Design: Optimized for desktop, tablet, and mobile devices",
    "__img-src-4__": "/placeholder.svg?height=400&width=600",
    "__img-alt-4__": "Screenshot showcasing key features",
    "__header-5__": "Technology Stack",
    "__paragraph-5__":
      "Built using React, Node.js, MongoDB, and Express. JWT is used for auth, Stripe handles payments, and the frontend is styled with CSS modules.",
    "__img-src-5__": "/placeholder.svg?height=400&width=600",
    "__img-alt-5__": "Technology stack illustration",
    "__header-6__": "Project Gallery",
    "__img-map-6__": [
      {
        tag: "img" as keyof JSX.IntrinsicElements,
        classNames: "w-full h-48 object-cover rounded-lg",
        src: "/placeholder.svg?height=400&width=600",
        alt: "Gallery Image 1",
      },
      {
        tag: "img" as keyof JSX.IntrinsicElements,
        classNames: "w-full h-48 object-cover rounded-lg",
        src: "/placeholder.svg?height=400&width=600",
        alt: "Gallery Image 2",
      },
      {
        tag: "img" as keyof JSX.IntrinsicElements,
        classNames: "w-full h-48 object-cover rounded-lg",
        src: "/placeholder.svg?height=400&width=600",
        alt: "Gallery Image 3",
      },
      {
        tag: "img" as keyof JSX.IntrinsicElements,
        classNames: "w-full h-48 object-cover rounded-lg",
        src: "/placeholder.svg?height=400&width=600",
        alt: "Gallery Image 4",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="flex h-16 items-center justify-between w-full px-4">
          {project.portfolio_slug ? (
            <Link
              href={"/portfolio/" + project.portfolio_slug}
              className="text-2xl font-bold"
            >
              {projectAuthor.full_name || "Project Author"}
            </Link>
          ) : (
            <div></div>
          )}
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Heart className="mr-2 h-4 w-4" />
              Like ({project.like_count})
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
            src={project.cover_image_url || "/placeholder.svg"}
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
                <span>{project.view_count} views</span>
              </div>
            </div>

            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.taggs.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {project.live_url && (
                <Button asChild>
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Live Demo
                  </a>
                </Button>
              )}
              {project.github_url && (
                <Button variant="outline" asChild>
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="w-full flex flex-col gap-12 mt-8">
        <ProjectDataParser
          data={JSON.stringify(data)}
          replacements={JSON.stringify(replacements)}
        />
      </div>

      {/* Author Info */}
      <section className="w-full bg-muted/30">
        <div className="wfull max-w-[650px] mx-auto py-8">
          <div className="w-full px-16">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src={projectAuthor.avatar_url || "/placeholder.svg"}
                      alt={projectAuthor.full_name}
                    />
                    <AvatarFallback className="text-lg">
                      {projectAuthor?.full_name
                        ? (projectAuthor.full_name.split(" ")[0]?.[0] || "") +
                          (projectAuthor.full_name.split(" ")[1]?.[0] || "")
                        : "User"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">
                      {projectAuthor.full_name}
                    </h3>
                    <p className="text-lg text-muted-foreground mb-4">
                      {projectAuthor.professional_title}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-muted-foreground mb-2">
                    {projectAuthor.bio}
                  </p>
                  {project.portfolio_slug && (
                    <div className="flex space-x-4">
                      <Button asChild>
                        <Link
                          href={`/portfolio/${project.portfolio_slug
                            .toLowerCase()
                            .replace(" ", "")}`}
                        >
                          View Portfolio
                        </Link>
                      </Button>
                      <Button variant="outline">Contact</Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="w-full px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground">
              © 2025 {projectAuthor.full_name}. Built with{" "}
              <Link href="/" className="text-blue-600 hover:underline">
                FolioX
              </Link>
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-sm text-muted-foreground">
                {project.view_count} views • {project.like_count} likes •{" "}
                {project.share_count} shares
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
