'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Key, BookOpen, Settings, LogOut, X } from 'lucide-react';
import { toast } from 'sonner';
import { signOut } from '@/services/auth.service';

const NAV = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'API Keys', href: '/dashboard/keys', icon: Key },
  { label: 'Docs', href: '/dashboard/docs', icon: BookOpen },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
] as const;

function isActive(href: string, pathname: string): boolean {
  if (href === '/dashboard') return pathname === '/dashboard';
  return pathname.startsWith(href);
}

type MobileDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileDrawer({ open, onClose }: MobileDrawerProps): React.JSX.Element {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut(): Promise<void> {
    onClose();
    try {
      await signOut();
      router.push('/');
    } catch {
      toast.error('Failed to sign out. Try again.');
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Drawer panel */}
      <div
        className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col bg-white transition-transform duration-200 ease-in-out lg:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-border px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-9 items-center justify-center rounded-sm bg-primary">
              <span className="text-[10px] font-bold tracking-widest text-white">VFX</span>
            </div>
            <span className="text-sm font-bold tracking-tight text-[#111111]">Verifex</span>
          </div>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-sm text-[#555047] hover:bg-[#F7F4EE]"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-1 flex-col gap-0.5 px-3 py-4">
          {NAV.map(({ label, href, icon: Icon }) => {
            const active = isActive(href, pathname);
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={
                  active
                    ? 'flex items-center gap-3 rounded-sm border-l-2 border-primary bg-[#EAF3F3] px-3 py-2.5 text-sm font-semibold text-primary'
                    : 'flex items-center gap-3 rounded-sm border-l-2 border-transparent px-3 py-2.5 text-sm font-medium text-[#555047] hover:bg-[#F7F4EE] hover:text-foreground'
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Sign out */}
        <div className="border-t border-border px-3 py-4">
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium text-[#555047] hover:bg-[#F7F4EE] hover:text-foreground"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Sign out
          </button>
        </div>
      </div>
    </>
  );
}
