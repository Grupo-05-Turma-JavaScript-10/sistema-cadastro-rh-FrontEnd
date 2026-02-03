import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { ChevronLeft, Shield } from "lucide-react";

export function PrivacyPolicy() {
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
              <Shield className="text-primary-teal" size={32} />
            </div>
            <h1 className="text-3xl font-extrabold text-corporate-slate">
              Política de Privacidade
            </h1>
            <p className="text-metallic-silver font-medium mt-2">
              Sua privacidade é nossa prioridade
            </p>
          </header>

          <div className="space-y-8 text-corporate-slate pb-16">
            <section>
              <h2 className="text-lg font-bold mb-3 border-b border-gray-100 pb-1">
                1. Informações que Coletamos
              </h2>
              <p className="leading-relaxed opacity-90">
                Coletamos informações necessárias para a gestão de recursos
                humanos, incluindo dados de identificação pessoal (nome, CPF,
                RG), informações de contato (e-mail, telefone) e dados
                profissionais pertinentes ao vínculo empregatício ou processo
                seletivo.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3 border-b border-gray-100 pb-1">
                2. Uso das Informações
              </h2>
              <p className="leading-relaxed opacity-90">
                Os dados coletados são utilizados exclusivamente para fins de
                administração interna, processamento de folha de pagamento,
                gestão de benefícios, cumprimento de obrigações legais e
                comunicações institucionais relacionadas ao Colab+.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3 border-b border-gray-100 pb-1">
                3. Compartilhamento de Dados
              </h2>
              <p className="leading-relaxed opacity-90">
                Não compartilhamos suas informações pessoais com terceiros para
                fins comerciais. O compartilhamento ocorre apenas com parceiros
                essenciais (bancos, operadoras de benefícios) e órgãos
                governamentais para cumprimento de obrigações legais (eSocial).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3 border-b border-gray-100 pb-1">
                4. Segurança dos Dados
              </h2>
              <p className="leading-relaxed opacity-90">
                Implementamos medidas de segurança técnicas e administrativas
                para proteger seus dados contra acessos não autorizados, perda
                ou alteração indevida, seguindo rigorosamente as diretrizes da
                Lei Geral de Proteção de Dados (LGPD).
              </p>
            </section>
          </div>
        </Card>
      </div>
    </main>
  );
}
