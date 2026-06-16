import React from 'react';
import Link from 'next/link';
import { getDocsData, ERROR_CODES } from '@/lib/docs-data';
import { DocsLayout } from '@/components/docs/DocsLayout';
import { createClient } from '@/lib/supabase/server';

export default async function DashboardDocsPage(): Promise<React.JSX.Element> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let keyPrefix: string | undefined;
  if (user) {
    const { data: keys } = await supabase
      .from('api_keys')
      .select('key_prefix')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .order('created_at', { ascending: true })
      .limit(1);
    keyPrefix = keys?.[0]?.key_prefix ?? undefined;
  }

  const sections = await getDocsData(keyPrefix);

  return (
    <div className="w-full">
      {/* Page header */}
      <div className="border-b border-[#D9D3C5] pb-6 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-[#111111]">API Reference</h1>
        {keyPrefix ? (
          <p className="mt-1.5 text-sm text-[#555047]">
            Examples use your key prefix:{' '}
            <code className="font-mono text-xs text-[#1A7A78]">{keyPrefix}</code>
          </p>
        ) : (
          <p className="mt-1.5 text-sm text-[#555047]">
            <Link href="/dashboard/keys" className="text-[#1A7A78] hover:underline underline-offset-2">
              Create an API key
            </Link>{' '}
            to see your prefix in the examples below.
          </p>
        )}
      </div>

      <DocsLayout sections={sections} errorCodes={ERROR_CODES} />
    </div>
  );
}
