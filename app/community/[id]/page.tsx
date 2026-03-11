import Header from "@/app/components/header";
import CommunityDetailContent from "../_components/community-detail-content";

type CommunityDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CommunityDetailPage({
  params,
}: CommunityDetailPageProps) {
  const { id } = await params;

  return (
    <div>
      <Header variant="back" />
      <CommunityDetailContent postId={id} />
    </div>
  );
}
