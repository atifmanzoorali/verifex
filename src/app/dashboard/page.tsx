'use client';

import React from 'react';
import { useUsage } from '@/hooks/useUsage';
import { StatCard } from '@/components/usage/StatCard';
import { ActivityTable } from '@/components/usage/ActivityTable';

export default function DashboardPage(): React.JSX.Element {
  const { summary, logs, loading, error } = useUsage();

  return (
    <div className="w-full">
      {/* Page header */}
      <div className="border-b border-[#D9D3C5] pb-6 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-[#111111]">Overview</h1>
        <p className="mt-1.5 text-sm text-[#555047]">
          Your validation activity at a glance.
        </p>
      </div>

      {error && (
        <p className="mb-6 text-sm text-[#B83232]">{error}</p>
      )}

      {/* Stat cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Total validations"
          value={summary?.total ?? 0}
          accent="teal"
          loading={loading}
        />
        <StatCard
          label="Valid"
          value={summary?.valid ?? 0}
          accent="green"
          loading={loading}
        />
        <StatCard
          label="Invalid"
          value={summary?.invalid ?? 0}
          accent="red"
          loading={loading}
        />
      </div>

      {/* Activity table */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-[#111111]">Recent activity</h2>
        {loading ? (
          <p className="text-sm text-[#8A8278]">Loading activity...</p>
        ) : (
          <ActivityTable logs={logs} />
        )}
      </div>
    </div>
  );
}
