"use client";

import { Bar, BarChart, Cell, LabelList } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  userName?: string;
  userAmount?: number;
  compareName?: string;
  compareAmount?: number;
  data?: { month: string; my_spend: number; avg_spend: number }[];
  diffAmount?: number;
  diffMessage?: string;
  isLoading?: boolean;
}

export default function ComparisonChart({
  userName,
  userAmount,
  compareName,
  compareAmount,
  data,
  isLoading = false,
}: Props) {
  if (isLoading) {
    const skeletonBars = [
      {
        labelClassName: "h-5 w-16",
        barClassName: "h-28 w-[30px] rounded-t-[4px] rounded-b-none",
      },
      {
        labelClassName: "h-5 w-20",
        barClassName: "h-36 w-[30px] rounded-t-[4px] rounded-b-none",
      },
    ];

    return (
      <div className="mx-6">
        <div className="h-56 rounded-lg bg-gray-50 px-6 pt-5">
          <div className="grid h-full grid-cols-2 gap-6 pb-2">
            {skeletonBars.map((bar, index) => (
              <div
                key={index}
                className="flex h-full flex-col items-center justify-end gap-3"
              >
                <Skeleton variant="chart" className={bar.labelClassName} />
                <Skeleton variant="chart" className={bar.barClassName} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2 grid grid-cols-2 px-6">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="flex justify-center">
              <Skeleton variant="chart" className="h-4 w-12" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const chartData = data
    ? data.map((item) => ({ name: item.month, amount: item.my_spend }))
    : [
        { name: userName || "나", amount: userAmount || 0 },
        { name: compareName || "평균", amount: compareAmount || 0 },
      ];

  const chartConfig = {
    amount: { label: "소비 금액" },
  } satisfies ChartConfig;

  return (
    <div className="flex flex-col gap-4">
      <div className="mx-6">
        <div className="h-56 rounded-lg bg-gray-50 px-6 pt-5">
          <ChartContainer
            config={chartConfig}
            className="h-full w-full aspect-auto!"
          >
            <BarChart
              data={chartData}
              margin={{ top: 30, right: 0, left: 0, bottom: 0 }}
            >
              <Bar dataKey="amount" radius={[4, 4, 0, 0]} barSize={30}>
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      index === 0 ? "var(--brand-primary)" : "var(--gray-300)"
                    }
                  />
                ))}

                <LabelList
                  dataKey="amount"
                  position="top"
                  formatter={(val: number) => `${val.toLocaleString()}원`}
                  style={{
                    fill: "var(--gray-400)",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                  offset={10}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>

        <div
          className="mt-2 grid px-6"
          style={{
            gridTemplateColumns: `repeat(${chartData.length}, minmax(0, 1fr))`,
          }}
        >
          {chartData.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="text-center body-md text-gray-400"
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
