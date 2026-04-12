import type { ComponentProps } from "react";
import Link from "next/link";
import SubscriptionList from "@/app/components/subscription-list";
import type { SubscriptableBrandType } from "@/app/utils/brand/type";
import {
  EMPTY_STATE_PREVIEW_SUBSCRIPTIONS,
  EMPTY_STATE_PREVIEW_SUBSCRIPTION_TOTAL,
} from "@/app/utils/empty-state-preview";
import type { Tables } from "@/types/supabase.types";
import BottomCTA from "@/app/components/bottom-cta";
import { cn } from "@/lib/utils";

interface Props {
  hasSubscription: boolean;
  subscriptions: Tables<"subscription">[];
  subscriptionCount: number;
  thisMonthTotal: number;
  isLoggedIn: boolean;
}

type SubscriptionListItemProps = ComponentProps<typeof SubscriptionList>;
type DisplaySubscriptionItem = {
  key: string;
  href?: string;
} & Pick<
  SubscriptionListItemProps,
  | "brandType"
  | "price"
  | "billingCycle"
  | "group"
  | "groupCount"
  | "isFreeTrial"
>;

export default function HomeSubscriptionSection({
  hasSubscription,
  subscriptions,
  subscriptionCount,
  thisMonthTotal,
  isLoggedIn,
}: Props) {
  const displaySubscriptions: DisplaySubscriptionItem[] = hasSubscription
    ? subscriptions.map((item) => ({
        key: item.id,
        href: `/subscription/${item.id}`,
        brandType: item.service as SubscriptableBrandType,
        price: item.total_amount / Math.max(item.member_count, 1),
        billingCycle: item.billing_cycle,
        group: item.subscription_mode === "group",
        groupCount: item.member_count,
        isFreeTrial: item.payment_type === "trial",
      }))
    : EMPTY_STATE_PREVIEW_SUBSCRIPTIONS.map((item, index) => ({
        key: `preview-${index}`,
        ...item,
      }));

  const displaySubscriptionCount = hasSubscription
    ? subscriptionCount
    : EMPTY_STATE_PREVIEW_SUBSCRIPTIONS.length;
  const displayThisMonthTotal = hasSubscription
    ? thisMonthTotal
    : EMPTY_STATE_PREVIEW_SUBSCRIPTION_TOTAL;

  return (
    <section
      className={cn(
        "pt-10 bg-white border-t-gray-100 border-t-16",
        !hasSubscription && "flex min-h-0 flex-1 flex-col overflow-hidden"
      )}
    >
      <div
        className={cn(
          "relative flex flex-col justify-start items-start gap-4 min-h-[calc(100vh_-_56px_-_148px_-_16px_-_148px_-_70px)]",
          !hasSubscription && "min-h-0 flex-1 overflow-hidden"
        )}
      >
        <div
          className="px-6 w-full flex justify-between items-center"
          aria-hidden={!hasSubscription}
        >
          <h6 className="title-md text-black">
            나의 구독{" "}
            <span className="text-brand-primary">
              총 {displaySubscriptionCount}개
            </span>
          </h6>
          <h6 className="header-md">
            {displayThisMonthTotal.toLocaleString()}원
          </h6>
        </div>
        <ul
          className={cn(
            "px-6 w-full",
            !hasSubscription && "flex-1 min-h-0 overflow-hidden"
          )}
          aria-hidden={!hasSubscription}
        >
          {displaySubscriptions.map((item) => (
            <li key={item.key}>
              <SubscriptionList
                href={item.href}
                brandType={item.brandType}
                price={item.price}
                billingCycle={item.billingCycle}
                group={item.group}
                groupCount={item.groupCount}
                isFreeTrial={item.isFreeTrial}
              />
            </li>
          ))}
        </ul>
        {!hasSubscription && (
          <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center text-center bg-linear-to-bl from-white/50 to-white backdrop-blur-[1.5px]">
            <h6 className="title-md text-black">구독 서비스를 추가 하세요</h6>
            <p className="body-lg text-gray-300">
              내가 사용하는 구독을 추가하고
              <br />
              소비를 절약해보세요
            </p>
          </div>
        )}
      </div>
      <BottomCTA hasBottomNav>
        {isLoggedIn ? (
          <Link href="/subscription/add" className="btn btn-primary btn-lg">
            구독 추가하기
          </Link>
        ) : (
          <Link
            href="/login?redirect=/subscription/add"
            className="btn btn-primary btn-lg"
          >
            로그인 하기
          </Link>
        )}
      </BottomCTA>
    </section>
  );
}
