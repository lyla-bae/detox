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

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn("btn btn-rounded mr-6", className)}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}
