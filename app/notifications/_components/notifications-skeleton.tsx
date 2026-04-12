import Header from "@/app/components/header";
import { Skeleton } from "@/components/ui/skeleton";

export default function NotificationsSkeleton() {
  return (
    <main className="relative w-full min-h-screen flex flex-col items-start justify-start">
      <Header variant="back" title="알림" />
      <div className="w-full mt-5 px-6 flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <Skeleton className="h-5 w-12" />
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
