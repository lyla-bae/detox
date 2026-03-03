import Badge from "../components/badge";
import BottomNav from "../components/bottomNav";
import CommunityList from "../components/communityList";
import SubcriptionList from "../components/SubcriptionList";

export default function TestPage() {
  return (
    <div>
      <div className="community-item-list">
        <CommunityList
          userName="라일라"
          timeAgo="2분전"
          communityTitle="타이틀은 2줄까지만 나와요. 그 이후엔 잘려서 나와야 해요. 타이틀은 2줄까지만 나와요. 그 이후엔 잘려서 나와야 해요.타이틀은 2줄까지만 나와요. 그 이후엔 잘려서 나와야 해요."
          communityContent="동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세.동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세.동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세.동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세.동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세.
동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세.동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세.동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세.동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세.동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세."
          likeCount={10}
          commentCount={5}
        />
        <CommunityList
          userName="라일라"
          timeAgo="2분전"
          communityTitle="타이틀은 2줄까지만 나와요. 그 이후엔 잘려서 나와야 해요. 타이틀은 2줄까지만 나와요. 그 이후엔 잘려서 나와야 해요.타이틀은 2줄까지만 나와요. 그 이후엔 잘려서 나와야 해요."
          communityContent="동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세.동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세.동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세.동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세.동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세.
동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세.동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세.동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세.동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세.동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세."
          likeCount={10}
          commentCount={5}
        />
        <SubcriptionList
          href="/"
          name="Spotify Premium"
          price={0}
          billingCycle="월간결제"
          badgeLabel="내일결제"
          badgeVariant="danger"
        />
        <SubcriptionList
          href="/"
          name="Spotify Premium"
          price={7900}
          billingCycle="월간결제"
          badgeLabel={`D-${24}`}
          badgeVariant="primary"
        />
      </div>
      <BottomNav />
    </div>
  );
}
