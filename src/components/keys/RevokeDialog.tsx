'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type Props = {
  open: boolean;
  keyName: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
};

export function RevokeDialog({ open, keyName, onConfirm, onCancel, loading = false }: Props): React.JSX.Element {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onCancel(); }}>
      <DialogContent className="bg-white border border-[#D9D3C5] rounded shadow-md max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-[#111111]">
            Revoke API key
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-[#555047]">
          Are you sure you want to revoke{' '}
          <strong className="text-[#111111]">{keyName}</strong>? Any application
          using this key will immediately lose access. This cannot be undone.
        </p>
        <div className="flex gap-2 mt-2">
          <Button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-[#B83232] hover:bg-[#8A2020] text-white rounded-sm disabled:opacity-50"
          >
            {loading ? 'Revoking...' : 'Revoke key'}
          </Button>
          <Button
            onClick={onCancel}
            variant="outline"
            className="flex-1 border-[#D9D3C5] text-[#555047] rounded-sm"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
