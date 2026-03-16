"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { cn } from "@/app/utils/class";
import { useLoginRedirect } from "@/app/hooks/use-login-redirect";
import { useCurrentUserQuery } from "@/query/users";

type FloatingButtonProps = {
  variant: "create" | "top";
};

const variantMap = {
  create: {
    icon: faPlus,
    className: "btn-primary",
    ariaLabel: "추가하기",
  },
  top: {
    icon: faArrowUp,
    className: "btn-white",
    ariaLabel: "맨 위로 이동하기",
  },
} as const;

export default function FloatingButton({ variant }: FloatingButtonProps) {
  const { icon, className, ariaLabel } = variantMap[variant];
  const router = useRouter();
  const { moveToLogin } = useLoginRedirect("/community/new");
  const { data: currentUser, isPending: isCurrentUserPending } =
    useCurrentUserQuery();

  const handleTopClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCreateClick = () => {
    if (isCurrentUserPending) {
      return;
    }

    if (!currentUser?.id) {
      moveToLogin();
      return;
    }

    router.push("/community/new");
  };

  const handleClick = variant === "create" ? handleCreateClick : handleTopClick;

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={handleClick}
      className={cn("btn btn-rounded mr-6", className)}
    >
      <FontAwesomeIcon icon={icon} aria-hidden="true" />
    </button>
  );
}
