'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateProfile } from '@/services/auth.service';
import { useAuth } from '@/hooks/useAuth';

const ProfileSchema = z.object({
  fullName: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
});

type ProfileFields = z.infer<typeof ProfileSchema>;

export function ProfileForm(): React.JSX.Element {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ProfileFields>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: { fullName: '' },
  });

  useEffect(() => {
    if (user) {
      reset({ fullName: (user.user_metadata?.full_name as string | undefined) ?? '' });
    }
  }, [user, reset]);

  async function onSubmit(data: ProfileFields): Promise<void> {
    setLoading(true);
    setSuccess(false);
    try {
      await updateProfile(data.fullName);
      setSuccess(true);
    } catch (err) {
      setError('root', {
        message: err instanceof Error ? err.message : 'Failed to update profile',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm space-y-4">
      <div className="space-y-1.5">
        <Label
          htmlFor="full-name"
          className="text-xs font-semibold uppercase tracking-widest text-[#8A8278]"
        >
          Display name
        </Label>
        <Input
          id="full-name"
          type="text"
          autoComplete="name"
          className="rounded-sm border-[#D9D3C5] focus-visible:border-[#1A7A78] focus-visible:ring-2 focus-visible:ring-[#1A7A78]/20"
          {...register('fullName')}
        />
        {errors.fullName && (
          <p className="text-xs text-[#B83232]">{errors.fullName.message}</p>
        )}
      </div>

      {errors.root && (
        <p className="text-sm text-[#B83232]">{errors.root.message}</p>
      )}
      {success && (
        <p className="text-sm text-[#7A9638]">Profile updated.</p>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="bg-[#1A7A78] hover:bg-[#155E5C] text-white rounded-sm disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          'Save changes'
        )}
      </Button>
    </form>
  );
}
