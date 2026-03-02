"use client";

import { cn } from "@/app/utils/class";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons/faCircleNotch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ButtonVariant = "primary" | "secondary" | "neutral";
type ButtonSize = "md" | "lg";

interface Props {
  variant: ButtonVariant;
  size: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  icon?: IconProp;
}

export default function Button({
  variant,
  size,
  disabled,
  loading,
  onClick,
  children,
  icon,
}: Props) {
  const isDisabled = disabled || loading;

  return (
    <button
      className={cn(
        "btn",
        `btn-${variant}`,
        `btn-${size}`,
        isDisabled ? "btn-disabled" : ""
      )}
      disabled={isDisabled}
      onClick={onClick}
    >
      {loading ? (
        <FontAwesomeIcon icon={faCircleNotch} className="animate-spin" />
      ) : (
        <>
          {icon ? <FontAwesomeIcon icon={icon} /> : null}
          {children}
        </>
      )}
    </button>
  );
}
