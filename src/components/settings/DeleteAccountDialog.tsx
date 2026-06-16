'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signOut } from '@/services/auth.service';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CONFIRM_TEXT = 'delete my account';

export function DeleteAccountDialog({ open, onOpenChange }: Props): React.JSX.Element {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const confirmed = value === CONFIRM_TEXT;

  const handleClose = (): void => {
    if (loading) return;
    setValue('');
    setError(null);
    onOpenChange(false);
  };

  const handleDelete = async (): Promise<void> => {
    if (!confirmed) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/v1/account', { method: 'DELETE' });
      if (!res.ok) {
        const json = await res.json() as { error?: { message?: string } };
        throw new Error(json.error?.message ?? 'Failed to delete account');
      }
      try { await signOut(); } catch { /* user is already deleted — ignore */ }
      router.push('/');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-white border border-[#D9D3C5] rounded shadow-md max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-[#111111]">
            Delete account
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-[#555047]">
            This will permanently delete your account, all API keys, and all usage history.
            This action cannot be undone.
          </p>

          <div className="space-y-1.5">
            <Label
              htmlFor="confirm-delete"
              className="text-xs font-semibold uppercase tracking-widest text-[#8A8278]"
            >
              Type{' '}
              <span className="font-mono normal-case tracking-normal text-[#555047]">
                {CONFIRM_TEXT}
              </span>{' '}
              to confirm
            </Label>
            <Input
              id="confirm-delete"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={CONFIRM_TEXT}
              disabled={loading}
              autoComplete="off"
              className="rounded-sm border-[#D9D3C5] focus-visible:border-[#B83232] focus-visible:ring-2 focus-visible:ring-[#B83232]/20"
            />
          </div>

          {error && <p className="text-sm text-[#B83232]">{error}</p>}

          <div className="flex gap-2">
            <Button
              onClick={handleDelete}
              disabled={!confirmed || loading}
              className="flex-1 bg-[#B83232] hover:bg-[#8A2020] text-white rounded-sm disabled:opacity-40"
            >
              {loading ? 'Deleting...' : 'Delete account'}
            </Button>
            <Button
              onClick={handleClose}
              disabled={loading}
              variant="outline"
              className="flex-1 border-[#D9D3C5] text-[#555047] rounded-sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
