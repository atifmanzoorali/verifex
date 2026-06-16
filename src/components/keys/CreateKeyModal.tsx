'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (name: string) => Promise<string>;
};

export function CreateKeyModal({ open, onOpenChange, onCreate }: Props): React.JSX.Element {
  const [name, setName] = useState('');
  const [rawKey, setRawKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const key = await onCreate(name.trim());
      setRawKey(key);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create key');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (): Promise<void> => {
    if (!rawKey) return;
    await navigator.clipboard.writeText(rawKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = (): void => {
    setName('');
    setRawKey(null);
    setError(null);
    setCopied(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-white border border-[#D9D3C5] rounded shadow-md max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-[#111111]">
            {rawKey ? 'Copy your API key' : 'Create API key'}
          </DialogTitle>
        </DialogHeader>

        {rawKey ? (
          <div className="space-y-4">
            <p className="text-sm text-[#555047]">
              This key will only be shown once. Copy it now and store it somewhere safe — you cannot view it again.
            </p>
            <div className="bg-[#F7F4EE] border border-[#D9D3C5] rounded-sm p-3 font-mono text-sm text-[#111111] break-all select-all">
              {rawKey}
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleCopy}
                className="flex-1 bg-[#1A7A78] hover:bg-[#155E5C] text-white rounded-sm"
              >
                {copied ? 'Copied!' : 'Copy key'}
              </Button>
              <Button
                onClick={handleClose}
                variant="outline"
                className="flex-1 border-[#D9D3C5] text-[#555047] rounded-sm"
              >
                Done
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="key-name"
                className="text-xs font-semibold uppercase tracking-widest text-[#8A8278]"
              >
                Key name
              </Label>
              <Input
                id="key-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Production, Testing"
                className="border-[#D9D3C5] focus:border-[#1A7A78] focus:ring-2 focus:ring-[#1A7A78]/20 rounded-sm"
                maxLength={100}
                autoFocus
              />
            </div>
            {error && <p className="text-sm text-[#B83232]">{error}</p>}
            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={!name.trim() || loading}
                className="flex-1 bg-[#1A7A78] hover:bg-[#155E5C] text-white rounded-sm disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create key'}
              </Button>
              <Button
                type="button"
                onClick={handleClose}
                variant="outline"
                className="flex-1 border-[#D9D3C5] text-[#555047] rounded-sm"
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
