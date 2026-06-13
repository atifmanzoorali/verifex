export type ApiKey = {
  id: string;
  name: string;
  key_prefix: string;
  is_active: boolean;
  created_at: string;
  last_used_at: string | null;
};

export type CreateApiKeyRequest = {
  name: string;
};

export type CreateApiKeyResponse = ApiKey & {
  key: string;
};

export type RevokeApiKeyRequest = {
  id: string;
};
