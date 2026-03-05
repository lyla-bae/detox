import Link from "next/link";
import CommunityList from "./_components/CommunityList";
import Header from "../components/header";

const mockItems = [
  {
    id: 1,
    title: "첫 번째 커뮤니티 글",
    content: "커뮤니티 리스트 페이지 예시 데이터입니다.",
    author: "lyla",
    timeAgo: "2분전",
    likeCount: 10,
    commentCount: 5,
  },
  {
    id: 2,
    title: "두 번째 커뮤니티 글",
    content: "상세 페이지로 이동해 구조를 확인해 보세요.",
    author: "detox-user",
    timeAgo: "1분전",
    likeCount: 20,
    commentCount: 8,
  },
];

export default function CommunityListPage() {
  return (
    <main className="h-screen bg-gray-100">
      <Header variant="text" leftText="커뮤니티" />
      <main className="px-6">
        <CommunityList items={mockItems} />
      </main>
    </main>
  );
}
