"use client";
import Avatar from "@/app/components/avatar";
import type { CommunityCommentItemData } from "../_types";

type CommentListProps = {
  items: CommunityCommentItemData[];
};

export default function CommentList({ items }: CommentListProps) {
  if (items.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="body-md text-gray-400">첫 댓글을 남겨보세요.</p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 py-5 gap-5">
      {items.map((item) => (
        <li
          key={item.id}
          className="w-full grid grid-cols-1 items-center gap-1 bg-white rounded-lg"
        >
          <div className="flex items-center justify-between min-h-12">
            <div className="flex items-center gap-2">
              <Avatar size="sm" src={item.thumbUrl} alt={item.author} />
              <div className="flex gap-3">
                <div className="text-sm text-black font-bold leading-[110%]">
                  {item.author}
                </div>
                <span className="text-xs text-gray-300">{item.timeAgo}</span>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-300">
            <p className="text-base leading-[140%] text-gray-300 line-clamp-3">
              {item.content}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
