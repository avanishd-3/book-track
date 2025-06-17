import DashboardNav from "@/components/dashboard/dashboard-nav";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-muted">
      <DashboardNav />
      {children}
    </div>
  );
}