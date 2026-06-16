import React from 'react';
import type { DocsEndpoint } from '@/lib/docs-data';
import { CodeBlock } from './CodeBlock';

type Props = {
  endpoint: DocsEndpoint;
};

const METHOD_STYLES: Record<DocsEndpoint['method'], string> = {
  GET:    'bg-[#EEF5E8] text-[#3A6A1A] border border-[#B8D49A]',
  POST:   'bg-[#EAF3F3] text-[#1A7A78] border border-[#A0D0CF]',
  DELETE: 'bg-[#FBF0EE] text-[#8A2020] border border-[#E8B4B0]',
};

export function EndpointCard({ endpoint }: Props): React.JSX.Element {
  return (
    <div className="flex overflow-hidden rounded-sm bg-white shadow-sm">
      <div className="w-[3px] shrink-0 bg-[#D9D3C5]" />
      <div className="flex-1 border border-l-0 border-[#D9D3C5] rounded-r-sm px-6 py-5 space-y-4">

        {/* Method + path */}
        <div className="flex flex-wrap items-center gap-3">
          <span className={`inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-semibold uppercase tracking-wider ${METHOD_STYLES[endpoint.method]}`}>
            {endpoint.method}
          </span>
          <code className="font-mono text-sm font-semibold text-[#111111]">
            {endpoint.path}
          </code>
        </div>

        {/* Description */}
        <p className="text-sm text-[#555047]">{endpoint.description}</p>

        {/* Auth */}
        <div className="flex gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8A8278] shrink-0 pt-0.5">
            Auth
          </span>
          <p className="text-xs text-[#555047]">{endpoint.auth}</p>
        </div>

        {/* Code examples */}
        {endpoint.examples.length > 0 && (
          <div className="space-y-3 pt-1">
            {endpoint.examples.map((ex) => (
              <CodeBlock key={ex.label} label={ex.label} html={ex.html} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
