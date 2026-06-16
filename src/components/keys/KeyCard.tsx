'use client';

import React from 'react';
import { formatDate } from '@/lib/utils';
import type { ApiKey } from '@/types/key.types';

type Props = {
  apiKey: ApiKey;
  onRevoke: (id: string) => void;
};

export function KeyCard({ apiKey, onRevoke }: Props): React.JSX.Element {
  const lastUsed = apiKey.last_used_at ? `Last used ${formatDate(apiKey.last_used_at)}` : 'Never used';
  const created = formatDate(apiKey.created_at);

  return (
    <div className={`flex overflow-hidden rounded-sm bg-white shadow-sm transition-opacity ${!apiKey.is_active ? 'opacity-40' : ''}`}>
      {/* Left accent — teal for active, muted for revoked */}
      <div className={`w-[3px] shrink-0 ${apiKey.is_active ? 'bg-primary' : 'bg-[#D9D3C5]'}`} />

      <div className="flex flex-1 items-center justify-between gap-6 border border-l-0 border-[#D9D3C5] rounded-r-sm px-5 py-4">
        <div className="min-w-0 flex-1">
          {/* Name + badge */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8A8278]">
              {apiKey.name}
            </span>
            {apiKey.is_active ? (
              <span className="inline-flex items-center gap-1 rounded-sm border border-[#B8D49A] bg-[#EEF5E8] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#3A6A1A]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3A6A1A]" />
                Active
              </span>
            ) : (
              <span className="inline-flex items-center rounded-sm border border-[#E8B4B0] bg-[#FBF0EE] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#8A2020]">
                Revoked
              </span>
            )}
          </div>

          {/* Prefix — the visual anchor */}
          <p className="mb-2.5 font-mono text-[15px] font-semibold tracking-tight text-[#111111]">
            {apiKey.key_prefix}
            <span className="text-[#C4BDB2] select-none">••••••••••••••••••••••••</span>
          </p>

          {/* Metadata */}
          <p className="text-xs text-[#8A8278]">
            Created {created}
            <span className="mx-2 text-[#D9D3C5]">·</span>
            {lastUsed}
          </p>
        </div>

        {/* Revoke button — only for active keys */}
        {apiKey.is_active && (
          <button
            onClick={() => onRevoke(apiKey.id)}
            className="shrink-0 rounded-sm border border-[#D9D3C5] px-3 py-1.5 text-xs font-medium text-[#8A8278] transition-colors hover:border-[#E8B4B0] hover:bg-[#FBF0EE] hover:text-[#B83232]"
          >
            Revoke
          </button>
        )}
      </div>
    </div>
  );
}
