import { Link, useLocation, useNavigate } from "react-router-dom";

export function Footer() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    if (pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        const top = element.offsetTop - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    } else {
      navigate(`/#${targetId}`);
    }
  };

  return (
    <footer className="relative bg-linear-to-br from-corporate-slate via-[#1a2e35] to-[#0f1a1e] text-background-light py-12 px-4 md:px-8 mt-auto">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-primary-teal to-transparent opacity-70" />

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="flex flex-col gap-4">
          <Link
            to="/"
            onClick={handleBackToTop}
            className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity w-fit"
          >
            <div className="bg-primary-teal w-10 h-10 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl font-extrabold -mt-0.5">
                C+
              </span>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Colab<span className="text-primary-teal">+</span>
            </span>
          </Link>
          <p className="text-sm text-metallic-silver leading-relaxed max-w-50 font-medium">
            Gestão de RH simplificada e eficiente para sua empresa.
          </p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-5 uppercase text-xs tracking-widest border-l-2 border-primary-teal pl-3">
            Navegação
          </h3>
          <ul className="space-y-3 text-sm">
            {[
              { name: "Soluções", id: "solucoes" },
              { name: "Funcionalidades", id: "funcionalidades" },
              { name: "Recursos", id: "recursos" },
            ].map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className="text-metallic-silver hover:text-primary-teal transition-colors font-medium cursor-pointer"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-5 uppercase text-xs tracking-widest border-l-2 border-primary-teal pl-3">
            Institucional
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                to="/privacidade"
                onClick={handleBackToTop}
                className="text-metallic-silver hover:text-primary-teal transition-colors font-medium"
              >
                Políticas de Privacidade
              </Link>
            </li>
            <li>
              <Link
                to="/termos"
                onClick={handleBackToTop}
                className="text-metallic-silver hover:text-primary-teal transition-colors font-medium"
              >
                Termos de Uso
              </Link>
            </li>
            <li>
              <Link
                to="/cookies"
                onClick={handleBackToTop}
                className="text-metallic-silver hover:text-primary-teal transition-colors font-medium"
              >
                Cookies
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-white font-bold uppercase text-xs tracking-widest border-l-2 border-primary-teal pl-3">
            Canais de Atendimento
          </h3>
          <div className="flex flex-col gap-3">
            <a
              href="mailto:contato@colabplus.com"
              className="text-sm text-metallic-silver hover:text-primary-teal transition-colors flex items-center gap-2"
            >
              <span className="bg-white/10 p-2 rounded-lg group-hover:bg-primary-teal/20 transition-all">
                📧
              </span>
              contato@colabplus.com
            </a>
            <a
              href="tel:+5511999999999"
              className="text-sm text-metallic-silver hover:text-primary-teal transition-colors flex items-center gap-2"
            >
              <span className="bg-white/10 p-2 rounded-lg group-hover:bg-primary-teal/20 transition-all">
                📞
              </span>
              (11) 99999-9999
            </a>
          </div>

          <div className="bg-white/5 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
            <p className="text-[10px] text-primary-teal uppercase font-extrabold tracking-wider mb-1">
              Suporte Ativo
            </p>
            <p className="text-xs text-white font-medium">
              Segunda a Sexta — 08h às 18h
            </p>
          </div>

          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-primary-teal text-white text-center text-xs font-bold py-3 rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary-teal/20"
          >
            Falar com um Especialista
          </a>
        </div>
      </div>

      <div className="container mx-auto border-t border-white/10 mt-12 pt-8 text-center text-xs text-metallic-silver font-bold uppercase tracking-widest">
        <p>© 2026 COLAB+. TODOS OS DIREITOS RESERVADOS.</p>
      </div>
    </footer>
  );
}
