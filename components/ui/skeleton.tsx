import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "chart";
}

function Skeleton({
  className,
  variant = "default",
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md",
        variant === "default" && "bg-gray-100",
        variant === "chart" && "bg-gray-200/70",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
