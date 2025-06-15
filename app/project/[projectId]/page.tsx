"use client";

import React from "react";
import Link from "next/link";
import {
  ExternalLink,
  Github,
  Heart,
  Share2,
  Eye,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProjectDataParser from "@/components/template-parser";
import { ProjectViewDto } from "@/types/project";
import { useProjects } from "@/hooks/use-projects";
import { useEffect, useState } from "react";

export default function ProjectShowcasePage({
  params,
}: {
  params: { projectId: string };
}) {
  const {
    getProjectForView,
    getProjectForViewLoading,
    getProjectForViewError,
  } = useProjects();
  const unwrappedParams =
    // @ts-expect-error -- React.use(params) is required for future Next.js versions
    typeof params.then === "function" ? React.use(params) : params;
  const projectId = (unwrappedParams as { projectId: string }).projectId;
  const [project, setProject] = useState<ProjectViewDto | null>(null);

  useEffect(() => {
    getProjectForView(projectId)
      .then(async (res) => {
        const data = await res.json();
        setProject(data);
      })
      .catch(console.error);
  }, [projectId]);

  if (getProjectForViewLoading || !project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
          <div className="text-center">
            <h2 className="text-lg font-medium text-foreground">
              Building the Project
            </h2>
            <p className="text-sm text-muted-foreground">
              Please wait a moment...
            </p>
          </div>
        </div>
      </div>
    );
  }

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
              {project.user.full_name || "Project Author"}
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

        <div className="w-full h-fit flex justify-start items-center relative -mt-32">
          <div className="bg-background/95 backdrop-blur rounded-lg p-8 shadow-lg w-full max-w-[900px] mx-auto">
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
                    href={
                      project.live_url.includes("https://")
                        ? project.live_url
                        : "https://" + project.live_url
                    }
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
                    href={
                      project.github_url.includes("https://")
                        ? project.github_url
                        : "https://" + project.github_url
                    }
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
          data={project.layout}
          replacements={project.replacements}
        />
      </div>

      {/* Author Info */}
      <section className="w-full bg-muted/30">
        <div className="wfull max-w-[900px] mx-auto py-8">
          <div className="w-full px-16">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src={project.user.avatar_url || "/placeholder.svg"}
                      alt={project.user.full_name}
                    />
                    <AvatarFallback className="text-lg">
                      {project.user?.full_name
                        ? (project.user.full_name.split(" ")[0]?.[0] || "") +
                          (project.user.full_name.split(" ")[1]?.[0] || "")
                        : "User"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">
                      {project.user.full_name}
                    </h3>
                    <p className="text-lg text-muted-foreground mb-4">
                      {project.user.professional_title}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-muted-foreground mb-2">
                    {project.user.bio}
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
              © 2025 {project.user.full_name}. Built with{" "}
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
