import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-corporate-slate text-background-light border-t border-white/5 py-12 px-4 md:px-8 mt-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity">
            <div className="bg-primary-teal w-8 h-8 rounded-lg flex items-center justify-center shadow-sm">
              <div className="w-3.5 h-3.5 border-2 border-white rounded-[1px] transform rotate-45" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Colab<span className="text-primary-teal">+</span>
            </span>
          </div>
          <p className="text-sm text-metallic-silver leading-relaxed max-w-50 font-medium">
            Gestão de RH simplificada e eficiente para sua empresa.
          </p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-5 uppercase text-xs tracking-widest border-l-2 border-primary-teal pl-3">
            Navegação
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href="#solucoes"
                className="text-metallic-silver hover:text-primary-teal transition-colors font-medium"
              >
                Soluções
              </a>
            </li>
            <li>
              <a
                href="#funcionalidades"
                className="text-metallic-silver hover:text-primary-teal transition-colors font-medium"
              >
                Funcionalidades
              </a>
            </li>
            <li>
              <a
                href="#clientes"
                className="text-metallic-silver hover:text-primary-teal transition-colors font-medium"
              >
                Clientes
              </a>
            </li>
            <li>
              <a
                href="#recursos"
                className="text-metallic-silver hover:text-primary-teal transition-colors font-medium"
              >
                Recursos
              </a>
            </li>
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
                className="text-metallic-silver hover:text-primary-teal transition-colors font-medium"
              >
                Políticas de Privacidade
              </Link>
            </li>
            <li>
              <Link
                to="/termos"
                className="text-metallic-silver hover:text-primary-teal transition-colors font-medium"
              >
                Termos de Uso
              </Link>
            </li>
            <li>
              <Link
                to="/cookies"
                className="text-metallic-silver hover:text-primary-teal transition-colors font-medium"
              >
                Cookies
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-5 uppercase text-xs tracking-widest border-l-2 border-primary-teal pl-3">
            Canais de Atendimento
          </h3>
          <div className="space-y-4">
            <div className="flex flex-col gap-3">
              <a
                href="mailto:contato@colabplus.com"
                className="group flex items-center gap-3 text-sm text-metallic-silver hover:text-primary-teal transition-colors"
              >
                <span className="bg-white/5 p-2 rounded-lg group-hover:bg-primary-teal/20">
                  📧
                </span>
                contato@colabplus.com
              </a>
              <a
                href="tel:+5511999999999"
                className="group flex items-center gap-3 text-sm text-metallic-silver hover:text-primary-teal transition-colors"
              >
                <span className="bg-white/5 p-2 rounded-lg group-hover:bg-primary-teal/20">
                  📞
                </span>
                (11) 99999-9999
              </a>
            </div>

            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
              <p className="text-[10px] text-primary-teal uppercase font-extrabold tracking-wider mb-1">
                Suporte Ativo
              </p>
              <p className="text-xs text-white font-medium">
                Segunda a Sexta — 08h às 18h
              </p>
            </div>

            <a
              href="https://wa.me/5511999999999?text=Olá! Gostaria de falar com um especialista sobre o Colab+."
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-primary-teal text-white text-center text-xs font-bold py-3 rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary-teal/20"
            >
              Falar com um Especialista
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto border-t border-white/10 mt-12 pt-8 flex flex-col items-center text-xs text-metallic-silver font-bold uppercase tracking-widest text-center">
        <p>
          © {new Date().getFullYear()} Colab+. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
