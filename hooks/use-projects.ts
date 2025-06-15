import { getMyProjects, getProjectByIdForView } from "@/lib/appwrite/projects";
import { Project } from "@/types/project";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useProjects() {
  const queryClient = useQueryClient();

  const {
    data: projects,
    isLoading: loading,
    error,
    refetch,
  } = useQuery<Project[]>({
    queryKey: ["userProjects"],
    queryFn: async () => {
      const projects = await getMyProjects();
      return projects ?? [];
    },
  });

  const getProjectForView = useMutation({
    mutationFn: async (projectId: string) => {
      const project = await fetch(`/api/projects/${projectId}`);
      if (!project.ok) {
        throw new Error("Failed to fetch project");
      }
      return project;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProjects"] });
    },
  });

  return {
    projects,
    loading,
    error,
    refetch,
    getProjectForView: (projectId: string) => {
      try {
        return getProjectForView.mutateAsync(projectId);
      } catch (error) {
        console.error("Error fetching project for view:", error);
        throw error;
      }
    },
    getProjectForViewLoading: getProjectForView.isPending,
    getProjectForViewError: getProjectForView.error,
  };
}
