"use client";

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type { CommunityListCursor } from "@/app/community/_types";
import type { SubscriptableBrandType } from "@/app/utils/brand/type";
import {
  createCommunityComment,
  createCommunityPost,
  deleteCommunityPost,
  getCommunityComments,
  getCommunityDetail,
  getCommunityListPage,
  getCommunityPostLikeStatus,
  toggleCommunityPostLike,
  updateCommunityPost,
} from "@/services/community";

export const communityKeys = {
  all: ["community"],
  lists: () => [...communityKeys.all, "list"],
  list: (service?: SubscriptableBrandType) => [
    ...communityKeys.lists(),
    service ?? "all",
  ],
  details: () => [...communityKeys.all, "detail"],
  detail: (postId: string) => [...communityKeys.details(), postId],
  comments: () => [...communityKeys.all, "comment"],
  commentList: (postId: string) => [...communityKeys.comments(), postId],
  likes: () => [...communityKeys.all, "like"],
  likeStatus: (postId: string, userId?: string) => [
    ...communityKeys.likes(),
    postId,
    userId ?? "guest",
  ],
} as const;

export function useInfiniteCommunityListQuery(
  service?: SubscriptableBrandType
) {
  return useInfiniteQuery({
    queryKey: communityKeys.list(service),
    initialPageParam: null as CommunityListCursor | null,
    queryFn: ({ pageParam }) =>
      getCommunityListPage({
        service,
        cursor: pageParam,
      }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

export function useCommunityDetailQuery(postId: string) {
  return useQuery({
    queryKey: communityKeys.detail(postId),
    queryFn: () => getCommunityDetail(postId),
    enabled: Boolean(postId),
  });
}

export function useCreateCommunityPostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCommunityPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: communityKeys.lists(),
      });
    },
  });
}

export function useUpdateCommunityPostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCommunityPost,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: communityKeys.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: communityKeys.detail(variables.postId),
      });
    },
  });
}

export function useDeleteCommunityPostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCommunityPost,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: communityKeys.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: communityKeys.detail(variables.postId),
      });
    },
  });
}

export function useCommunityCommentsQuery(postId: string) {
  return useQuery({
    queryKey: communityKeys.commentList(postId),
    queryFn: () => getCommunityComments(postId),
    enabled: Boolean(postId),
  });
}

export function useCommunityPostLikeStatusQuery(
  postId: string,
  userId?: string
) {
  return useQuery({
    queryKey: communityKeys.likeStatus(postId, userId),
    queryFn: () =>
      getCommunityPostLikeStatus({
        postId,
        userId: userId!,
      }),
    enabled: Boolean(postId && userId),
  });
}

export function useCreateCommunityCommentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCommunityComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: communityKeys.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: communityKeys.detail(variables.postId),
      });
      queryClient.invalidateQueries({
        queryKey: communityKeys.commentList(variables.postId),
      });
    },
  });
}

export function useToggleCommunityPostLikeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleCommunityPostLike,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: communityKeys.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: communityKeys.detail(variables.postId),
      });
      queryClient.invalidateQueries({
        queryKey: communityKeys.likeStatus(variables.postId, variables.userId),
      });
    },
  });
}
