import { Card } from "../ui/Card";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

export function Solutions() {
  const steps = [
    {
      n: "01",
      t: "Informações Estruturadas",
      d: "Transforme dados brutos em inteligência. O Colab+ organiza o histórico completo de cada colaborador em uma interface limpa.",
      f: [
        "Dossiê digital unificado",
        "Gestão de documentos",
        "Histórico de evolução",
      ],
    },
    {
      n: "02",
      t: "Arquitetura Organizacional",
      d: "Visualize e projete o crescimento da sua empresa através de uma estruturação de cargos sólida e funcional.",
      f: [
        "Mapeamento de hierarquia",
        "Padronização de funções",
        "Planejamento de escala",
      ],
    },
    {
      n: "03",
      t: "Governança e Segurança",
      d: "Proteja o ativo mais valioso da sua empresa. Controle acessos com precisão e mantenha total conformidade.",
      f: [
        "Auditoria de alterações",
        "Privacidade por nível",
        "Segurança de dados sensíveis",
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      id="solucoes"
      className="py-24 bg-background-light overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-primary-teal font-bold uppercase tracking-widest text-sm">
            Metodologia Colab+
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-corporate-slate tracking-tight mt-3">
            Nossas Soluções
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-3 gap-8"
        >
          {steps.map((s, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card className="p-10 bg-surface-white border-none shadow-xl shadow-slate-200/50 rounded-[2.5rem] hover:shadow-2xl transition-all duration-500 flex flex-col h-full group">
                <div className="flex items-center justify-between mb-8">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-14 h-14 bg-primary-teal rounded-2xl flex items-center justify-center shadow-lg shadow-primary-teal/30"
                  >
                    <span className="text-white font-bold text-xl">{s.n}</span>
                  </motion.div>
                </div>

                <h3 className="text-2xl font-bold text-corporate-slate mb-4 leading-tight group-hover:text-primary-teal transition-colors">
                  {s.t}
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                  {s.d}
                </p>

                <ul className="space-y-4 mt-auto">
                  {s.f.map((feat, fi) => (
                    <motion.li
                      key={fi}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + fi * 0.1 }}
                      className="flex items-center gap-3 text-slate-600 text-sm font-semibold"
                    >
                      <div className="bg-success-green/10 p-1 rounded-full">
                        <Check className="w-3 h-3 text-success-green" />
                      </div>
                      {feat}
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
