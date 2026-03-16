"use client";

import { useRouter } from "next/navigation";
import FloatingButton from "@/app/components/floating-button";
import { useLoginRedirect } from "@/app/hooks/use-login-redirect";
import { useCurrentUserQuery } from "@/query/users";

export default function CommunityCreateFloatingButton() {
  const router = useRouter();
  const { moveToLogin } = useLoginRedirect("/community/new");
  const {
    data: currentUser,
    isPending: isCurrentUserPending,
    isError: isCurrentUserError,
  } = useCurrentUserQuery();

  const handleCreateClick = () => {
    if (isCurrentUserPending || isCurrentUserError) {
      return;
    }

    if (!currentUser?.id) {
      moveToLogin();
      return;
    }

    router.push("/community/new");
  };

  return (
    <FloatingButton
      variant="create"
      onClick={handleCreateClick}
      disabled={isCurrentUserPending}
    />
  );
}
