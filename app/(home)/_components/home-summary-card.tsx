"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getSubscriptionSummary,
  type SubscriptionSummary,
} from "@/app/utils/subscriptions/get-subscription-summary";
import { useRandomFood } from "../_hooks/use-random-food";

interface Props {
  hasSubscription: boolean;
  thisMonthTotal: number;
  lastMonthTotal?: number | null;
}

export default function HomeSummaryCard({
  hasSubscription,
  thisMonthTotal,
  lastMonthTotal,
}: Props) {
  const card = getSubscriptionSummary({
    hasSubscription,
    thisMonthTotal,
    lastMonthTotal,
  });
  const { food, isLoading } = useRandomFood({
    enabled: card.type === "this-month" || card.type === "saved",
    totalPrice:
      card.type === "this-month" || card.type === "saved"
        ? card.targetPrice
        : 0,
  });

  const renderCardText = (data: SubscriptionSummary) => {
    switch (data.type) {
      case "empty":
        return (
          <>
            <h2 className="text-2xl">숨겨진 구독 추가하고</h2>
            <h1 className="header-md">
              연간 최대 <span className="text-brand-primary">???원</span>
            </h1>
          </>
        );

      case "same":
        return (
          <>
            <h2 className="text-2xl">한눈에 보는</h2>
            <h1 className="header-md">
              이번달 <span className="text-brand-primary">구독통계</span>
            </h1>
          </>
        );

      case "saved":
        return (
          <>
            <h2 className="text-2xl">지난달보다</h2>
            {isLoading || !food ? (
              <div className="flex items-center gap-2 mt-1">
                <Skeleton className="h-8 w-28 rounded-md bg-brand-primary/20" />
                <Skeleton className="h-8 w-16 rounded-md bg-brand-primary/20" />
                <Skeleton className="h-8 w-20 rounded-md bg-gray-100" />
              </div>
            ) : (
              <h1 className="header-md">
                {food.label}{" "}
                <span className="text-brand-primary">
                  {food.count}
                  {food.unit}
                </span>{" "}
                아꼈어요
              </h1>
            )}
          </>
        );

      case "this-month":
        return (
          <>
            <h2 className="text-2xl">이번달 구독료로</h2>
            {isLoading || !food ? (
              <div className="flex items-center gap-2 mt-1">
                <Skeleton className="h-8 w-28 rounded-md bg-gray-100" />
                <Skeleton className="h-8 w-16 rounded-md bg-brand-primary/20" />
              </div>
            ) : (
              <h1 className="header-md">
                {food.label}{" "}
                <span className="text-brand-primary">
                  {food.count}
                  {food.unit}
                </span>
              </h1>
            )}
          </>
        );
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="title">{renderCardText(card)}</div>

        <Link
          href="/통계메인"
          className="body-lg text-gray-300 inline-flex items-center gap-1 mt-2"
        >
          자세히 알아보기
          <FontAwesomeIcon icon={faAngleRight} size="xs" />
        </Link>
      </div>
      <div>
        {isLoading && (card.type === "this-month" || card.type === "saved") ? (
          <Skeleton className="w-[100px] h-[100px] rounded-2xl bg-gray-100" />
        ) : (
          <Image
            src={
              card.type === "this-month" || card.type === "saved"
                ? (food?.imageSrc ?? "/images/emoji/main-coffee.png")
                : card.type === "same"
                  ? "/images/emoji/main-money.png"
                  : "/images/emoji/main-nodata.png"
            }
            alt={
              card.type === "this-month" || card.type === "saved"
                ? (food?.label ?? "")
                : ""
            }
            width={100}
            height={100}
          />
        )}
      </div>
    </>
  );
}
