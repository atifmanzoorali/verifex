'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FEATURES = ['Format check', 'MX record lookup', '~20ms response', 'Free & open source'] as const;

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut', delay },
  };
}

export function Hero(): React.JSX.Element {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Depth — primary glow, top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[700px] w-[700px] -translate-y-1/4 translate-x-1/4 rounded-full bg-primary opacity-[0.07] blur-[140px]"
      />
      {/* Depth — secondary glow, bottom-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] translate-y-1/3 -translate-x-1/4 rounded-full bg-primary opacity-[0.04] blur-[100px]"
      />

      {/* Content container */}
      <div className="relative mx-auto w-full max-w-7xl px-8 pb-8 pt-24 lg:px-12">

        {/* Overline */}
        <motion.div {...fadeUp(0)} className="mb-6 flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Email Validation API
          </span>
          <span className="h-px w-10 bg-border" />
          <span className="text-xs font-medium text-muted-foreground">v1</span>
        </motion.div>

        {/* Headline */}
        <div className="mb-6">
          <motion.h1
            {...fadeUp(0.08)}
            className="text-[52px] font-black leading-[0.95] tracking-[-0.03em] text-foreground lg:text-[72px] xl:text-[92px]"
          >
            Validate
          </motion.h1>

          <motion.div
            {...fadeUp(0.16)}
            className="text-[52px] font-black leading-[0.95] tracking-[-0.03em] lg:text-[72px] xl:text-[92px]"
          >
            <span className="text-primary">every</span>
            <span className="text-foreground"> email.</span>
          </motion.div>

          {/* Swiss rule */}
          <motion.div
            {...fadeUp(0.24)}
            className="my-4 h-px w-full bg-border"
          />

          <motion.div
            {...fadeUp(0.28)}
            className="flex items-baseline gap-6"
          >
            <span className="text-[52px] font-black leading-[0.95] tracking-[-0.03em] text-foreground lg:text-[72px] xl:text-[92px]">
              Instantly.
            </span>
            <span className="hidden text-xs font-semibold uppercase tracking-widest text-muted-foreground lg:block">
              No SMTP<br />required
            </span>
          </motion.div>
        </div>

        {/* Sub-headline */}
        <motion.p
          {...fadeUp(0.38)}
          className="mb-8 max-w-sm text-base leading-relaxed text-[#555047]"
        >
          Format check + MX record lookup in milliseconds.
          Free, open source, and built for developers.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.46)} className="flex items-center gap-5">
          <Button
            asChild
            className="h-11 rounded-[2px] px-6 text-sm font-semibold tracking-tight"
          >
            <Link href="/register">Get started free</Link>
          </Button>
          <Link
            href="/docs"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground"
          >
            View docs
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          {...fadeUp(0.54)}
          className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2"
        >
          {FEATURES.map((item, i) => (
            <span key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
              {i > 0 && <span className="h-px w-3 bg-border" />}
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
