import type { ApiError } from '@/types/api.types';
import { NextResponse, type NextRequest } from 'next/server';

export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'RATE_LIMITED'
  | 'INTERNAL_ERROR';

const STATUS_MAP: Record<ErrorCode, number> = {
  VALIDATION_ERROR: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  RATE_LIMITED: 429,
  INTERNAL_ERROR: 500,
};

export function errorResponse(message: string, code: ErrorCode): NextResponse {
  const body: { success: false; error: ApiError } = {
    success: false,
    error: { message, code },
  };
  return NextResponse.json(body, { status: STATUS_MAP[code] });
}

type RouteHandler = (request: NextRequest) => Promise<NextResponse>;

export function withErrorHandler(handler: RouteHandler): RouteHandler {
  return async (request: NextRequest): Promise<NextResponse> => {
    try {
      return await handler(request);
    } catch (err) {
      console.error('[API Error]', request.method, request.nextUrl.pathname, err);
      return errorResponse('Something went wrong', 'INTERNAL_ERROR');
    }
  };
}
