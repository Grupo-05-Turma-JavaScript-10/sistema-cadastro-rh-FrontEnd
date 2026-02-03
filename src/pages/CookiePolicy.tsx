import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { ChevronLeft, Cookie } from "lucide-react";

export function CookiePolicy() {
  return (
    <main className="min-h-screen bg-background-light py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => window.history.back()}>
            <ChevronLeft size={20} />
            Voltar
          </Button>
        </div>

        <Card className="border-none shadow-md mb-20">
          <header className="mb-10 text-center">
            <div className="bg-primary-teal/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Cookie className="text-primary-teal" size={32} />
            </div>
            <h1 className="text-3xl font-extrabold text-corporate-slate">
              Política de Cookies
            </h1>
            <p className="text-metallic-silver font-medium mt-2">
              Transparência no uso de rastreadores
            </p>
          </header>

          <div className="space-y-8 text-corporate-slate pb-16">
            <section>
              <h2 className="text-lg font-bold mb-3 border-b border-gray-100 pb-1">
                1. O que são Cookies?
              </h2>
              <p className="leading-relaxed opacity-90">
                Cookies são pequenos arquivos de texto armazenados no seu
                dispositivo para melhorar sua experiência. No Colab+, utilizamos
                esses arquivos para reconhecer seu acesso e manter sua sessão
                ativa de forma segura.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3 border-b border-gray-100 pb-1">
                2. Cookies Essenciais
              </h2>
              <p className="leading-relaxed opacity-90">
                São indispensáveis para o funcionamento da plataforma. Incluem
                cookies de autenticação para identificar quem você é após o
                login e cookies de segurança para proteger a integridade dos
                seus dados durante a navegação.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3 border-b border-gray-100 pb-1">
                3. Cookies de Preferência
              </h2>
              <p className="leading-relaxed opacity-90">
                Utilizamos cookies funcionais para lembrar escolhas feitas por
                você, como idioma, filtros de busca em tabelas de colaboradores
                e personalizações da interface do dashboard.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3 border-b border-gray-100 pb-1">
                4. Como Gerenciar
              </h2>
              <p className="leading-relaxed opacity-90">
                Você pode optar por desativar os cookies nas configurações do
                seu navegador. No entanto, alertamos que o bloqueio de cookies
                essenciais impedirá o acesso às áreas logadas e ao funcionamento
                correto do cadastro de RH.
              </p>
            </section>
          </div>
        </Card>
      </div>
    </main>
  );
}
