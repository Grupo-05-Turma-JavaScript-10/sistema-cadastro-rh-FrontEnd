import { Card } from "../ui/Card";
import { Check } from "lucide-react";

export function Solutions() {
  const solutions = [
    {
      number: "01",
      title: "Centralização de Dados",
      description:
        "Elimine planilhas espalhadas. Organize todas as informações dos colaboradores em um banco de dados único.",
      features: [
        "Perfil completo",
        "Histórico de documentos",
        "Busca dinâmica",
      ],
    },
    {
      number: "02",
      title: "Estrutura de Cargos",
      description:
        "Mantenha a hierarquia da empresa organizada e clara, facilitando a gestão de responsabilidades.",
      features: [
        "Organograma automatizado",
        "Definição de competências",
        "Planos de carreira",
      ],
    },
    {
      number: "03",
      title: "Controle de Acessos",
      description:
        "Segurança em primeiro lugar. Controle quem pode visualizar ou editar informações sensíveis do RH.",
      features: [
        "Níveis de permissão",
        "Conformidade LGPD",
        "Logs de atividades",
      ],
    },
  ];

  return (
    <section id="solucoes" className="bg-background-light py-24 px-4 md:px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-corporate-slate text-center mb-20 tracking-tight">
          Simplifique a Gestão do seu RH
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((item, index) => (
            <Card
              key={index}
              className="flex flex-col items-start text-left bg-surface-white border-none shadow-sm hover:shadow-md transition-all duration-300 p-10 rounded-[2.5rem]"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary-teal flex items-center justify-center mb-8 shadow-lg shadow-primary-teal/20">
                <span className="text-white text-2xl font-bold">
                  {item.number}
                </span>
              </div>

              <h3 className="text-corporate-slate font-bold text-xl mb-4 leading-tight">
                {item.title}
              </h3>

              <p className="text-metallic-silver font-medium text-sm mb-8 leading-relaxed">
                {item.description}
              </p>

              <ul className="space-y-4 mb-10 flex-1">
                {item.features.map((feature, fIndex) => (
                  <li
                    key={fIndex}
                    className="flex items-center gap-3 text-corporate-slate font-medium text-sm"
                  >
                    <div className="bg-success-green/10 p-1 rounded-full">
                      <Check className="w-3 h-3 text-success-green" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
