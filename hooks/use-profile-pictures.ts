import { uploadNewProfileCover } from "@/lib/appwrite/profile-covers";
import { uploadNewProfilePicture } from "@/lib/appwrite/profile-pictures";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useProfilePictures() {
  const queryClient = useQueryClient();

  const { mutate: uploadProfilePicture, error: uploadError } = useMutation<
    void,
    Error,
    { fileString: string }
  >({
    mutationFn: async ({ fileString }) => {
      // Assume uploadNewProfilePicture uploads the file and returns the new picture
      await uploadNewProfilePicture(fileString);
      return;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profilePictures"] });
    },
  });

  const { mutate: uploadProfileCover, error: uploadCoverError } = useMutation<
    void,
    Error,
    { fileString: string }
  >({
    mutationFn: async ({ fileString }) => {
      // Assume uploadNewProfileCover uploads the file and returns the new cover
      await uploadNewProfileCover(fileString);
      return;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profileCovers"] });
    },
  });

  return {
    uploadProfilePicture,
    uploadError,
    uploadProfileCover,
    uploadCoverError,
  };
}
