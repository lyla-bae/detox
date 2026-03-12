"use client";

import { useState } from "react";
import AlertDialogComponent from "@/app/components/alert/alert-dialog";
import KebabMenu from "@/app/components/kebabmenu";
import { useToast } from "@/app/hooks/useToast";
import type { AlertItem } from "@/store/useAlertStore";

interface DetailKebabProps {
  variant?: "default" | "edit";
  onEdit?: () => void;
  onDelete?: () => Promise<void> | void;
}

export default function DetailKebab({
  variant = "default",
  onEdit,
  onDelete,
}: DetailKebabProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const {
    success,
    warning,
    error: errorToast,
  } = useToast();

  const deleteAlert: AlertItem = {
    id: "delete-post-alert",
    title: "게시글을 삭제할까요?",
    description: "삭제 후에는 되돌릴 수 없습니다.",
    confirmText: "삭제",
    cancelText: "취소",
    variant: "danger",
    onConfirm: async () => {
      if (!onDelete) return;

      try {
        await onDelete();
        success("게시글이 삭제되었습니다.");
      } catch (error) {
        console.error(error);
        errorToast("게시글 삭제에 실패했어요.");
      }
    },
  };

  return (
    <>
      <KebabMenu
        variant={variant}
        onEdit={variant === "edit" ? onEdit : undefined}
        onDelete={
          variant === "edit" && onDelete
            ? () => setIsDeleteDialogOpen(true)
            : undefined
        }
        onReport={
          variant === "default"
            ? () => warning("게시글이 신고되었습니다.")
            : undefined
        }
      />
      <AlertDialogComponent
        alert={deleteAlert}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />
    </>
  );
}
