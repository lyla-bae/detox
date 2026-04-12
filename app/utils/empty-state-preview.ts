import type { SubscriptableBrandType } from "@/app/utils/brand/type";

export type EmptyStatePreviewSubscription = {
  brandType: SubscriptableBrandType;
  price: number;
  billingCycle: "monthly" | "yearly";
  group?: boolean;
  groupCount?: number;
  isFreeTrial?: boolean;
};

export const EMPTY_STATE_PREVIEW_SUBSCRIPTIONS: EmptyStatePreviewSubscription[] =
  [
    {
      brandType: "netflix",
      price: 17000,
      billingCycle: "monthly",
    },
    {
      brandType: "youtube-premium",
      price: 14900,
      billingCycle: "monthly",
    },
    {
      brandType: "wavve",
      price: 3300,
      billingCycle: "monthly",
    },
    {
      brandType: "nintendo-family",
      price: 8750,
      billingCycle: "monthly",
      group: true,
      groupCount: 4,
    },
  ];

export const EMPTY_STATE_PREVIEW_SUBSCRIPTION_TOTAL =
  EMPTY_STATE_PREVIEW_SUBSCRIPTIONS.reduce((sum, item) => sum + item.price, 0);

export const EMPTY_STATE_PREVIEW_STATISTICS = {
  ageBand: {
    title: "20대 평균 소비와 비교",
    diffAmount: 5400,
    status: "under" as const,
    userAmount: 15200,
    compareName: "20대 평균",
    compareAmount: 20600,
  },
  service: {
    title: "넷플릭스 유저 평균 소비와 비교",
    diffAmount: 4300,
    status: "over" as const,
    userName: "넷플릭스",
    userAmount: 17000,
    compareName: "넷플릭스 평균 소비",
    compareAmount: 12700,
  },
};
