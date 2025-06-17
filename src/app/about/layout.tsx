import NavbarPage from "@/components/navbar/navbar";

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-muted">
      <NavbarPage />
      {children}
    </div>
  );
}