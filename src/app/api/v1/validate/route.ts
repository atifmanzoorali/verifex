import { NextResponse, type NextRequest } from 'next/server';
import { createHash } from 'crypto';
import { z } from 'zod';
import type { SupabaseClient } from '@supabase/supabase-js';
import { errorResponse, withErrorHandler } from '@/lib/errors';
import { getServiceClient } from '@/lib/supabase/service';
import { validateFormat } from '@/lib/validate-format';
import { validateMx } from '@/lib/validate-mx';
import { RATE_LIMIT_PER_MINUTE } from '@/lib/constants';
import type { ApiSuccess } from '@/types/api.types';
import type { ValidationResult } from '@/types/validation.types';
import type { Database } from '@/types/database.types';

const RequestSchema = z.object({
  email: z.string().min(1, 'Email is required'),
});

type ServiceClient = SupabaseClient<Database>;

type KeyRow = Database['public']['Tables']['api_keys']['Row'];

type LogParams = {
  keyId: string;
  userId: string;
  domain: string;
  result: 'valid' | 'invalid';
  formatCheck: boolean;
  mxCheck: boolean;
  durationMs: number;
};

async function resolveApiKey(keyHash: string, supabase: ServiceClient): Promise<KeyRow | null> {
  const { data } = await supabase
    .from('api_keys')
    .select('id, user_id, is_active, name, key_prefix, key_hash, created_at, last_used_at')
    .eq('key_hash', keyHash)
    .single();
  return data;
}

async function checkRateLimit(keyId: string, supabase: ServiceClient): Promise<boolean> {
  const windowStart = new Date(Date.now() - 60 * 1000).toISOString();
  const { count } = await supabase
    .from('usage_logs')
    .select('*', { count: 'exact', head: true })
    .eq('api_key_id', keyId)
    .gte('created_at', windowStart);
  return (count ?? 0) >= RATE_LIMIT_PER_MINUTE;
}

async function logValidation(params: LogParams, supabase: ServiceClient): Promise<void> {
  await Promise.all([
    supabase.from('usage_logs').insert({
      api_key_id: params.keyId,
      user_id: params.userId,
      email_domain: params.domain,
      result: params.result,
      format_check: params.formatCheck,
      mx_check: params.mxCheck,
      duration_ms: params.durationMs,
    }),
    supabase.from('api_keys').update({ last_used_at: new Date().toISOString() }).eq('id', params.keyId),
  ]);
}

export const POST = withErrorHandler(async (request: NextRequest): Promise<NextResponse> => {
  const rawKey = request.headers.get('x-api-key');
  if (!rawKey) return errorResponse('API key is required', 'UNAUTHORIZED');

  const json = await request.json();
  const parsed = RequestSchema.safeParse(json);
  if (!parsed.success) {
    return errorResponse(parsed.error.errors[0]?.message ?? 'Validation failed', 'VALIDATION_ERROR');
  }
  const { email } = parsed.data;

  const keyHash = createHash('sha256').update(rawKey).digest('hex');
  const supabase = getServiceClient();

  const keyRow = await resolveApiKey(keyHash, supabase);
  if (!keyRow || !keyRow.is_active) return errorResponse('Invalid or revoked API key', 'UNAUTHORIZED');

  if (await checkRateLimit(keyRow.id, supabase)) {
    return errorResponse('Rate limit exceeded. Maximum 60 requests per minute.', 'RATE_LIMITED');
  }

  const start = Date.now();
  const formatResult = validateFormat(email);

  if (!formatResult.passed) {
    const durationMs = Date.now() - start;
    const domain = email.includes('@') ? (email.split('@')[1] ?? '') : '';
    await logValidation({ keyId: keyRow.id, userId: keyRow.user_id, domain, result: 'invalid', formatCheck: false, mxCheck: false, durationMs }, supabase);
    const body: ApiSuccess<ValidationResult> = {
      success: true,
      data: { valid: false, email, domain, checks: { format: false, mx: false }, mx_records: [], duration_ms: durationMs, reason: formatResult.reason },
    };
    return NextResponse.json(body);
  }

  const domain = email.split('@')[1] ?? '';
  const mxResult = await validateMx(domain);
  const durationMs = Date.now() - start;
  const valid = mxResult.passed;

  await logValidation({ keyId: keyRow.id, userId: keyRow.user_id, domain, result: valid ? 'valid' : 'invalid', formatCheck: true, mxCheck: valid, durationMs }, supabase);

  const body: ApiSuccess<ValidationResult> = {
    success: true,
    data: { valid, email, domain, checks: { format: true, mx: valid }, mx_records: mxResult.records, duration_ms: durationMs, reason: valid ? undefined : mxResult.reason },
  };
  return NextResponse.json(body);
});
