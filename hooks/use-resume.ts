import { deleteMyResume, uploadNewResume } from "@/lib/appwrite/resume";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useResume() {
  const queryClient = useQueryClient();

  const uploadResume = useMutation<void, Error, { file: File }>({
    mutationFn: async ({ file }) => {
      await uploadNewResume(file);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resume"] });
    },
  });

  const deleteResume = useMutation<void, Error>({
    mutationFn: async () => {
      await deleteMyResume();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resume"] });
    },
  });

  return {
    uploadResume: async (file: File) => {
      try {
        await uploadResume.mutateAsync({ file });
        return true;
      } catch {
        return false;
      }
    },
    deleteResume: async () => {
      try {
        await deleteResume.mutateAsync();
        return true;
      } catch {
        return false;
      }
    },
  };
}
