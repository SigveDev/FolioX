"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "@/hooks/use-account";
import Link from "next/link";
import { Plus, BarChart3, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DashboardHeader from "@/app/dashboard/header";
import LoadingSpinner from "@/components/loading";
import ErrorPage from "@/components/login-error";
import ProfileCard from "./profile-card";
import QuickStats from "./quick-stats";
import { useProjects } from "@/hooks/use-projects";
import ProjectCards from "./project-cards";

export default function DashboardPage() {
  const router = useRouter();
  const { profile, user, loading: userLoading } = useAccount();
  const {
    projects,
    loading: projectsLoading,
    error: projectsError,
  } = useProjects();

  useEffect(() => {
    if (!userLoading && !user) {
      router.push("/login");
    }
  }, [userLoading, user, router]);

  if (userLoading) {
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
              <QuickStats
                projectLength={projects ? projects.length : 0}
                viewCount={
                  projects
                    ? projects.reduce((acc, p) => acc + (p.views || 0), 0)
                    : 0
                }
                likes={
                  projects
                    ? projects.reduce((acc, p) => acc + (p.likes || 0), 0)
                    : 0
                }
                pro={profile?.pro || false}
                loading={projectsLoading}
              />

              {/* Upgrade CTA */}
              {profile && !profile.pro && (
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
                  {/* Project Cards */}
                  <ProjectCards
                    projects={projects || []}
                    loading={projectsLoading}
                  />

                  {/* Add New Project Card */}
                  {projects && projects.length < 2 && (
                    <Card className="border-dashed border-2 hover:border-blue-300 transition-colors">
                      <CardContent className="flex flex-col items-center justify-center h-64 text-center">
                        <Plus className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="font-semibold mb-2">
                          Create New Project
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Add a new project or case study to your portfolio
                        </p>
                        <Button asChild>
                          <Link href="/create">Get Started</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  )}

                  {/* Upgrade Card for Free Users */}
                  {profile &&
                    !profile.pro &&
                    projects &&
                    projects.length >= 2 && (
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
