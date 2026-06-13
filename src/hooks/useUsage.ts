'use client';

import { useState, useEffect, useCallback } from 'react';
import { getUsage } from '@/services/usage.service';
import type { UsageResponse } from '@/services/usage.service';
import { USAGE_DEFAULT_LIMIT } from '@/lib/constants';

type UseUsageReturn = {
  summary: UsageResponse['summary'] | null;
  logs: UsageResponse['logs'];
  total: number;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

export function useUsage(limit = USAGE_DEFAULT_LIMIT, offset = 0): UseUsageReturn {
  const [data, setData] = useState<UsageResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const result = await getUsage(limit, offset);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load usage');
    } finally {
      setLoading(false);
    }
  }, [limit, offset]);

  useEffect(() => { refresh(); }, [refresh]);

  return {
    summary: data?.summary ?? null,
    logs: data?.logs ?? [],
    total: data?.total ?? 0,
    loading,
    error,
    refresh,
  };
}
