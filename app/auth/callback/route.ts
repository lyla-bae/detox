import { getLoginRedirectUrl } from "@/app/utils/auth/get-login-redirect-url";
import { fetchNaverProfile } from "@/app/utils/auth/fetch-naver-profile";
import { getSafeRedirectPath } from "@/app/utils/auth/get-safe-redirect-path";
import { upsertUserWithNicknameRetry } from "@/app/utils/auth/upsert-user-with-nickname-retry";
import { generateNickname } from "@/app/utils/nickname";
import { createServerClient } from "@supabase/ssr";
import type { Session, User } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

function redirectWithCookies(
  path: string,
  request: NextRequest,
  response: NextResponse
) {
  const redirectResponse = NextResponse.redirect(new URL(path, request.url));

  response.cookies.getAll().forEach((cookie) => {
    redirectResponse.cookies.set(cookie);
  });

  return redirectResponse;
}

type UnknownRecord = Record<string, unknown>;
type ResolvedOAuthProfile = {
  provider: string;
  providerId: string;
  email: string | null;
  name: string | null;
  profileImage: string | null;
};

function toRecord(value: unknown): UnknownRecord | null {
  return value && typeof value === "object" ? (value as UnknownRecord) : null;
}

function getString(record: UnknownRecord | null, key: string) {
  const value = record?.[key];
  return typeof value === "string" ? value.trim() || null : null;
}

function getIdentityData(user: User, provider: string) {
  const identity =
    user.identities?.find((item) => item.provider === provider) ??
    user.identities?.[0];

  return toRecord(identity?.identity_data);
}

function getOAuthProvider(user: User) {
  const providerFromMetadata = user.app_metadata.provider;

  if (typeof providerFromMetadata === "string" && providerFromMetadata) {
    return providerFromMetadata;
  }

  const providerFromIdentity = user.identities?.[0]?.provider;

  if (typeof providerFromIdentity === "string" && providerFromIdentity) {
    return providerFromIdentity;
  }

  throw new Error("OAuth provider 정보를 찾을 수 없어요.");
}

async function resolveOAuthProfile(
  user: User,
  session: Session | null
): Promise<ResolvedOAuthProfile> {
  const provider = getOAuthProvider(user);
  const metadata = toRecord(user.user_metadata);
  const identityData = getIdentityData(user, provider);
  const fetchedProfile =
    provider === "custom:naver"
      ? await fetchNaverProfile(session?.provider_token)
      : null;

  return {
    provider,
    providerId:
      fetchedProfile?.providerId ??
      getString(identityData, "provider_id") ??
      getString(identityData, "id") ??
      getString(identityData, "sub") ??
      user.id,
    email:
      fetchedProfile?.email ?? user.email ?? getString(metadata, "email"),
    name:
      fetchedProfile?.name ??
      getString(metadata, "name") ??
      getString(metadata, "full_name") ??
      getString(metadata, "nickname"),
    profileImage:
      fetchedProfile?.profileImage ??
      getString(metadata, "avatar_url") ??
      getString(metadata, "picture") ??
      getString(metadata, "profile_image"),
  };
}

async function syncOAuthUser(
  supabase: ReturnType<typeof createServerClient>,
  user: User,
  profile: ResolvedOAuthProfile
) {
  const { data: existingUser, error: existingUserError } = await supabase
    .from("users")
    .select("nickname, profile_image")
    .eq("id", user.id)
    .maybeSingle();

  if (existingUserError) {
    throw existingUserError;
  }

  await upsertUserWithNicknameRetry({
    makeNickname: (retryCount) => {
      if (retryCount === 0) {
        return existingUser?.nickname ?? profile.name ?? generateNickname();
      }

      return profile.name
        ? `${profile.name}${Math.floor(1000 + Math.random() * 9000)}`
        : generateNickname();
    },
    tryUpsert: (nickname) =>
      supabase.from("users").upsert({
        id: user.id,
        email: profile.email,
        provider: profile.provider,
        provider_id: profile.providerId,
        is_anonymous: false,
        nickname,
        profile_image: existingUser?.profile_image ?? profile.profileImage,
        deleted_at: null,
      }),
    canRetry: () => !existingUser?.nickname,
  });
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const nextPath = getSafeRedirectPath(
    request.nextUrl.searchParams.get("redirect")
  );

  let response = NextResponse.next({ request });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        response = NextResponse.next({ request });

        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  if (!code) {
    return redirectWithCookies(
      getLoginRedirectUrl(nextPath),
      request,
      response
    );
  }

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user) {
    console.error(error);
    return redirectWithCookies(
      getLoginRedirectUrl(nextPath),
      request,
      response
    );
  }

  try {
    const oauthProfile = await resolveOAuthProfile(data.user, data.session);
    await syncOAuthUser(supabase, data.user, oauthProfile);
  } catch (syncError) {
    console.error(syncError);
    await supabase.auth.signOut();

    return redirectWithCookies(
      getLoginRedirectUrl(nextPath),
      request,
      response
    );
  }

  return redirectWithCookies(nextPath, request, response);
}
