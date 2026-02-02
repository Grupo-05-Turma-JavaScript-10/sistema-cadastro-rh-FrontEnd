import { Hero } from "../components/landing/Hero";
import { Navbar } from "../components/landing/Navbar";
import { Features } from "../components/landing/Features";

export function LandingPage() {
  return (
      <PageTransition>

    <div className="min-h-screen bg-background-light font-sans">
      <Navbar />
      <main>
        <Hero />
        <Features />
      </main>
    </div>
    </PageTransition>
  );
}
