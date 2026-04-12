"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import AIAnalysisBanner from "./_components/ai-analysis-banner/ai-analysis-banner";
import Header from "@/app/components/header";
import BottomNav from "@/app/components/bottom-nav";
import BottomCTA from "@/app/components/bottom-cta";
import MonthExpenseSelector from "./_components/month-expense-selector";
import AgeBandSection from "./_components/age-band-section";
import ServiceComparisonSection from "./_components/service-comparison-section";
import EmptyAnalysis from "./_components/empty-analysis";
import EmptySubscriptionOverlay from "./_components/empty-subscription-overlay";
import EmptyStatisticsPreview from "./_components/empty-statistics-preview";
import AnalysisSummary, {
  type AnalysisSummaryItem,
} from "./_components/analysis-summary/analysis-summary";
import ErrorScreen from "@/app/components/error-screen/error-screen";
import { EMPTY_STATE_PREVIEW_SUBSCRIPTION_TOTAL } from "@/app/utils/empty-state-preview";

import { calculateMonthlyTotal } from "@/app/utils/subscriptions/calculate";
import { useCurrentUserQuery, useUserProfileQuery } from "@/query/users";
import { useAnalysisStore } from "@/store/useAnalysisStore";
import { AnalysisResponse } from "@/app/utils/subscriptions/validation";
import { QUICK_ANALYSIS_QUESTIONS } from "@/app/utils/ai/quick-analysis-questions";
import { useSubscriptionStats } from "@/hooks/useSubscriptionStats";

export default function StatisticsPageClient() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { data: user, isLoading: isUserLoading } = useCurrentUserQuery();
  const { data: profile, isLoading: isProfileLoading } = useUserProfileQuery(
    user?.id
  );
  const rawNickname = profile?.nickname || user?.user_metadata?.nickname;
  const userName =
    isUserLoading || isProfileLoading ? "" : rawNickname || "사용자";
  const isLoggedIn = Boolean(user);

  const isUserResolved = user !== undefined && !isUserLoading;

  const {
    subscriptions,
    subscriptionSummaries,
    serviceAvgMap,
    isSubscriptionsLoading,
    isServiceAvgLoading,
    isError,
  } = useSubscriptionStats();

  const byQuestion = useAnalysisStore((s) => s.byQuestion);
  const analysisSummaryItems: AnalysisSummaryItem[] =
    QUICK_ANALYSIS_QUESTIONS.flatMap((q) => {
      const data = byQuestion[q];
      return data
        ? [{ label: q, data: data as unknown as AnalysisResponse }]
        : [];
    });

  const monthlyTotalAmount = calculateMonthlyTotal(subscriptions, selectedDate);
  const isAllEmpty =
    isUserResolved && !isSubscriptionsLoading && subscriptions.length === 0;
  const isMonthlyEmpty =
    isUserResolved &&
    !isSubscriptionsLoading &&
    !isAllEmpty &&
    monthlyTotalAmount === 0;
  const displayAmount = isAllEmpty
    ? EMPTY_STATE_PREVIEW_SUBSCRIPTION_TOTAL
    : isMonthlyEmpty
      ? 0
      : monthlyTotalAmount;

  return (
    <div className={cn(isAllEmpty && "flex h-dvh flex-col overflow-hidden")}>
      <main
        className={cn(
          "relative flex w-full flex-col bg-white",
          isAllEmpty ? "min-h-0 flex-1 overflow-hidden" : "min-h-screen"
        )}
      >
        <Header variant="text" leftText="통계" hasNotification />

        <div
          className={cn(
            "flex w-full flex-1 min-h-0 flex-col",
            isAllEmpty ? "overflow-hidden" : "pb-32"
          )}
        >
          <AIAnalysisBanner isAllEmpty={isAllEmpty} />

          <div
            className={cn(
              "relative flex flex-1 min-h-0 flex-col",
              isAllEmpty && "overflow-hidden"
            )}
          >
            <MonthExpenseSelector
              selectedDate={selectedDate}
              groupCount={displayAmount}
              onChangeDate={setSelectedDate}
            />

            <div
              className={cn(
                "relative flex-1 min-h-0 w-full",
                isAllEmpty && "overflow-hidden"
              )}
            >
              {isError && (
                <ErrorScreen
                  error={new Error("데이터를 불러오는 중 문제가 발생했어요.")}
                  reset={() => window.location.reload()}
                />
              )}

              {!isAllEmpty && !isMonthlyEmpty && (
                <div className="w-full animate-in fade-in duration-500">
                  <AgeBandSection
                    userName={userName}
                    displayAmount={displayAmount}
                    isSubscriptionsLoading={isSubscriptionsLoading}
                  />

                  {subscriptionSummaries.length > 0 && (
                    <ServiceComparisonSection
                      subscriptionSummaries={subscriptionSummaries}
                      serviceAvgMap={serviceAvgMap}
                      isLoading={isSubscriptionsLoading || isServiceAvgLoading}
                    />
                  )}

                  {analysisSummaryItems.length > 0 && (
                    <div className="mt-10 border-t-8 border-gray-50">
                      <AnalysisSummary hasData items={analysisSummaryItems} />
                    </div>
                  )}
                </div>
              )}

              {!isAllEmpty && isMonthlyEmpty && <EmptyAnalysis />}

              {isAllEmpty && <EmptyStatisticsPreview userName={userName} />}
            </div>

            {isAllEmpty && <EmptySubscriptionOverlay />}
          </div>

          {isAllEmpty && (
            <BottomCTA hasBottomNav className="bg-transparent">
              {isLoggedIn ? (
                <Link
                  href="/subscription/add"
                  className="btn btn-primary btn-lg"
                >
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
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
