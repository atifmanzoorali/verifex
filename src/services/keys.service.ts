import type { ApiKey, CreateApiKeyResponse } from '@/types/key.types';
import { API_BASE_PATH } from '@/lib/constants';

export async function listKeys(): Promise<ApiKey[]> {
  const res = await fetch(`${API_BASE_PATH}/keys`);
  const json = await res.json();
  if (!json.success) throw new Error(json.error.message);
  return json.data;
}

export async function createKey(name: string): Promise<CreateApiKeyResponse> {
  const res = await fetch(`${API_BASE_PATH}/keys`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error.message);
  return json.data;
}

export async function revokeKey(id: string): Promise<void> {
  const res = await fetch(`${API_BASE_PATH}/keys`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error.message);
}
