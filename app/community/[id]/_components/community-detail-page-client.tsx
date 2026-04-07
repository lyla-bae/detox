"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/app/components/header";
import {
  useCommunityCommentsQuery,
  useCommunityDetailQuery,
  useRecommendedCommunityPostsQuery,
} from "@/query/community";
import CommunityReactionStats from "../../_components/community-reaction-stats";
import CommunityList from "../../_components/community-list";
import AuthorMeta from "../../_components/author-meta";
import type {
  CommunityDetailData,
  CommunityCommentItemData,
  CommunityListItemData,
} from "../../_types";
import CommunityDetailCommentSection from "./community-detail-comment-section";
import CommunityDetailLoadingScreen from "./community-detail-loading-screen";
import CommunityDetailPostActions from "./community-detail-post-actions";
import CommunityDetailRecommendedPostsSkeleton from "./community-detail-recommended-posts-skeleton";
import { getCommunityReturnTo } from "../../_utils/navigation";

type CommunityDetailPageClientProps = {
  postId: string;
  initialPost: CommunityDetailData;
  initialRecommendedPosts: CommunityListItemData[];
  initialComments: CommunityCommentItemData[];
};

export default function CommunityDetailPageClient({
  postId,
  initialPost,
  initialRecommendedPosts,
  initialComments,
}: CommunityDetailPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const commentInputRef = useRef<HTMLInputElement | null>(null);
  const returnTo = getCommunityReturnTo(searchParams.get("returnTo"));
  const detailQuery = useCommunityDetailQuery(postId, initialPost);
  const commentsQuery = useCommunityCommentsQuery(postId, initialComments);
  const recommendedPostsQuery = useRecommendedCommunityPostsQuery(
    postId,
    initialPost.service,
    initialRecommendedPosts
  );

  const post = detailQuery.data === undefined ? initialPost : detailQuery.data;
  const comments = commentsQuery.data ?? [];
  const recommendedPosts = recommendedPostsQuery.data ?? [];

  useEffect(() => {
    if (detailQuery.data === null) {
      router.replace("/community");
    }
  }, [detailQuery.data, router]);

  if (post === null) {
    return <CommunityDetailLoadingScreen />;
  }

  return (
    <>
      <Header
        variant="back"
        onBack={() => router.replace(returnTo)}
        fallbackPath={returnTo}
      />
      <main>
        <section className="px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <AuthorMeta
              thumbUrl={post.thumbUrl}
              author={post.author}
              timeAgo={post.timeAgo}
            />
            <CommunityDetailPostActions
              postId={postId}
              postUserId={post.userId}
              returnTo={returnTo}
            />
          </div>

          <div className="mt-4 text-sm text-gray-300">
            <h6 className="mb-2 text-lg font-bold leading-[140%] text-black">
              {post.title}
            </h6>
            <p className="text-base leading-[140%] text-gray-300 whitespace-pre-wrap">
              {post.content}
            </p>
          </div>
        </section>

        <section className="border-t-8 border-gray-50 py-5">
          <CommunityReactionStats
            likeCount={post.likeCount}
            commentCount={comments.length}
            showLabel
            className="px-6"
            postId={postId}
            commentInputRef={commentInputRef}
          />
        </section>

        <CommunityDetailCommentSection
          postId={postId}
          comments={comments}
          isCommentsPending={commentsQuery.isPending}
          isCommentsError={commentsQuery.isError}
          commentInputRef={commentInputRef}
        />

        {recommendedPostsQuery.isPending ? (
          <CommunityDetailRecommendedPostsSkeleton />
        ) : recommendedPosts.length > 0 ? (
          <section className="bg-gray-50 px-6 py-6">
            <h3 className="title-md">
              <span className="text-brand-primary">AI디톡이</span>가 추천해주는
              관련 게시글
            </h3>

            <CommunityList items={recommendedPosts} returnTo={returnTo} />
          </section>
        ) : null}
      </main>
    </>
  );
}
