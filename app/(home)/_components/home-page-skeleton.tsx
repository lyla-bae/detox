import { Skeleton } from "@/components/ui/skeleton";

export default function HomePageSkeleton() {
  return (
    <div>
      <section className="mb-4 grid grid-cols-[1fr_100px] items-center justify-between bg-white px-6 py-5">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-8 w-28" />
        </div>
        <Skeleton className="h-[100px] w-[100px] rounded-lg" />
      </section>
      <section className="border-t-16 border-t-gray-100 bg-white pt-10">
        <div className="flex flex-col gap-4 px-6">
          <div className="flex justify-between">
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-6 w-20" />
          </div>
          <div className="flex flex-col gap-3">
            <Skeleton className="h-[72px] w-full rounded-lg" />
            <Skeleton className="h-[72px] w-full rounded-lg" />
          </div>
        </div>
      </section>
    </div>
  );
}
