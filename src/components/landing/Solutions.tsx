import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Users, Layout, ShieldCheck } from "lucide-react";

export function Solutions() {
  const solutions = [
    {
      title: "Gestão Estratégica",
      description:
        "Visualize toda a estrutura da sua empresa com organogramas dinâmicos.",
      icon: <Layout className="w-6 h-6 text-emerald-500" />,
      tag: "RH 4.0",
    },
    {
      title: "Segurança de Dados",
      description:
        "Controle permissões de acesso com níveis de segurança granulares.",
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      tag: "LGPD",
    },
    {
      title: "Experiência do Colaborador",
      description:
        "Portal dedicado para atualização de dados e consulta de documentos.",
      icon: <Users className="w-6 h-6 text-emerald-500" />,
      tag: "Self-service",
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 text-center">
        <Badge variant="brand">Nossas Soluções</Badge>
        <h2 className="text-3xl font-bold text-slate-900 mb-12">
          Tudo o que você precisa para escalar sua gestão
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((item, index) => (
            <Card
              key={index}
              className="p-8 hover:shadow-lg transition-shadow border-none bg-white"
            >
              <div className="mb-4 flex justify-center">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-slate-600 text-sm mb-4">{item.description}</p>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                {item.tag}
              </span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
