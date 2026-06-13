export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <div className="min-h-screen flex">
      {/* DashboardShell — Sidebar + Topbar — built in Step 4 */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
