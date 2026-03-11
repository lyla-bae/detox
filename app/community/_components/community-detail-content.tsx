"use client";

import Avatar from "@/app/components/avatar";
import Button from "@/app/components/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCommunityDetailQuery } from "@/query/community";
import CommunityReactionStats from "./community-reaction-stats";

type CommunityDetailContentProps = {
  postId: string;
};

export default function CommunityDetailContent({
  postId,
}: CommunityDetailContentProps) {
  const communityDetailQuery = useCommunityDetailQuery(postId);

  if (communityDetailQuery.isPending) {
    return (
      <main className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>

        <div className="mt-4 space-y-3">
          <Skeleton className="h-7 w-3/4" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
          <Skeleton className="h-5 w-2/3" />
        </div>
      </main>
    );
  }

  if (communityDetailQuery.isError) {
    return (
      <main className="px-6 py-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="body-md text-gray-400">게시글을 불러오지 못했어요.</p>
          <Button
            variant="secondary"
            size="md"
            onClick={() => communityDetailQuery.refetch()}
          >
            다시 시도
          </Button>
        </div>
      </main>
    );
  }

  if (!communityDetailQuery.data) {
    return (
      <main className="px-6 py-12">
        <div className="flex flex-col items-center text-center">
          <p className="body-md text-gray-400">
            삭제되었거나 없는 게시글입니다.
          </p>
        </div>
      </main>
    );
  }

  const post = communityDetailQuery.data;

  return (
    <main>
      <section className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Avatar size="sm" src={post.thumbUrl} alt={post.author} />
          <div className="flex gap-3">
            <div className="text-sm text-black font-bold leading-[110%]">
              {post.author}
            </div>
            <span className="text-xs text-gray-300">{post.timeAgo}</span>
          </div>
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
          commentCount={post.commentCount}
          showLabel
          className="px-6"
          readOnly
        />
      </section>
    </main>
  );
}
