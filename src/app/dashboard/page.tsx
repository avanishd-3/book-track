export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-muted">
      <h1 className="text-3xl font-bold text-center mt-10">Dashboard</h1>
      <p className="text-center mt-4">This is a protected route. You must be signed in to view this page.</p>
    </div>
  );
}