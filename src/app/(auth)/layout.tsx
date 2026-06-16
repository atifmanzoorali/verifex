import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background">
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-1.5 text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to home
      </Link>
      <div className="w-full max-w-md px-4">{children}</div>
    </div>
  );
}
