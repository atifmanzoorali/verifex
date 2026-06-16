'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const NAV_LINKS = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Docs', href: '/docs' },
  { label: 'FAQ', href: '#faq' },
] as const;

export function Navbar(): React.JSX.Element {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="fixed left-0 right-0 top-6 z-50 flex justify-center px-4"
    >
      <nav className="flex w-full max-w-3xl items-center justify-between rounded-full border border-border bg-white/80 px-6 py-2.5 shadow-sm backdrop-blur-md">
        {/* Logo */}
        <Link
          href="/"
          className="text-sm font-bold tracking-tight text-foreground"
        >
          Verifex
        </Link>

        {/* Links + CTA */}
        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Button
            asChild
            size="sm"
            className="rounded-[2px] bg-foreground text-xs font-semibold text-background hover:bg-foreground/90"
          >
            <Link href="/register">Get started</Link>
          </Button>
        </div>
      </nav>
    </motion.header>
  );
}
