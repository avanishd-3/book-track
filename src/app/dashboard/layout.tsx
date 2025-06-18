import DashboardNav from "@/components/dashboard/dashboard-nav";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-muted">
      <DashboardNav />
      <h1 className="flex justify-center text-3xl font-bold text-center mt-10">Dashboard</h1>
      {children}
    </div>
  );
}