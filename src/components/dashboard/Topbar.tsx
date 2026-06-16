'use client';

import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Overview',
  '/dashboard/keys': 'API Keys',
  '/dashboard/docs': 'Documentation',
  '/dashboard/settings': 'Settings',
};

type TopbarProps = {
  onMenuClick: () => void;
};

export function Topbar({ onMenuClick }: TopbarProps): React.JSX.Element {
  const pathname = usePathname();
  const { user } = useAuth();

  const title = PAGE_TITLES[pathname] ?? 'Dashboard';
  const displayName =
    (user?.user_metadata?.full_name as string | undefined) ?? user?.email ?? '';

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-white px-4 lg:px-6">
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="flex h-8 w-8 items-center justify-center rounded-sm text-[#555047] hover:bg-[#F7F4EE] lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-4 w-4" />
        </button>

        {/* Title only on mobile — desktop uses the page H1 */}
        <h1 className="text-base font-semibold tracking-tight text-foreground lg:hidden">{title}</h1>
      </div>

      {/* User info */}
      {displayName && (
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EAF3F3] text-xs font-semibold text-primary">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <span className="hidden text-xs text-[#555047] sm:block">
            {displayName}
          </span>
        </div>
      )}
    </header>
  );
}
