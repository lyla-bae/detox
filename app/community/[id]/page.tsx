import { notFound } from "next/navigation";
import CommunityDetailContent from "./_components/community-detail-content";
import {
  getServerCommunityComments,
  getServerCommunityDetail,
  getServerRecommendedCommunityPosts,
} from "../_server/community";

type CommunityDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CommunityDetailPage({
  params,
}: CommunityDetailPageProps) {
  const { id } = await params;

  const post = await getServerCommunityDetail(id);

  if (!post) {
    notFound();
  }
  const [recommendedPosts, initialComments] = await Promise.all([
    getServerRecommendedCommunityPosts({
      postId: id,
      service: post.service,
    }),
    getServerCommunityComments(id),
  ]);

  return (
    <CommunityDetailContent
      postId={id}
      initialPost={post}
      initialRecommendedPosts={recommendedPosts}
      initialComments={initialComments}
    />
  );
}
