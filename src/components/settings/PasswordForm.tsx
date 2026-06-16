'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updatePassword } from '@/services/auth.service';
import { useAuth } from '@/hooks/useAuth';

const PasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type PasswordFields = z.infer<typeof PasswordSchema>;

export function PasswordForm(): React.JSX.Element {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<PasswordFields>({ resolver: zodResolver(PasswordSchema) });

  async function onSubmit(data: PasswordFields): Promise<void> {
    if (!user?.email) return;
    setLoading(true);
    setSuccess(false);
    try {
      await updatePassword(user.email, data.currentPassword, data.newPassword);
      setSuccess(true);
      reset();
    } catch (err) {
      setError('root', {
        message: err instanceof Error ? err.message : 'Failed to update password',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm space-y-4">
      <div className="space-y-1.5">
        <Label
          htmlFor="current-password"
          className="text-xs font-semibold uppercase tracking-widest text-[#8A8278]"
        >
          Current password
        </Label>
        <Input
          id="current-password"
          type="password"
          autoComplete="current-password"
          className="rounded-sm border-[#D9D3C5] focus-visible:border-[#1A7A78] focus-visible:ring-2 focus-visible:ring-[#1A7A78]/20"
          {...register('currentPassword')}
        />
        {errors.currentPassword && (
          <p className="text-xs text-[#B83232]">{errors.currentPassword.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label
          htmlFor="new-password"
          className="text-xs font-semibold uppercase tracking-widest text-[#8A8278]"
        >
          New password
        </Label>
        <Input
          id="new-password"
          type="password"
          autoComplete="new-password"
          className="rounded-sm border-[#D9D3C5] focus-visible:border-[#1A7A78] focus-visible:ring-2 focus-visible:ring-[#1A7A78]/20"
          {...register('newPassword')}
        />
        {errors.newPassword && (
          <p className="text-xs text-[#B83232]">{errors.newPassword.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label
          htmlFor="confirm-password"
          className="text-xs font-semibold uppercase tracking-widest text-[#8A8278]"
        >
          Confirm new password
        </Label>
        <Input
          id="confirm-password"
          type="password"
          autoComplete="new-password"
          className="rounded-sm border-[#D9D3C5] focus-visible:border-[#1A7A78] focus-visible:ring-2 focus-visible:ring-[#1A7A78]/20"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p className="text-xs text-[#B83232]">{errors.confirmPassword.message}</p>
        )}
      </div>

      {errors.root && (
        <p className="text-sm text-[#B83232]">{errors.root.message}</p>
      )}
      {success && (
        <p className="text-sm text-[#7A9638]">Password updated.</p>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="bg-[#1A7A78] hover:bg-[#155E5C] text-white rounded-sm disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Updating...
          </>
        ) : (
          'Update password'
        )}
      </Button>
    </form>
  );
}
