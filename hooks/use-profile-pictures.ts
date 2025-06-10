import { uploadNewProfilePicture } from "@/lib/appwrite/profile-pictures";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useProfilePictures() {
  const queryClient = useQueryClient();

  const { mutate: uploadProfilePicture, error: uploadError } = useMutation<
    void,
    Error,
    void
  >({
    mutationFn: async () => {
      // Assume uploadNewProfilePicture uploads the file and returns the new picture
      await uploadNewProfilePicture();
      return;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profilePictures"] });
    },
  });

  return {
    uploadProfilePicture,
    uploadError,
  };
}
