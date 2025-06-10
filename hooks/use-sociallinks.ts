import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserSocialLinks,
  updateUserSocialLinks,
} from "@/lib/appwrite/social";
import { UserSocialLink, UserSocialLinkDto } from "@/types/user-social-links";

export function useSocialLinks() {
  const queryClient = useQueryClient();

  const {
    data: socialLinks,
    isLoading: loading,
    error,
    refetch,
  } = useQuery<UserSocialLink[]>({
    queryKey: ["userSocialLinks"],
    queryFn: async () => {
      const links = await getUserSocialLinks();
      return links ?? [];
    },
  });

  const { mutateAsync: updateSocialLinks } = useMutation({
    mutationFn: (links: UserSocialLinkDto[]) => updateUserSocialLinks(links),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userSocialLinks"] });
    },
  });

  return {
    socialLinks,
    loading,
    error,
    refetch,
    updateSocialLinks,
  };
}
