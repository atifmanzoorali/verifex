import React from 'react';
import type { DocsSection, DocsErrorCode } from '@/lib/docs-data';
import { EndpointCard } from './EndpointCard';

type Props = {
  sections: DocsSection[];
  errorCodes: DocsErrorCode[];
  baseUrl: string;
};

const STATUS_STYLES: Record<number, string> = {
  400: 'text-[#C9B827]',
  401: 'text-[#B83232]',
  403: 'text-[#B83232]',
  404: 'text-[#555047]',
  409: 'text-[#C9B827]',
  429: 'text-[#B83232]',
  500: 'text-[#B83232]',
};

function SidebarNav({ sections }: { sections: DocsSection[] }): React.JSX.Element {
  return (
    <nav className="space-y-0.5">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#8A8278]">
        Endpoints
      </p>
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="block rounded-sm px-2 py-1.5 text-sm text-[#555047] hover:bg-[#EAF3F3] hover:text-[#1A7A78] transition-colors"
        >
          {s.title}
        </a>
      ))}
      <a
        href="#errors"
        className="block rounded-sm px-2 py-1.5 text-sm text-[#555047] hover:bg-[#EAF3F3] hover:text-[#1A7A78] transition-colors"
      >
        Error Codes
      </a>
    </nav>
  );
}

function BaseUrl({ appUrl }: { appUrl: string }): React.JSX.Element {
  return (
    <div className="mb-4 rounded-sm border border-[#D9D3C5] bg-white px-4 py-3">
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#8A8278]">Base URL</p>
      <code className="font-mono text-sm text-[#1A7A78]">{appUrl}/api/v1</code>
    </div>
  );
}

function ResponseEnvelope(): React.JSX.Element {
  return (
    <div className="rounded-sm border border-[#D9D3C5] bg-white px-4 py-3">
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#8A8278]">
        Response envelope
      </p>
      <p className="text-sm text-[#555047]">
        Every response is wrapped in{' '}
        <code className="font-mono text-xs text-[#1A7A78]">{'{ "success": true, "data": ... }'}</code>{' '}
        on success, or{' '}
        <code className="font-mono text-xs text-[#B83232]">{'{ "success": false, "error": { "message": "...", "code": "..." } }'}</code>{' '}
        on failure.
      </p>
    </div>
  );
}

function ErrorCodesSection({ codes }: { codes: DocsErrorCode[] }): React.JSX.Element {
  return (
    <section id="errors">
      <h2 className="mb-1 text-xl font-semibold text-[#111111]">Error Codes</h2>
      <p className="mb-6 text-sm text-[#555047]">
        All errors use a consistent JSON shape with a human-readable message and a machine-readable code.
      </p>
      <div className="overflow-hidden rounded-sm border border-[#D9D3C5] bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#D9D3C5] bg-[#F7F4EE]">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-[#8A8278]">
                Code
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-[#8A8278]">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-[#8A8278]">
                Meaning
              </th>
            </tr>
          </thead>
          <tbody>
            {codes.map((c, i) => (
              <tr
                key={c.code}
                className={i % 2 === 0 ? 'bg-white' : 'bg-[#F7F4EE]'}
              >
                <td className="px-4 py-3 font-mono text-xs text-[#111111]">{c.code}</td>
                <td className={`px-4 py-3 font-mono text-xs font-semibold ${STATUS_STYLES[c.status] ?? 'text-[#555047]'}`}>
                  {c.status}
                </td>
                <td className="px-4 py-3 text-xs text-[#555047]">{c.meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function DocsLayout({ sections, errorCodes, baseUrl }: Props): React.JSX.Element {
  return (
    <div className="flex gap-10">
      {/* Sidebar — hidden on mobile */}
      <aside className="hidden lg:block w-44 shrink-0">
        <div className="sticky top-8">
          <SidebarNav sections={sections} />
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0 space-y-6">
        {/* Intro cards */}
        <div className="space-y-3 pb-4">
          <BaseUrl appUrl={baseUrl} />
          <ResponseEnvelope />
        </div>

        {/* Endpoint sections */}
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="space-y-4 scroll-mt-6">
            <div>
              <h2 className="text-xl font-semibold text-[#111111]">{section.title}</h2>
              <p className="mt-1 text-sm text-[#555047]">{section.intro}</p>
            </div>
            {section.endpoints.map((ep) => (
              <EndpointCard key={`${ep.method}-${ep.path}`} endpoint={ep} />
            ))}
          </section>
        ))}

        {/* Error codes */}
        <div className="scroll-mt-6">
          <ErrorCodesSection codes={errorCodes} />
        </div>
      </div>
    </div>
  );
}
