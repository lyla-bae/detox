"use client";

import Link from "next/link";
import type { CommunityListItemData } from "../_types";
import CommunityReactionStats from "./community-reaction-stats";
import AuthorMeta from "./author-meta";
import { buildCommunityDetailPath } from "../_utils/navigation";

type CommunityItemProps = {
  item: CommunityListItemData;
  returnTo?: string;
};

export default function CommunityItem({ item, returnTo }: CommunityItemProps) {
  return (
    <li className="w-full grid grid-cols-1 items-center gap-2 rounded-lg bg-white px-6 py-4">
      <Link href={buildCommunityDetailPath(item.id, returnTo)} className="block">
        <AuthorMeta
          thumbUrl={item.thumbUrl}
          author={item.author}
          timeAgo={item.timeAgo}
        />
        <div className="mt-4 text-sm text-gray-300">
          <h6 className="mb-2 line-clamp-2 text-lg font-bold leading-[140%] text-black">
            {item.title}
          </h6>
          <p className="line-clamp-3 text-base leading-[140%] text-gray-300">
            {item.content}
          </p>
        </div>
      </Link>
      <CommunityReactionStats
        likeCount={item.likeCount}
        commentCount={item.commentCount}
        readOnly
      />
    </li>
  );
}
