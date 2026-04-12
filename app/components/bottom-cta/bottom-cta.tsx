"use client";

import { cn } from "@/lib/utils";

export const BOTTOM_CTA_HEIGHT = 88; // py-4(32px) + 버튼 h-14(56px)
export const BOTTOM_NAV_HEIGHT = 60;

interface Props {
  children: React.ReactNode;
  className?: string;
  hasBottomNav?: boolean;
  reserveSpace?: boolean;
}

export default function BottomCTA({
  children,
  className,
  hasBottomNav = false,
  // reserveSpace = true,
}: Props) {
  return (
    <>
      {/* {reserveSpace ? (
        <div style={{ height: BOTTOM_CTA_HEIGHT }} aria-hidden />
      ) : null} */}
      <div
        className={cn(
          "fixed z-99 left-0 right-0 bg-white px-6 py-4 max-w-(--max-width) mx-auto",
          hasBottomNav
            ? "bottom-[calc(60px+env(safe-area-inset-bottom))]"
            : "bottom-0",
          className ?? ""
        )}
      >
        {children}
      </div>
    </>
  );
}
