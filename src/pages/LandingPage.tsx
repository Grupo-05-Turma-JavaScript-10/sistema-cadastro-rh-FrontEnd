import { Hero } from "../components/landing/Hero";
import { Navbar } from "../components/landing/Navbar";
import { PageTransition } from "../components/ui/PageTransition";

export function LandingPage() {
  return (
      <PageTransition>

    <div className="min-h-screen bg-background-light font-sans">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
    </PageTransition>
  );
}
