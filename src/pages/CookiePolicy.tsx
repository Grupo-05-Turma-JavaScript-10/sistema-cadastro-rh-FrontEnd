import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { ChevronLeft, Cookie, Info, Settings, ShieldCheck } from "lucide-react";

export function CookiePolicy() {
  return (
    <main className="min-h-screen bg-background-light py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="group"
          >
            <ChevronLeft
              size={20}
              className="transition-transform group-hover:-translate-x-1"
            />
            Voltar
          </Button>
        </div>

        <Card className="border-none shadow-md">
          <header className="mb-10 text-center">
            <div className="bg-primary-teal/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Cookie className="text-primary-teal" size={32} />
            </div>
            <h1 className="text-3xl font-extrabold text-corporate-slate">
              Política de Cookies
            </h1>
            <p className="text-metallic-silver font-medium mt-2">
              Entenda como melhoramos sua experiência de navegação.
            </p>
          </header>

          <div className="space-y-8 text-corporate-slate">
            <section>
              <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Info size={20} className="text-primary-teal" />O que são
                Cookies?
              </h2>
              <p className="leading-relaxed opacity-90">
                Cookies são pequenos arquivos de texto enviados pelo site ao seu
                navegador para registrar atividades e preferências. No nosso
                sistema de RH, eles garantem que você não precise fazer login
                repetidamente e que suas configurações de visualização sejam
                mantidas.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-gray-100 bg-white shadow-sm hover:border-primary-teal/30 transition-colors">
                <div className="flex items-center gap-3 mb-3 text-primary-teal">
                  <ShieldCheck size={20} />
                  <h3 className="font-bold">Essenciais</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Necessários para autenticação, segurança e integridade do
                  sistema. Sem eles, a plataforma não funciona corretamente.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-gray-100 bg-white shadow-sm hover:border-primary-teal/30 transition-colors">
                <div className="flex items-center gap-3 mb-3 text-primary-teal">
                  <Settings size={20} />
                  <h3 className="font-bold">Funcionais</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Permitem que o sistema lembre suas escolhas, como idioma
                  preferido e filtros aplicados nas tabelas de colaboradores.
                </p>
              </div>
            </div>

            <section className="bg-corporate-slate/5 p-6 rounded-xl">
              <h2 className="text-lg font-bold mb-3 text-corporate-slate">
                Como gerenciar?
              </h2>
              <p className="text-sm leading-relaxed mb-4">
                Você pode desativar os cookies nas configurações do seu
                navegador a qualquer momento. Entretanto, partes do sistema de
                cadastro de RH podem apresentar instabilidade ou exigir login
                constante sem esses arquivos.
              </p>
            </section>
          </div>

          <footer className="mt-12 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-metallic-silver italic font-medium">
              Data da última revisão: 03/02/2026.
            </p>
            <div className="flex gap-3 w-full sm:w-auto">
              <Button variant="outline" className="flex-1 sm:flex-none">
                Personalizar
              </Button>
              <Button variant="primary" className="flex-1 sm:flex-none px-10">
                Aceitar Cookies
              </Button>
            </div>
          </footer>
        </Card>
      </div>
    </main>
  );
}
