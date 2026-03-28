import { revalidateTag } from "next/cache";
import { COMMUNITY_LIST_CACHE_TAG } from "@/lib/community-list-cache";

export function POST() {
  revalidateTag(COMMUNITY_LIST_CACHE_TAG, { expire: 0 });

  return Response.json({ ok: true });
}
