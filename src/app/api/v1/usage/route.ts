import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { errorResponse, withErrorHandler } from '@/lib/errors';
import { createClient } from '@/lib/supabase/server';
import { USAGE_DEFAULT_LIMIT, USAGE_MAX_LIMIT } from '@/lib/constants';
import type { ApiSuccess } from '@/types/api.types';
import type { UsageResponse } from '@/services/usage.service';

const QuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(USAGE_MAX_LIMIT).default(USAGE_DEFAULT_LIMIT),
  offset: z.coerce.number().int().min(0).default(0),
});

export const GET = withErrorHandler(async (request: NextRequest): Promise<NextResponse> => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return errorResponse('Unauthorized', 'UNAUTHORIZED');

  const { searchParams } = new URL(request.url);
  const parsed = QuerySchema.safeParse({
    limit: searchParams.get('limit') ?? undefined,
    offset: searchParams.get('offset') ?? undefined,
  });
  if (!parsed.success) return errorResponse('Invalid query parameters', 'VALIDATION_ERROR');
  const { limit, offset } = parsed.data;

  // Summary counts from ALL logs — must not be limited to the current page
  const { data: allLogs, error: summaryError } = await supabase
    .from('usage_logs')
    .select('result')
    .eq('user_id', user.id);

  if (summaryError) throw summaryError;

  const total = allLogs?.length ?? 0;
  const valid = allLogs?.filter((l) => l.result === 'valid').length ?? 0;
  const invalid = total - valid;

  // Paginated rows for the activity table
  const { data: logs, error: logsError } = await supabase
    .from('usage_logs')
    .select('id, email_domain, result, duration_ms, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (logsError) throw logsError;

  const body: ApiSuccess<UsageResponse> = {
    success: true,
    data: {
      summary: { total, valid, invalid },
      logs: logs ?? [],
      total,
    },
  };
  return NextResponse.json(body);
});
