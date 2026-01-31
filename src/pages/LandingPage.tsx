import { Hero } from "../components/landing/Hero";
import { Navbar } from "../components/landing/Navbar";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background-light font-sans">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  );
}
