import React from 'react';
import Link from 'next/link';
import { getDocsData, ERROR_CODES } from '@/lib/docs-data';
import { DocsLayout } from '@/components/docs/DocsLayout';

export default async function DocsPage(): Promise<React.JSX.Element> {
  const sections = await getDocsData();

  return (
    <div className="min-h-screen bg-[#F0ECE3]">
      {/* Top navigation bar */}
      <header className="sticky top-0 z-10 border-b border-[#D9D3C5] bg-[#F0ECE3]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-8 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-[#555047] hover:text-[#111111] transition-colors"
          >
            <span aria-hidden>←</span>
            <span>Verifex</span>
          </Link>
          <div className="flex items-center gap-1">
            <div className="h-5 w-5 rounded-sm bg-[#1A7A78] flex items-center justify-center">
              <span className="text-[10px] font-black text-white leading-none">VFX</span>
            </div>
            <span className="text-sm font-semibold text-[#111111]">API Reference</span>
          </div>
          <Link
            href="/register"
            className="rounded-sm bg-[#1A7A78] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#155E5C] transition-colors"
          >
            Get started free
          </Link>
        </div>
      </header>

      {/* Page content */}
      <div className="mx-auto max-w-5xl px-8 py-10">
        <div className="mb-10">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#8A8278]">
            Verifex
          </p>
          <h1 className="text-4xl font-black tracking-tight text-[#111111]">API Reference</h1>
          <p className="mt-2 text-sm text-[#555047]">
            Everything you need to start validating emails in under 2 minutes.
          </p>
        </div>

        <DocsLayout sections={sections} errorCodes={ERROR_CODES} />
      </div>
    </div>
  );
}
