'use client';

import React, { useState } from 'react';
import { Key } from 'lucide-react';
import { useApiKeys } from '@/hooks/useApiKeys';
import { KeyCard } from '@/components/keys/KeyCard';
import { CreateKeyModal } from '@/components/keys/CreateKeyModal';
import { RevokeDialog } from '@/components/keys/RevokeDialog';
import { Button } from '@/components/ui/button';
import { MAX_API_KEYS_PER_USER } from '@/lib/constants';

export default function KeysPage(): React.JSX.Element {
  const { keys, loading, error, createKey, revokeKey } = useApiKeys();
  const [createOpen, setCreateOpen] = useState(false);
  const [revokeTarget, setRevokeTarget] = useState<{ id: string; name: string } | null>(null);
  const [revoking, setRevoking] = useState(false);

  const activeCount = keys.filter((k) => k.is_active).length;

  const handleCreate = async (name: string): Promise<string> => {
    const result = await createKey(name);
    return result.key;
  };

  const handleRevoke = async (): Promise<void> => {
    if (!revokeTarget) return;
    setRevoking(true);
    try {
      await revokeKey(revokeTarget.id);
      setRevokeTarget(null);
    } finally {
      setRevoking(false);
    }
  };

  return (
    <div className="w-full">
      {/* Page header */}
      <div className="flex items-end justify-between border-b border-[#D9D3C5] pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#111111]">API Keys</h1>
          <p className="mt-1.5 text-sm text-[#555047]">
            Keys are shown once at creation. Store them somewhere safe.
          </p>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          {!loading && (
            <span className="text-xs font-semibold tabular-nums text-[#8A8278]">
              {activeCount} <span className="font-normal">of</span> {MAX_API_KEYS_PER_USER} active
            </span>
          )}
          <Button
            onClick={() => setCreateOpen(true)}
            disabled={activeCount >= MAX_API_KEYS_PER_USER}
            className="bg-[#1A7A78] hover:bg-[#155E5C] text-white rounded-sm disabled:opacity-40"
          >
            Create API key
          </Button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-sm text-[#8A8278]">Loading keys...</p>
      )}

      {/* Error */}
      {!loading && error && (
        <p className="text-sm text-[#B83232]">{error}</p>
      )}

      {/* Empty state */}
      {!loading && !error && keys.length === 0 && (
        <div className="border border-dashed border-[#D9D3C5] rounded-sm py-16 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-sm bg-[#EAF3F3]">
            <Key className="h-6 w-6 text-primary" />
          </div>
          <p className="text-base font-semibold text-[#111111]">No API keys yet</p>
          <p className="mt-1.5 text-sm text-[#555047]">
            Create a key to start validating emails via the API.
          </p>
          <Button
            onClick={() => setCreateOpen(true)}
            className="mt-6 bg-[#1A7A78] hover:bg-[#155E5C] text-white rounded-sm"
          >
            Create your first key
          </Button>
        </div>
      )}

      {/* Key list */}
      {!loading && keys.length > 0 && (
        <div className="space-y-3">
          {keys.map((apiKey) => (
            <KeyCard
              key={apiKey.id}
              apiKey={apiKey}
              onRevoke={(id) => setRevokeTarget({ id, name: apiKey.name })}
            />
          ))}
        </div>
      )}

      <CreateKeyModal
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreate={handleCreate}
      />

      <RevokeDialog
        open={!!revokeTarget}
        keyName={revokeTarget?.name ?? ''}
        onConfirm={handleRevoke}
        onCancel={() => setRevokeTarget(null)}
        loading={revoking}
      />
    </div>
  );
}
