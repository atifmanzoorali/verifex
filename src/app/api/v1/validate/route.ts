import { NextResponse, type NextRequest } from 'next/server';
import { errorResponse, withErrorHandler } from '@/lib/errors';

// Rate limiting: when building this route in Step 7, query usage_logs to count
// requests by api_key_id in the last 60 seconds. Return RATE_LIMITED if over limit.
// Vercel also provides automatic DDoS protection at the infrastructure level.
export const POST = withErrorHandler(async (_request: NextRequest): Promise<NextResponse> => {
  // Built in Step 7 — email validation endpoint
  return errorResponse('Not implemented', 'NOT_FOUND');
});
