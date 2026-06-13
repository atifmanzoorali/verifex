'use client';

import { useState, useEffect, useCallback } from 'react';
import { listKeys, createKey, revokeKey } from '@/services/keys.service';
import type { ApiKey, CreateApiKeyResponse } from '@/types/key.types';

type UseApiKeysReturn = {
  keys: ApiKey[];
  loading: boolean;
  error: string | null;
  createKey: (name: string) => Promise<CreateApiKeyResponse>;
  revokeKey: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
};

export function useApiKeys(): UseApiKeysReturn {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const data = await listKeys();
      setKeys(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load keys');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const handleCreate = useCallback(async (name: string): Promise<CreateApiKeyResponse> => {
    const result = await createKey(name);
    await refresh();
    return result;
  }, [refresh]);

  const handleRevoke = useCallback(async (id: string): Promise<void> => {
    await revokeKey(id);
    await refresh();
  }, [refresh]);

  return { keys, loading, error, createKey: handleCreate, revokeKey: handleRevoke, refresh };
}
