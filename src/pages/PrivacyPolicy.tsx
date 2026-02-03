import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { ChevronLeft, ShieldCheck, Lock, Eye } from "lucide-react";

export function PrivacyPolicy() {
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
            Voltar ao início
          </Button>
        </div>

        <Card className="border-none shadow-md">
          <header className="mb-10 text-center">
            <div className="bg-primary-teal/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="text-primary-teal" size={32} />
            </div>
            <h1 className="text-3xl font-extrabold text-corporate-slate">
              Política de Privacidade
            </h1>
            <p className="text-metallic-silver font-medium mt-2">
              Sua segurança e privacidade são nossas prioridades.
            </p>
          </header>

          <div className="space-y-8 text-corporate-slate">
            <section className="flex gap-4">
              <div className="hidden sm:block">
                <Lock className="text-primary-teal" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold mb-2">Tratamento de Dados</h2>
                <p className="leading-relaxed opacity-90">
                  O Sistema de Cadastro de RH processa informações pessoais
                  exclusivamente para fins de gestão de colaboradores e
                  cumprimento de obrigações trabalhistas. Garantimos que nenhum
                  dado sensível saia do nosso ambiente controlado.
                </p>
              </div>
            </section>

            <section className="flex gap-4">
              <div className="hidden sm:block">
                <Eye className="text-primary-teal" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold mb-2">
                  Compartilhamento de Informações
                </h2>
                <p className="leading-relaxed opacity-90">
                  Não comercializamos dados de usuários. O compartilhamento
                  ocorre apenas com órgãos governamentais necessários ou
                  prestadores de serviços essenciais, sempre sob rígidos
                  contratos de confidencialidade.
                </p>
              </div>
            </section>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h3 className="font-bold text-primary-teal mb-3">
                Seus Direitos (LGPD)
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-semibold">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-teal" />
                  Acesso aos dados coletados
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-teal" />
                  Correção de dados incompletos
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-teal" />
                  Eliminação de dados desnecessários
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-teal" />
                  Revogação do consentimento
                </li>
              </ul>
            </div>
          </div>

          <footer className="mt-12 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-metallic-silver italic">
              Última modificação: 03 de fevereiro de 2026.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => window.print()}>
                Versão em PDF
              </Button>
              <Button variant="primary">Entendido</Button>
            </div>
          </footer>
        </Card>
      </div>
    </main>
  );
}
