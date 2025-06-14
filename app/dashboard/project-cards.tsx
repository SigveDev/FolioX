import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Project } from "@/types/project";
import { Edit, Eye, Trash2 } from "lucide-react";

const ProjectCards = ({
  projects,
  loading,
}: {
  projects: Project[];
  loading: boolean;
}) => {
  return (
    <>
      {loading ? (
        <>
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="animate-pulse">
              <Skeleton className="h-48 w-full rounded-t-lg" />
              <CardHeader className="p-4">
                <Skeleton className="h-4 bg-muted rounded w-3/4 mb-2" />
                <Skeleton className="h-3 bg-muted rounded w-full mb-1" />
                <Skeleton className="h-3 bg-muted rounded w-1/2" />
              </CardHeader>
              <CardContent className="p-4">
                <Skeleton className="h-3 bg-muted rounded w-full mb-2" />
                <Skeleton className="h-3 bg-muted rounded w-full" />
              </CardContent>
            </Card>
          ))}
        </>
      ) : (
        projects.map((project) => (
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
                    project.status === "published" ? "default" : "secondary"
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
              <CardTitle className="text-lg">{project.title}</CardTitle>
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
        ))
      )}
    </>
  );
};

export default ProjectCards;
