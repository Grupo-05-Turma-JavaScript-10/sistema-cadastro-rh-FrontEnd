import { Users, Search, ShieldCheck } from "lucide-react";
import { Card } from "../ui/Card";

export function Features() {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-primary-teal" />,
      title: "Cadastro e gestão de colaboradores",
      description: "Dados organizados e atualizados",
    },
    {
      icon: <Search className="w-8 h-8 text-primary-teal" />,
      title: "Buscas dinâmicas",
      description: "Encontre informações rapidamente",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary-teal" />,
      title: "Controle de usuários do sistema",
      description: "Gerencie quem acessa as informações",
    },
  ];

  return (
    <section id="funcionalidades" className="bg-white py-24 px-4 md:px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-corporate-slate text-center mb-20 tracking-tight">
          Principais Funcionalidades
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="flex flex-col items-center text-center group hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-20 h-20 rounded-full bg-primary-teal/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              <h3 className="text-corporate-slate font-bold text-xl mb-3 leading-tight">
                {feature.title}
              </h3>
              <p className="text-metallic-silver font-medium text-sm">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
