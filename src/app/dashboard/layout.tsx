import NavBar from "@/components/navbar/navbar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-muted">
      <NavBar />
      <h1 className="flex justify-center text-3xl font-bold text-center mt-10">Dashboard</h1>
      {children}
    </div>
  );
}