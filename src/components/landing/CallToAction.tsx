'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function CallToAction(): React.JSX.Element {
  return (
    <section className="border-t border-border bg-[#E2DDD0] py-24 lg:py-32">
      <div className="mx-auto w-full max-w-7xl px-8 lg:px-12">
        <div className="flex flex-col items-start gap-12 lg:flex-row lg:items-end lg:justify-between">

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <h2 className="text-[40px] font-black leading-none tracking-[-0.03em] text-foreground lg:text-[64px] xl:text-[72px]">
              Start validating
              <br />
              emails today.
            </h2>
          </motion.div>

          {/* CTA block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            className="flex shrink-0 flex-col items-start gap-4"
          >
            <Button
              asChild
              className="h-12 rounded-[2px] px-8 text-sm font-semibold tracking-tight"
            >
              <Link href="/register">Get started free</Link>
            </Button>
            <p className="text-xs text-muted-foreground">
              No credit card · Open source · Free forever
            </p>
          </motion.div>
        </div>

        {/* Bottom rule + attribution */}
        <div className="mt-20 flex items-center justify-between border-t border-[#C9C4B8] pt-8">
          <span className="text-xs font-semibold tracking-tight text-foreground">Verifex</span>
          <span className="text-xs text-muted-foreground">
            Format check · MX record lookup · Free &amp; open source
          </span>
        </div>
      </div>
    </section>
  );
}
