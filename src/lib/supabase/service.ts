import { createClient } from '@supabase/supabase-js';
import { env } from '@/lib/env';
import type { Database } from '@/types/database.types';

// Singleton — one service client per process, not per request.
// Uses the service role key which bypasses RLS.
// Only used server-side for operations that run outside a user session
// (e.g. the validate endpoint, which authenticates via API key not cookie).
let client: ReturnType<typeof createClient<Database>> | null = null;

export function getServiceClient(): ReturnType<typeof createClient<Database>> {
  if (!client) {
    client = createClient<Database>(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { persistSession: false } }
    );
  }
  return client;
}
