import Hero from "@/components/hero/hero";
import NavBar from "@/components/navbar/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-muted">
      <NavBar />
      <Hero />
    </div>
  );
}