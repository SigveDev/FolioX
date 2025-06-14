import { getMyProjects } from "@/lib/appwrite/projects";
import { Project } from "@/types/project";
import { useQuery, useQueryClient } from "@tanstack/react-query";

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

  return {
    projects,
    loading,
    error,
    refetch,
  };
}
