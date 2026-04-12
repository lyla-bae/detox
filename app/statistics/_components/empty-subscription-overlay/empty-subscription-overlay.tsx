"use client";

export default function EmptySubscriptionOverlay() {
  return (
    <div className="absolute inset-0 z-40 bg-white/70 backdrop-blur-xs">
      <div className="flex h-full flex-col px-6">
        <div className="flex flex-1 flex-col gap-2 items-center justify-center text-center">
          <h2 className="text-xl font-bold text-black">
            구독 서비스를 추가하세요
          </h2>
          <p className="body-lg text-gray-300">
            추가된 구독 서비스가 없어
            <br />
            지금은 통계를 낼 수 없어요
          </p>
        </div>
      </div>
    </div>
  );
}
