'use client';

import React from 'react';

type Props = {
  label: string;
  value: number;
  accent?: 'teal' | 'green' | 'red';
  loading?: boolean;
};

const ACCENT_CLASSES: Record<NonNullable<Props['accent']>, string> = {
  teal: 'bg-primary',
  green: 'bg-[#7A9638]',
  red: 'bg-[#B83232]',
};

export function StatCard({ label, value, accent = 'teal', loading = false }: Props): React.JSX.Element {
  return (
    <div className="flex overflow-hidden rounded-sm bg-white shadow-sm">
      <div className={`w-[3px] shrink-0 ${ACCENT_CLASSES[accent]}`} />
      <div className="flex-1 border border-l-0 border-[#D9D3C5] rounded-r-sm px-5 py-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#8A8278] mb-3">
          {label}
        </p>
        {loading ? (
          <div className="h-10 w-24 animate-pulse rounded-sm bg-[#F7F4EE]" />
        ) : (
          <p className="text-4xl font-bold tabular-nums text-[#111111]">
            {value.toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
}
