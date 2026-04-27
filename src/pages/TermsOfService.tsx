import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { ChevronLeft, Scale } from "lucide-react";

export function TermsOfService() {
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
              <Scale className="text-primary-teal" size={32} />
            </div>
            <h1 className="text-3xl font-extrabold text-corporate-slate">
              Termos de Uso
            </h1>
            <p className="text-metallic-silver font-medium mt-2">
              Condições gerais de acesso à plataforma
            </p>
          </header>

          <div className="space-y-8 text-corporate-slate pb-16">
            <section>
              <h2 className="text-lg font-bold mb-3 border-b border-gray-100 pb-1">
                1. Aceitação dos Termos
              </h2>
              <p className="leading-relaxed opacity-90">
                Ao acessar e utilizar o Colab+, o usuário concorda integralmente
                com as regras estabelecidas nestes termos. O uso da plataforma é
                restrito aos colaboradores e administradores autorizados pela
                organização.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3 border-b border-gray-100 pb-1">
                2. Responsabilidade do Usuário
              </h2>
              <p className="leading-relaxed opacity-90">
                O usuário é responsável por manter a confidencialidade de suas
                credenciais de acesso e pela veracidade de todos os dados
                inseridos no sistema. É proibida a cessão de senhas a terceiros
                ou o uso indevido das informações aqui contidas.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3 border-b border-gray-100 pb-1">
                3. Propriedade Intelectual
              </h2>
              <p className="leading-relaxed opacity-90">
                Todo o conteúdo, design, logotipos e funcionalidades do Colab+
                são de propriedade exclusiva da empresa. Reproduções ou
                modificações sem autorização expressa são estritamente
                proibidas.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3 border-b border-gray-100 pb-1">
                4. Modificações no Serviço
              </h2>
              <p className="leading-relaxed opacity-90">
                Reservamo-nos o direito de atualizar, modificar ou suspender
                funcionalidades do sistema para melhorias técnicas ou adequações
                legais, informando os usuários sempre que houver alterações
                significativas nestes termos.
              </p>
            </section>
          </div>
        </Card>
      </div>
    </main>
  );
}
