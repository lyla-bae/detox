import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase.types";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    "Supabase URL과 Anon Key가 필요합니다. .env.local에 NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY를 설정해 주세요."
  );
}

const VALIDATED_SUPABASE_URL = SUPABASE_URL;
const VALIDATED_SUPABASE_ANON_KEY = SUPABASE_ANON_KEY;

export function createPublicSupabaseServerClient() {
  return createClient<Database>(
    VALIDATED_SUPABASE_URL,
    VALIDATED_SUPABASE_ANON_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
