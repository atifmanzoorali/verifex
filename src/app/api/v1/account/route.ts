import { NextResponse, type NextRequest } from 'next/server';
import { errorResponse, withErrorHandler } from '@/lib/errors';

export const DELETE = withErrorHandler(async (_request: NextRequest): Promise<NextResponse> => {
  // Built in Step 10
  return errorResponse('Not implemented', 'NOT_FOUND');
});
