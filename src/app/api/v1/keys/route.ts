import { NextResponse, type NextRequest } from 'next/server';
import { createHash, randomBytes } from 'crypto';
import { z } from 'zod';
import { errorResponse, withErrorHandler } from '@/lib/errors';
import { createClient } from '@/lib/supabase/server';
import {
  API_KEY_PREFIX,
  API_KEY_RANDOM_BYTES,
  MAX_API_KEYS_PER_USER,
} from '@/lib/constants';
import type { ApiSuccess } from '@/types/api.types';
import type { ApiKey, CreateApiKeyResponse } from '@/types/key.types';

const CreateKeySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
});

const RevokeKeySchema = z.object({
  id: z.string().uuid('Invalid key ID'),
});

export const GET = withErrorHandler(async (_request: NextRequest): Promise<NextResponse> => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return errorResponse('Unauthorized', 'UNAUTHORIZED');

  const { data, error } = await supabase
    .from('api_keys')
    .select('id, name, key_prefix, is_active, created_at, last_used_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;

  const body: ApiSuccess<ApiKey[]> = { success: true, data: data ?? [] };
  return NextResponse.json(body);
});

export const POST = withErrorHandler(async (request: NextRequest): Promise<NextResponse> => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return errorResponse('Unauthorized', 'UNAUTHORIZED');

  const json = await request.json();
  const parsed = CreateKeySchema.safeParse(json);
  if (!parsed.success) {
    return errorResponse(parsed.error.errors[0]?.message ?? 'Validation failed', 'VALIDATION_ERROR');
  }

  const { count, error: countError } = await supabase
    .from('api_keys')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('is_active', true);

  if (countError) throw countError;

  if ((count ?? 0) >= MAX_API_KEYS_PER_USER) {
    return errorResponse(
      `You have reached the maximum of ${MAX_API_KEYS_PER_USER} active keys`,
      'CONFLICT'
    );
  }

  const rawKey = API_KEY_PREFIX + randomBytes(API_KEY_RANDOM_BYTES).toString('hex');
  const keyHash = createHash('sha256').update(rawKey).digest('hex');
  const keyPrefix = rawKey.slice(0, 12);

  const { data, error } = await supabase
    .from('api_keys')
    .insert({
      user_id: user.id,
      name: parsed.data.name,
      key_hash: keyHash,
      key_prefix: keyPrefix,
    })
    .select('id, name, key_prefix, is_active, created_at, last_used_at')
    .single();

  if (error) throw error;

  const body: ApiSuccess<CreateApiKeyResponse> = {
    success: true,
    data: { ...data, key: rawKey },
  };
  return NextResponse.json(body, { status: 201 });
});

export const DELETE = withErrorHandler(async (request: NextRequest): Promise<NextResponse> => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return errorResponse('Unauthorized', 'UNAUTHORIZED');

  const json = await request.json();
  const parsed = RevokeKeySchema.safeParse(json);
  if (!parsed.success) {
    return errorResponse(parsed.error.errors[0]?.message ?? 'Validation failed', 'VALIDATION_ERROR');
  }

  const { data: existing } = await supabase
    .from('api_keys')
    .select('id')
    .eq('id', parsed.data.id)
    .eq('user_id', user.id)
    .single();

  if (!existing) return errorResponse('Key not found', 'NOT_FOUND');

  const { error } = await supabase
    .from('api_keys')
    .update({ is_active: false })
    .eq('id', parsed.data.id);

  if (error) throw error;

  const body: ApiSuccess<null> = { success: true, data: null };
  return NextResponse.json(body);
});
