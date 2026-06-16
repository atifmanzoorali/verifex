import React from 'react';

type Props = {
  label: string;
  html: string;
};

export function CodeBlock({ label, html }: Props): React.JSX.Element {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#8A8278]">
        {label}
      </p>
      <div
        className="overflow-x-auto rounded-[2px] bg-[#111111] text-sm [&_pre]:!bg-transparent [&_pre]:p-5 [&_pre]:leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
