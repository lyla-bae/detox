"use client";

import { useState } from "react";
import { faCommentDots, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "@/lib/utils";

interface Props {
  likeCount: number;
  commentCount: number;
  showLabel?: boolean;
  className?: string;
  readOnly?: boolean;
}

export default function CommunityReactionStats({
  likeCount,
  commentCount,
  showLabel = false,
  className,
  readOnly = false,
}: Props) {
  const [isLiked, setIsLiked] = useState(false);
  const liked = readOnly ? false : isLiked;

  return (
    <div className={cn("flex gap-4", className)}>
      <button
        type="button"
        className="text-sm flex items-center gap-1 cursor-pointer disabled:cursor-default"
        onClick={readOnly ? undefined : () => setIsLiked((prev) => !prev)}
        disabled={readOnly}
      >
        <FontAwesomeIcon
          icon={faThumbsUp}
          size="sm"
          className={cn(liked ? "text-brand-primary" : "text-gray-200")}
        />
        <span className={cn(liked ? "text-brand-primary" : "text-gray-400")}>
          {showLabel ? `좋아요 ${likeCount}` : `${likeCount}`}
        </span>
      </button>

      <button
        type="button"
        className="text-sm flex items-center gap-1 cursor-pointer disabled:cursor-default"
        disabled={readOnly}
      >
        <FontAwesomeIcon
          icon={faCommentDots}
          size="sm"
          className="text-gray-200"
        />
        <span className="text-gray-400">
          {showLabel ? `댓글 ${commentCount}` : `${commentCount}`}
        </span>
      </button>
    </div>
  );
}
