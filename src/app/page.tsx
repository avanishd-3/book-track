import Hero from "@/components/hero/hero";
import NavbarPage from "@/components/navbar/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-muted">
      <NavbarPage />
      <Hero />
    </div>
  );
}