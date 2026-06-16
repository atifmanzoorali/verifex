import { createClient } from '@/lib/supabase/client';

export async function signUp(email: string, password: string, fullName: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });
  if (error) throw error;
}

export async function signIn(email: string, password: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

export async function signOut(): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function resetPassword(email: string): Promise<void> {
  const supabase = createClient();
  const redirectTo = `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/dashboard/settings`;
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
  if (error) throw error;
}

export async function updateProfile(fullName: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({ data: { full_name: fullName } });
  if (error) throw error;
}

export async function updatePassword(
  email: string,
  currentPassword: string,
  newPassword: string
): Promise<void> {
  const supabase = createClient();
  const { error: authError } = await supabase.auth.signInWithPassword({ email, password: currentPassword });
  if (authError) throw new Error('Current password is incorrect');
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) throw error;
}
