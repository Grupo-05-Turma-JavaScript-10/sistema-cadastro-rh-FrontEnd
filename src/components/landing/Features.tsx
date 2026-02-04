import { Users, Search, ShieldCheck } from "lucide-react";
import { Card } from "../ui/Card";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

export function Features() {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Interface Intuitiva",
      description:
        "Navegação fluida projetada para que qualquer pessoa gerencie a equipe sem treinamentos.",
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Agilidade na Busca",
      description:
        "Localize colaboradores ou documentos em milissegundos com nosso motor de busca.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Segurança de Dados",
      description:
        "Sua empresa em conformidade com a LGPD, garantindo privacidade e sigilo absoluto.",
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
      id="funcionalidades"
      className="bg-white py-24 px-4 md:px-8 overflow-hidden"
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-primary-teal font-bold uppercase tracking-widest text-sm">
            Diferenciais do Colab+
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-corporate-slate tracking-tight mt-3">
            Principais Funcionalidades
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="flex flex-col items-center text-center group hover:shadow-xl transition-all duration-500 p-8 rounded-[2rem] border-slate-50 h-full shadow-lg shadow-slate-200/50">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="w-20 h-20 rounded-2xl bg-primary-teal/10 text-primary-teal flex items-center justify-center mb-6 group-hover:bg-primary-teal group-hover:text-white transition-colors duration-300"
                >
                  {feature.icon}
                </motion.div>

                <h3 className="text-corporate-slate font-bold text-xl mb-3 leading-tight group-hover:text-primary-teal transition-colors">
                  {feature.title}
                </h3>
                <p className="text-metallic-silver font-medium text-sm leading-relaxed max-w-[240px]">
                  {feature.description}
                </p>

                <motion.div
                  className="mt-8 h-1 bg-slate-100 rounded-full"
                  initial={{ width: "2rem" }}
                  whileInView={{ width: "4rem" }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
