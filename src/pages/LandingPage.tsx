import { Hero } from "../components/landing/Hero";
import { Navbar } from "../components/landing/Navbar";
import { Features } from "../components/landing/Features";
import { Solutions } from "../components/landing/Solutions";
import { PageTransition } from "../components/ui/PageTransition";
import { Resources } from "../components/landing/Resources";

export function LandingPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background-light font-sans">
        <Navbar />
        <main>
          <Hero />
          <Solutions />
          <Features />
          <Resources />
        </main>
      </div>
    </PageTransition>
  );
}
