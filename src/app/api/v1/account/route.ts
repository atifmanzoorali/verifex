import { NextResponse, type NextRequest } from 'next/server';
import { errorResponse, withErrorHandler } from '@/lib/errors';
import { createClient } from '@/lib/supabase/server';
import { getServiceClient } from '@/lib/supabase/service';

export const DELETE = withErrorHandler(async (_request: NextRequest): Promise<NextResponse> => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return errorResponse('Unauthorized', 'UNAUTHORIZED');

  const service = getServiceClient();

  const { error: logsError } = await service
    .from('usage_logs')
    .delete()
    .eq('user_id', user.id);
  if (logsError) throw logsError;

  const { error: keysError } = await service
    .from('api_keys')
    .delete()
    .eq('user_id', user.id);
  if (keysError) throw keysError;

  const { error: profileError } = await service
    .from('profiles')
    .delete()
    .eq('id', user.id);
  if (profileError) throw profileError;

  const { error: userError } = await service.auth.admin.deleteUser(user.id);
  if (userError) throw userError;

  return NextResponse.json({ success: true, data: null });
});
