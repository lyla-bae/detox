export type CommunityItem = {
  id: number;
  author: string;
  timeAgo: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
  thumbUrl: string;
};

export const mockCommunityItems: CommunityItem[] = [
  {
    id: 1,
    title:
      "타이틀입니다.타이틀입니다.타이틀입니다.타이틀입니다.타이틀입니다.타이틀입니다.타이틀입니다.타이틀입니다.타이틀입니다.타이틀입니다.타이틀입니다.타이틀입니다.타이틀입니다.타이틀입니다.타이틀입니다.타이틀입니다.타이틀입니다.",
    content:
      "동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세.동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세.동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세.동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세.동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세. 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세.동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세.동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세.동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세.동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세",
    author: "lyla",
    timeAgo: "2분전",
    likeCount: 10,
    commentCount: 5,
    thumbUrl: "/images/default-user.png",
  },
  {
    id: 2,
    title: "두 번째 커뮤니티 글",
    content: "상세 페이지로 이동해 구조를 확인해 보세요.",
    author: "detox-user",
    timeAgo: "1분전",
    likeCount: 20,
    commentCount: 8,
    thumbUrl: "/images/default-user.png",
  },
];
