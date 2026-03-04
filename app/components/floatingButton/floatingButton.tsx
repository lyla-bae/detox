"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/app/utils/class";

type Variant = "create" | "top";

type FloatingButtonProps = {
  variant: Variant;
  onClick?: () => void;
};

const variantMap = {
  create: {
    icon: faPlus,
    className: "btn-primary",
  },
  top: {
    icon: faArrowUp,
    className: "btn-white",
  },
} as const;

export default function FloatingButton({
  variant,
  onClick,
}: FloatingButtonProps) {
  const { icon, className } = variantMap[variant];
  const handleClick = () => {
    if (variant === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    onClick?.();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn("btn btn-rounded mr-6", className)}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}
