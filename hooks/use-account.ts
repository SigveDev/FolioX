import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createNewUser_Email,
  getCurrentUser,
  getCurrentUserProfile,
  loginWithEmail,
  updateUserProfile,
} from "@/lib/appwrite/account";
import type { UserProfile, UserProfileDto } from "@/types/user-profiles";
import type { Models } from "appwrite";

async function fetchUser() {
  const user = await getCurrentUser();
  if (!user) return { user: null, profile: null };
  const profile = await getCurrentUserProfile();
  return { user, profile };
}

export function useAccount() {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["account"],
    queryFn: fetchUser,
  });

  const loginMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      await loginWithEmail(email, password);
      return fetchUser();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["account"], data);
    },
  });

  const registerMutation = useMutation({
    mutationFn: async ({
      firstName,
      lastName,
      username,
      email,
      password,
    }: {
      firstName: string;
      lastName: string;
      username: string;
      email: string;
      password: string;
    }) => {
      await createNewUser_Email(firstName, lastName, username, email, password);
      return fetchUser();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["account"], data);
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: UserProfileDto) => {
      await updateUserProfile(data);
      return fetchUser();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["account"], data);
    },
  });

  return {
    user: data?.user as Models.User<Models.Preferences> | null,
    profile: data?.profile as UserProfile | null,
    loading,
    error: error as Error | null,
    login: async (email: string, password: string) => {
      try {
        await loginMutation.mutateAsync({ email, password });
        return true;
      } catch {
        return false;
      }
    },
    register: async (
      firstName: string,
      lastName: string,
      username: string,
      email: string,
      password: string
    ) => {
      try {
        await registerMutation.mutateAsync({
          firstName,
          lastName,
          username,
          email,
          password,
        });
        return true;
      } catch {
        return false;
      }
    },
    updateProfile: async (data: UserProfileDto) => {
      try {
        await updateProfileMutation.mutateAsync({ ...data });
        return true;
      } catch {
        return false;
      }
    },
    refetch,
  };
}
