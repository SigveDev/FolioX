import {
  getUserPrivacySettings,
  updateUserPrivacySettings,
} from "@/lib/appwrite/privacy";
import {
  UserPrivacySettings,
  UserPrivacySettingsDto,
} from "@/types/user-privacy";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function usePrivacy() {
  const queryClient = useQueryClient();

  const {
    data: privacySettings,
    isLoading: loading,
    error,
    refetch,
  } = useQuery<UserPrivacySettings | null>({
    queryKey: ["privacySettings"],
    queryFn: async () => {
      const record = await getUserPrivacySettings();
      if (!record) return null;
      const {
        user_id,
        profile_visibility,
        show_email,
        show_phone,
        show_location,
        share_analytics,
      } = record as any;
      return {
        user_id,
        profile_visibility,
        show_email,
        show_phone,
        show_location,
        share_analytics,
      } as UserPrivacySettings;
    },
  });

  const updatePrivacy = useMutation({
    mutationFn: async (data: UserPrivacySettingsDto) => {
      await updateUserPrivacySettings(data);
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["privacySettings"] });
    },
  });

  return {
    privacySettings,
    loading,
    error,
    refetch,
    updatePrivacy: async (data: UserPrivacySettingsDto) => {
      try {
        await updatePrivacy.mutateAsync({
          ...data,
        });
        return true;
      } catch {
        return false;
      }
    },
  };
}
