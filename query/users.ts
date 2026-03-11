"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { generateNickname } from "@/app/utils/nickname";
import {
  getCurrentUser,
  getUserProfile,
  signInAnonymously,
  signOut,
  upsertUser,
} from "@/services/users";

export const usersKeys = {
  all: ["users"],
  auth: () => [...usersKeys.all, "auth"],
  profile: () => [...usersKeys.all, "profile"],
  profileById: (userId: string) => [...usersKeys.profile(), userId],
} as const;

export function useAnonymousLoginMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [...usersKeys.auth(), "anonymous-login"],
    mutationFn: async () => {
      const { data, error } = await signInAnonymously();

      if (error || !data.user) {
        throw error ?? new Error("로그인에 실패했어요.");
      }

      const user = data.user;

      const { error: upsertError } = await upsertUser({
        id: user.id,
        provider: "anonymous",
        provider_id: user.id,
        email: user.email,
        nickname: generateNickname(),
        profile_image: null,
        is_anonymous: true,
      });

      if (upsertError) {
        const { error: signOutError } = await signOut();

        if (signOutError) {
          console.error(signOutError);
        }

        throw upsertError;
      }

      return user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData([...usersKeys.auth(), "current-user"], user);
    },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...usersKeys.auth(), "logout"],
    mutationFn: async () => {
      const { error } = await signOut();

      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.setQueryData([...usersKeys.auth(), "current-user"], null);
      queryClient.removeQueries({
        queryKey: [...usersKeys.auth(), "current-user"],
      });
      queryClient.removeQueries({
        queryKey: usersKeys.profile(),
      });
    },
  });
}

export function useCurrentUserQuery() {
  return useQuery({
    queryKey: [...usersKeys.auth(), "current-user"],
    queryFn: async () => {
      const { data, error } = await getCurrentUser();

      if (error) {
        throw error;
      }

      return data.user;
    },
  });
}

export function useUserProfileQuery(userId?: string) {
  return useQuery({
    queryKey: usersKeys.profileById(userId ?? ""),
    queryFn: async () => {
      if (!userId) {
        return null;
      }

      const { data, error } = await getUserProfile(userId);

      if (error) {
        throw error;
      }

      return data;
    },
    enabled: Boolean(userId),
  });
}
