import type {
  CommunityListCursor,
  CommunityListPage,
} from "@/app/community/_types";
import type { SubscriptableBrandType } from "@/app/utils/brand/type";

type CommunityListRequestParams = {
  service?: SubscriptableBrandType;
  cursor?: CommunityListCursor | null;
  pageSize?: number;
};

const COMMUNITY_LIST_API_PATH = "/api/community/list";

export function createCommunityListApiPath(params: CommunityListRequestParams) {
  const searchParams = new URLSearchParams();

  if (params.service) {
    searchParams.set("service", params.service);
  }

  if (params.cursor) {
    searchParams.set("cursorCreatedAt", params.cursor.createdAt);
    searchParams.set("cursorId", params.cursor.id);
  }

  if (typeof params.pageSize === "number") {
    searchParams.set("pageSize", String(params.pageSize));
  }

  const queryString = searchParams.toString();

  return queryString
    ? `${COMMUNITY_LIST_API_PATH}?${queryString}`
    : COMMUNITY_LIST_API_PATH;
}

export async function fetchCommunityListPage(
  input: string | URL,
  init?: RequestInit
): Promise<CommunityListPage> {
  const response = await fetch(input, init);

  if (!response.ok) {
    let message = "커뮤니티 목록을 불러오지 못했어요.";

    try {
      const body = (await response.json()) as { message?: string };
      if (body.message) {
        message = body.message;
      }
    } catch {}

    throw new Error(message);
  }

  return (await response.json()) as CommunityListPage;
}
