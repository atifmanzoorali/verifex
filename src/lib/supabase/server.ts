import { createServerClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { env } from '@/lib/env';
import type { Database } from '@/types/database.types';

export async function createClient(): Promise<SupabaseClient<Database>> {
  const cookieStore = await cookies();

  // Type assertion required: @supabase/ssr@0.5.x was built against the
  // 3-param SupabaseClient generic; supabase-js@2.108 uses 4 params.
  // Runtime behaviour is identical — only the TypeScript signature diverged.
  return createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: Array<{ name: string; value: string; options?: object }>) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options as Parameters<typeof cookieStore.set>[2]);
          });
        },
      },
    }
  ) as unknown as SupabaseClient<Database>;
}
