const STEPS = [
  {
    number: '01',
    title: 'Register',
    description: 'Create a free account in under 30 seconds. No credit card required.',
  },
  {
    number: '02',
    title: 'Get your API key',
    description: 'Generate a key from your dashboard. Name it, copy it once, use it forever.',
  },
  {
    number: '03',
    title: 'Call the API',
    description: 'POST an email address. Receive a structured result in milliseconds.',
  },
] as const;

export function HowItWorks(): React.JSX.Element {
  return (
    <section id="how-it-works" className="border-t border-border bg-background py-24 lg:py-32">
      <div className="mx-auto w-full max-w-7xl px-8 lg:px-12">

        {/* Overline */}
        <div className="mb-16 flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            How it works
          </span>
          <span className="h-px w-10 bg-border" />
          <span className="text-xs font-medium text-muted-foreground">3 steps</span>
        </div>

        {/* Headline */}
        <h2 className="mb-20 text-[40px] font-black leading-none tracking-[-0.03em] text-foreground lg:text-[56px]">
          Simple by design.
        </h2>

        {/* Steps grid */}
        <div className="grid grid-cols-1 gap-0 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className="border-t border-border pt-8 md:border-l md:border-t-0 md:pl-10 md:first:border-l-0 md:first:pl-0"
            >
              {/* Large step number — Swiss typographic weight */}
              <span className="mb-6 block text-[80px] font-black leading-none tracking-[-0.04em] text-border lg:text-[100px]">
                {step.number}
              </span>
              <h3 className="mb-3 text-xl font-bold tracking-tight text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
              {/* Connector dot — hidden on last */}
              {i < STEPS.length - 1 && (
                <div className="mt-10 hidden items-center gap-2 md:flex">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  <span className="h-px flex-1 bg-border" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
