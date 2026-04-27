import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "../components/landing/Hero";
import { Features } from "../components/landing/Features";
import { Solutions } from "../components/landing/Solutions";
import { PageTransition } from "../components/ui/PageTransition";
import { Resources } from "../components/landing/Resources";

export function LandingPage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        const element = document.getElementById(hash.replace("#", ""));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [hash]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background-light font-sans">
        <main>
          <Hero />

          <section id="solucoes">
            <Solutions />
          </section>

          <section id="funcionalidades">
            <Features />
          </section>

          <section id="recursos">
            <Resources />
          </section>
        </main>
      </div>
    </PageTransition>
  );
}
