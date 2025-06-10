"use client";

import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "@/hooks/use-account";
import Link from "next/link";
import {
  Plus,
  BarChart3,
  Settings,
  CreditCard,
  Eye,
  Edit,
  Trash2,
  Crown,
  ExternalLink,
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
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DashboardHeader from "@/app/dashboard/header";
import LoadingSpinner from "@/components/loading";
import ErrorPage from "@/components/login-error";
import ProfileCard from "./profile-card";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAccount();
  const [userPlan] = useState("free"); // or "pro"

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  const projects = [
    {
      id: 1,
      title: "E-commerce Redesign",
      description:
        "Complete redesign of an online store with focus on conversion optimization",
      image: "/placeholder.svg?height=200&width=300",
      status: "published",
      views: 1247,
      lastUpdated: "2 days ago",
    },
    {
      id: 2,
      title: "Mobile Banking App",
      description:
        "UX/UI design for a fintech startup's mobile banking application",
      image: "/placeholder.svg?height=200&width=300",
      status: "draft",
      views: 0,
      lastUpdated: "1 week ago",
    },
    {
      id: 3,
      title: "Brand Identity System",
      description:
        "Complete brand identity design for a sustainable fashion company",
      image: "/placeholder.svg?height=200&width=300",
      status: "published",
      views: 892,
      lastUpdated: "3 days ago",
    },
  ];

  if (loading) {
    return <LoadingSpinner />;
  }
  if (!user) {
    return <ErrorPage />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <DashboardHeader />

      <div className="py-8 px-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Profile Card */}
              <ProfileCard />

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Total Projects
                    </span>
                    <span className="font-semibold">{projects.length}/2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Total Views
                    </span>
                    <span className="font-semibold">2,139</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      This Month
                    </span>
                    <span className="font-semibold">+324</span>
                  </div>
                </CardContent>
              </Card>

              {/* Upgrade CTA */}
              {userPlan === "free" && (
                <Card className="border-blue-200 bg-gradient-to-br from-blue-50/50 to-purple-50/50">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Crown className="mr-2 h-5 w-5 text-blue-600" />
                      Upgrade to Pro
                    </CardTitle>
                    <CardDescription>
                      Unlock unlimited projects and advanced features
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                      asChild
                    >
                      <Link href="/pricing">Upgrade Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold">Dashboard</h1>
                  <p className="text-muted-foreground">
                    Manage your portfolio projects and settings
                  </p>
                </div>
                <Button asChild>
                  <Link href="/create">
                    <Plus className="mr-2 h-4 w-4" />
                    New Project
                  </Link>
                </Button>
              </div>

              {/* Projects Grid */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold">Your Projects</h2>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/analytics">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Analytics
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <Card
                      key={project.id}
                      className="group hover:shadow-md transition-shadow"
                    >
                      <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <Badge
                            variant={
                              project.status === "published"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {project.status}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                •••
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <CardTitle className="text-lg">
                          {project.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {project.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{project.views} views</span>
                          <span>Updated {project.lastUpdated}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Add New Project Card */}
                  {projects.length < 2 && (
                    <Card className="border-dashed border-2 hover:border-blue-300 transition-colors">
                      <CardContent className="flex flex-col items-center justify-center h-64 text-center">
                        <Plus className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="font-semibold mb-2">
                          Create New Project
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Add a new case study to your portfolio
                        </p>
                        <Button asChild>
                          <Link href="/create">Get Started</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  )}

                  {/* Upgrade Card for Free Users */}
                  {userPlan === "free" && projects.length >= 2 && (
                    <Card className="border-dashed border-2 border-blue-200 bg-gradient-to-br from-blue-50/50 to-purple-50/50">
                      <CardContent className="flex flex-col items-center justify-center h-64 text-center">
                        <Crown className="h-12 w-12 text-blue-600 mb-4" />
                        <h3 className="font-semibold mb-2">
                          Need More Projects?
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Upgrade to Pro for unlimited projects
                        </p>
                        <Button
                          className="bg-gradient-to-r from-blue-600 to-purple-600"
                          asChild
                        >
                          <Link href="/pricing">Upgrade to Pro</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
