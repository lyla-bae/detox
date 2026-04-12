"use client";

import { EMPTY_STATE_PREVIEW_STATISTICS } from "@/app/utils/empty-state-preview";
import ComparisonChart from "./comparison-chart";
import ComparisonInsight from "./comparison-insight";

interface Props {
  userName: string;
}

export default function EmptyStatisticsPreview({ userName }: Props) {
  const displayUserName = userName || "사용자";

  return (
    <div
      className="h-full w-full overflow-hidden animate-in fade-in duration-500 pointer-events-none"
      aria-hidden="true"
    >
      <div className="mt-4">
        <ComparisonInsight
          title={EMPTY_STATE_PREVIEW_STATISTICS.ageBand.title}
          diffAmount={EMPTY_STATE_PREVIEW_STATISTICS.ageBand.diffAmount}
          status={EMPTY_STATE_PREVIEW_STATISTICS.ageBand.status}
        />

        <ComparisonChart
          userName={`${displayUserName}님`}
          userAmount={EMPTY_STATE_PREVIEW_STATISTICS.ageBand.userAmount}
          compareName={EMPTY_STATE_PREVIEW_STATISTICS.ageBand.compareName}
          compareAmount={EMPTY_STATE_PREVIEW_STATISTICS.ageBand.compareAmount}
        />
      </div>

      <div className="mt-10">
        <ComparisonInsight
          title={EMPTY_STATE_PREVIEW_STATISTICS.service.title}
          diffAmount={EMPTY_STATE_PREVIEW_STATISTICS.service.diffAmount}
          status={EMPTY_STATE_PREVIEW_STATISTICS.service.status}
        />

        <ComparisonChart
          userName={EMPTY_STATE_PREVIEW_STATISTICS.service.userName}
          userAmount={EMPTY_STATE_PREVIEW_STATISTICS.service.userAmount}
          compareName={EMPTY_STATE_PREVIEW_STATISTICS.service.compareName}
          compareAmount={EMPTY_STATE_PREVIEW_STATISTICS.service.compareAmount}
        />
      </div>
    </div>
  );
}
