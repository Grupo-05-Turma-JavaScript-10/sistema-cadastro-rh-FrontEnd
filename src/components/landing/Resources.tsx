import { Card } from "../ui/Card";
import { Users, Briefcase, Activity, Check } from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

export function Resources() {
  const dots = Array.from({ length: 80 });

  const resources = [
    {
      icon: <Users className="w-8 h-8 text-primary-teal" />,
      title: "Gestão de Colaboradores",
      description:
        "Monitore o quadro total de funcionários, novos ingressos do mês e a taxa de crescimento da sua equipe.",
      features: [
        "Controle de Ativos/Inativos",
        "Resumo rápido de equipe",
        "Filtros por departamento",
      ],
    },
    {
      icon: <Briefcase className="w-8 h-8 text-primary-teal" />,
      title: "Cargos & Estrutura",
      description:
        "Estruture sua empresa de forma clara. Gerencie cargos ativos e acompanhe as mudanças em tempo real.",
      features: [
        "Listagem de cargos ativos",
        "Atualizações de cargo",
        "Visão geral da estrutura",
      ],
    },
    {
      icon: <Activity className="w-8 h-8 text-primary-teal" />,
      title: "Atividades Recentes",
      description:
        "Mantenha-se atualizado com o log de ações: novos cadastros, desligamentos e alterações de cargos.",
      features: [
        "Timeline de eventos",
        "Alertas de atividades",
        "Histórico de usuários",
      ],
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="recursos"
      className="relative overflow-hidden py-32 bg-linear-to-br from-corporate-slate via-[#1a2e35] to-[#0f1a1e]"
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {dots.map((_, i) => {
          const size = Math.random() * 4 + 1;
          return (
            <div
              key={i}
              className="absolute rounded-full bg-primary-teal animate-float"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 12 + 8}s`,
                animationDelay: `${Math.random() * 10}s`,
                opacity: Math.random() * 0.3 + 0.1,
              }}
            />
          );
        })}
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
            Recursos do seu <span className="text-primary-teal">Dashboard</span>
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto font-medium">
            Toda a visão geral da sua gestão de RH em uma interface intuitiva e
            poderosa.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <Card className="flex flex-col items-start text-left bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-colors duration-500 p-10 rounded-[2.5rem] h-full group">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:bg-primary-teal/20 transition-colors"
                >
                  {resource.icon}
                </motion.div>

                <h3 className="text-white font-bold text-xl mb-4 leading-tight group-hover:text-primary-teal transition-colors">
                  {resource.title}
                </h3>

                <p className="text-white/60 font-medium text-sm mb-8 leading-relaxed">
                  {resource.description}
                </p>

                <ul className="space-y-3 mb-10 flex-1">
                  {resource.features.map((feature, fIndex) => (
                    <motion.li
                      key={fIndex}
                      initial={{ opacity: 0, x: -5 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + fIndex * 0.1 }}
                      className="flex items-center gap-3 text-white/70 text-sm font-medium"
                    >
                      <Check className="w-4 h-4 text-primary-teal" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
