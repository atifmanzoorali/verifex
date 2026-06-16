import { NextResponse, type NextRequest } from 'next/server';
import { createHash } from 'crypto';
import { z } from 'zod';
import { errorResponse, withErrorHandler } from '@/lib/errors';
import { getServiceClient } from '@/lib/supabase/service';
import { validateFormat } from '@/lib/validate-format';
import { validateMx } from '@/lib/validate-mx';
import { RATE_LIMIT_PER_MINUTE } from '@/lib/constants';
import type { ApiSuccess } from '@/types/api.types';
import type { ValidationResult } from '@/types/validation.types';

const RequestSchema = z.object({
  email: z.string().min(1, 'Email is required'),
});

export const POST = withErrorHandler(async (request: NextRequest): Promise<NextResponse> => {
  // 1. Extract API key header
  const rawKey = request.headers.get('x-api-key');
  if (!rawKey) return errorResponse('API key is required', 'UNAUTHORIZED');

  // 2. Validate request body
  const json = await request.json();
  const parsed = RequestSchema.safeParse(json);
  if (!parsed.success) {
    return errorResponse(parsed.error.errors[0].message, 'VALIDATION_ERROR');
  }
  const { email } = parsed.data;

  // 3 & 4. Hash key and look it up
  const keyHash = createHash('sha256').update(rawKey).digest('hex');
  const supabase = getServiceClient();

  const { data: keyRow } = await supabase
    .from('api_keys')
    .select('id, user_id, is_active')
    .eq('key_hash', keyHash)
    .single();

  if (!keyRow || !keyRow.is_active) {
    return errorResponse('Invalid or revoked API key', 'UNAUTHORIZED');
  }

  // 5. Rate limit — count calls from this key in the last 60 seconds
  const windowStart = new Date(Date.now() - 60 * 1000).toISOString();
  const { count } = await supabase
    .from('usage_logs')
    .select('*', { count: 'exact', head: true })
    .eq('api_key_id', keyRow.id)
    .gte('created_at', windowStart);

  if ((count ?? 0) >= RATE_LIMIT_PER_MINUTE) {
    return errorResponse('Rate limit exceeded. Maximum 60 requests per minute.', 'RATE_LIMITED');
  }

  const start = Date.now();

  // 6. Format check — bail early if invalid, no DNS call needed
  const formatResult = validateFormat(email);

  if (!formatResult.passed) {
    const duration_ms = Date.now() - start;
    const domain = email.includes('@') ? email.split('@')[1] : '';

    await Promise.all([
      supabase.from('usage_logs').insert({
        api_key_id: keyRow.id,
        user_id: keyRow.user_id,
        email_domain: domain,
        result: 'invalid',
        format_check: false,
        mx_check: false,
        duration_ms,
      }),
      supabase.from('api_keys').update({ last_used_at: new Date().toISOString() }).eq('id', keyRow.id),
    ]);

    const body: ApiSuccess<ValidationResult> = {
      success: true,
      data: {
        valid: false,
        email,
        domain,
        checks: { format: false, mx: false },
        mx_records: [],
        reason: formatResult.reason,
      },
    };
    return NextResponse.json(body);
  }

  // 7. Extract domain and run MX check
  const domain = email.split('@')[1];
  const mxResult = await validateMx(domain);
  const duration_ms = Date.now() - start;
  const valid = mxResult.passed;

  // 8 & 9. Log the call and update last_used_at in parallel
  await Promise.all([
    supabase.from('usage_logs').insert({
      api_key_id: keyRow.id,
      user_id: keyRow.user_id,
      email_domain: domain,
      result: valid ? 'valid' : 'invalid',
      format_check: true,
      mx_check: valid,
      duration_ms,
    }),
    supabase.from('api_keys').update({ last_used_at: new Date().toISOString() }).eq('id', keyRow.id),
  ]);

  // 10. Return result
  const body: ApiSuccess<ValidationResult> = {
    success: true,
    data: {
      valid,
      email,
      domain,
      checks: { format: true, mx: valid },
      mx_records: mxResult.records,
      reason: valid ? undefined : mxResult.reason,
    },
  };
  return NextResponse.json(body);
});
