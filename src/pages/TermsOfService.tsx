import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { ChevronLeft, Scale, FileText, AlertCircle } from "lucide-react";

export function TermsOfService() {
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
            Voltar ao cadastro
          </Button>
        </div>

        <Card className="border-none shadow-md overflow-hidden">
          <header className="bg-corporate-slate p-8 text-center text-white">
            <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Scale className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Termos de Serviço
            </h1>
            <p className="text-metallic-silver font-medium mt-2">
              Regras e diretrizes para o uso do sistema de RH
            </p>
          </header>

          <div className="p-8 space-y-10 text-corporate-slate">
            <section className="flex gap-4">
              <div className="text-primary-teal shrink-0">
                <FileText size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold mb-3 border-b border-gray-100 pb-1">
                  1. Objeto do Sistema
                </h2>
                <p className="leading-relaxed opacity-90 text-sm md:text-base">
                  Este sistema destina-se exclusivamente ao gerenciamento de
                  dados de recursos humanos, incluindo recrutamento, seleção e
                  manutenção de prontuários de colaboradores. O uso para
                  qualquer outra finalidade é estritamente proibido.
                </p>
              </div>
            </section>

            <section className="flex gap-4">
              <div className="text-primary-teal shrink-0">
                <AlertCircle size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold mb-3 border-b border-gray-100 pb-1">
                  2. Responsabilidades do Usuário
                </h2>
                <p className="leading-relaxed opacity-90 text-sm md:text-base">
                  Ao realizar o cadastro, o usuário declara que todas as
                  informações prestadas são verdadeiras. O compartilhamento de
                  senhas de acesso compromete a segurança dos dados da empresa e
                  pode resultar em sanções administrativas conforme o regimento
                  interno.
                </p>
              </div>
            </section>

            <section className="bg-gray-50 p-6 rounded-xl border-l-4 border-error-red">
              <h3 className="font-bold text-corporate-slate mb-2">
                Propriedade Intelectual
              </h3>
              <p className="text-sm leading-relaxed">
                Todo o código-fonte, layout, logotipos e conteúdo textual deste
                sistema são de propriedade exclusiva da organização. Reproduções
                totais ou parciais não autorizadas estão sujeitas a medidas
                legais.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3 border-b border-gray-100 pb-1">
                3. Alterações nos Termos
              </h2>
              <p className="leading-relaxed opacity-90 text-sm md:text-base">
                Reservamo-nos o direito de atualizar estes termos a qualquer
                momento para refletir mudanças na legislação ou nos processos
                internos de RH. Notificações sobre alterações relevantes serão
                enviadas via e-mail corporativo.
              </p>
            </section>
          </div>

          <footer className="bg-gray-50/50 p-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="text-xs text-metallic-silver">
              <p>
                Ao clicar em aceitar, você confirma a leitura total deste
                documento.
              </p>
              <p className="mt-1 font-semibold italic text-primary-teal">
                Vigência: Fevereiro/2026
              </p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <Button variant="outline" className="flex-1 sm:flex-none">
                Recusar
              </Button>
              <Button variant="primary" className="flex-1 sm:flex-none px-8">
                Aceitar Termos
              </Button>
            </div>
          </footer>
        </Card>
      </div>
    </main>
  );
}
