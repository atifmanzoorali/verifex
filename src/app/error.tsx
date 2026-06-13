'use client';

import { useEffect } from 'react';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps): React.JSX.Element {
  useEffect(() => {
    console.error('[Render Error]', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-semibold text-foreground">Something went wrong</h1>
        <p className="text-muted-foreground">An unexpected error occurred. Please try again.</p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
