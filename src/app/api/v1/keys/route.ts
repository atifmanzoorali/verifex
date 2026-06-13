import { NextResponse, type NextRequest } from 'next/server';
import { errorResponse, withErrorHandler } from '@/lib/errors';

export const GET = withErrorHandler(async (_request: NextRequest): Promise<NextResponse> => {
  // Built in Step 5
  return errorResponse('Not implemented', 'NOT_FOUND');
});

export const POST = withErrorHandler(async (_request: NextRequest): Promise<NextResponse> => {
  // Built in Step 5
  return errorResponse('Not implemented', 'NOT_FOUND');
});

export const DELETE = withErrorHandler(async (_request: NextRequest): Promise<NextResponse> => {
  // Built in Step 5
  return errorResponse('Not implemented', 'NOT_FOUND');
});
