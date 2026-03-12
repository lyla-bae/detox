"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LoadingScreen from "@/app/components/loading-screen";
import { useCurrentUserQuery } from "@/query/users";

type CommunityAuthGuardProps = {
  children: ReactNode;
};

function getLoginRedirectUrl(pathname: string, search: string) {
  const currentUrl = search ? `${pathname}?${search}` : pathname;

  return `/login?redirect=${encodeURIComponent(currentUrl)}`;
}

export default function CommunityAuthGuard({
  children,
}: CommunityAuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentUserQuery = useCurrentUserQuery();
  const loginRedirectUrl = getLoginRedirectUrl(
    pathname,
    searchParams.toString()
  );

  useEffect(() => {
    if (currentUserQuery.isPending || currentUserQuery.data) {
      return;
    }

    router.replace(loginRedirectUrl);
  }, [
    currentUserQuery.data,
    currentUserQuery.isPending,
    loginRedirectUrl,
    router,
  ]);

  if (currentUserQuery.isPending) {
    return <LoadingScreen message="로그인 정보를 확인하고 있어요." />;
  }

  if (!currentUserQuery.data) {
    return <LoadingScreen message="로그인 페이지로 이동하고 있어요." />;
  }

  return <>{children}</>;
}
