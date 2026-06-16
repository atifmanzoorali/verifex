'use client';

import React from 'react';
import { formatDate, formatDuration } from '@/lib/utils';
import type { UsageLog } from '@/services/usage.service';

type Props = {
  logs: UsageLog[];
};

export function ActivityTable({ logs }: Props): React.JSX.Element {
  if (logs.length === 0) {
    return (
      <div className="rounded-sm border border-dashed border-[#D9D3C5] py-12 text-center">
        <p className="text-sm font-medium text-[#555047]">No activity yet</p>
        <p className="mt-1 text-xs text-[#8A8278]">
          Calls to the validation endpoint will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-sm border border-[#D9D3C5] bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#D9D3C5] bg-[#F7F4EE]">
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-widest text-[#8A8278]">
              Domain
            </th>
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-widest text-[#8A8278]">
              Result
            </th>
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-widest text-[#8A8278]">
              Duration
            </th>
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-widest text-[#8A8278]">
              Time
            </th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, i) => (
            <tr
              key={log.id}
              className={`border-b border-[#D9D3C5] last:border-0 ${i % 2 === 1 ? 'bg-[#F7F4EE]' : 'bg-white'}`}
            >
              <td className="px-5 py-3 font-mono text-xs text-[#111111]">
                {log.email_domain}
              </td>
              <td className="px-5 py-3">
                {log.result === 'valid' ? (
                  <span className="inline-flex items-center gap-1 rounded-sm border border-[#B8D49A] bg-[#EEF5E8] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#3A6A1A]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3A6A1A]" />
                    Valid
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-sm border border-[#E8B4B0] bg-[#FBF0EE] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#8A2020]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#8A2020]" />
                    Invalid
                  </span>
                )}
              </td>
              <td className="px-5 py-3 font-mono text-xs text-[#555047]">
                {formatDuration(log.duration_ms)}
              </td>
              <td className="px-5 py-3 text-xs text-[#8A8278]">
                {formatDate(log.created_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
