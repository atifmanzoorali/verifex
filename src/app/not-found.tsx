import Link from 'next/link';

export default function NotFoundPage(): React.JSX.Element {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-semibold text-foreground">Page not found</h1>
        <p className="text-muted-foreground">The page you are looking for does not exist.</p>
        <Link
          href="/"
          className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
