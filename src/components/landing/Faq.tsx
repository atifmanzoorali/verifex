'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const ITEMS = [
  {
    q: 'What exactly does Verifex check?',
    a: 'Two things: email format (RFC 5321 compliance, 254-character limit) and MX records (whether the domain actually has mail servers configured). It does not perform SMTP handshakes or send test emails.',
  },
  {
    q: 'Is it really free?',
    a: 'Yes. There are no pricing tiers, no usage caps on the free plan, and no credit card required. Verifex is open source — you can self-host it if you prefer.',
  },
  {
    q: 'Is it open source?',
    a: 'Yes. The full source code is on GitHub under an MIT licence. You can read it, fork it, deploy your own instance, or contribute back.',
  },
  {
    q: 'Can I self-host Verifex?',
    a: 'Yes. Clone the repo, set up a Supabase project, fill in the four environment variables, and deploy to Vercel or any Node.js host. The self-hosting guide is in the README.',
  },
  {
    q: 'Why no SMTP verification?',
    a: 'SMTP verification (connecting to the mail server and simulating a send) is blocked by most hosting providers, frequently triggers spam filters on the target server, and produces unreliable results. MX record lookup covers 99% of practical use cases without those drawbacks.',
  },
] as const;

export function Faq(): React.JSX.Element {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="border-t border-border bg-background py-24 lg:py-32">
      <div className="mx-auto w-full max-w-7xl px-8 lg:px-12">

        {/* Overline */}
        <div className="mb-16 flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Frequently asked
          </span>
          <span className="h-px w-10 bg-border" />
          <span className="text-xs font-medium text-muted-foreground">{ITEMS.length} questions</span>
        </div>

        {/* Headline */}
        <h2 className="mb-16 text-[40px] font-black leading-none tracking-[-0.03em] text-foreground lg:text-[56px]">
          Common questions.
        </h2>

        {/* Accordion */}
        <div className="divide-y divide-border border-t border-border">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-start gap-8 py-7 text-left"
                  aria-expanded={isOpen}
                >
                  {/* Step number */}
                  <span className="mt-0.5 shrink-0 text-xs font-semibold tabular-nums text-muted-foreground">
                    0{i + 1}
                  </span>

                  {/* Question */}
                  <span className="flex-1 text-lg font-bold tracking-tight text-foreground">
                    {item.q}
                  </span>

                  {/* Toggle icon */}
                  <span className="mt-1 shrink-0 text-muted-foreground">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="pb-7 pl-14 pr-8">
                    <p className="text-sm leading-relaxed text-[#555047]">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
