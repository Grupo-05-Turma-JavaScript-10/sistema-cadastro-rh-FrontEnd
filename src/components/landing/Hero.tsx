import { Button } from "../ui/Button";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

export function Hero() {
  const dots = Array.from({ length: 200 });
  const dashboardImgUrl =
    "https://ik.imagekit.io/k6kki72wv/Captura%20de%20tela%202026-02-03%20151852.png";

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  };

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center py-32 lg:py-48 bg-linear-to-br from-corporate-slate via-[#1a2e35] to-[#0f1a1e]">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {dots.map((_, i) => {
          const size = Math.random() * 5 + 1;
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
                opacity: Math.random() * 0.4 + 0.1,
              }}
            />
          );
        })}
      </div>

      <div className="container mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 text-left"
        >
          <motion.h1
            variants={itemVariants}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6"
          >
            Centralize e <br />
            <span className="text-white">Simplifique a Gestão</span> <br />
            do seu RH com o <br />
            <span className="inline-flex items-center">
              Colab<span className="text-primary-teal">+</span>
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-white text-base md:text-lg font-medium max-w-xl mb-10 leading-relaxed opacity-90"
          >
            Sistema desenvolvido para organizar as informações dos
            colaboradores, estruturar cargos e controlar acessos em um só lugar.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/cadastro">
              <Button className="w-full sm:w-auto px-10 py-4 text-lg rounded-xl shadow-lg shadow-primary-teal/20 transition-transform hover:scale-105 active:scale-95">
                Começar Agora
              </Button>
            </Link>

            <Link to="/cadastro">
              <Button
                variant="outline"
                className="w-full sm:w-auto px-10 py-4 text-lg rounded-xl border-white/20 text-white backdrop-blur-md hover:bg-white/10 transition-all"
              >
                Ver Demo
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="flex-1 w-full relative"
          style={{ perspective: "1200px" }}
        >
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative group cursor-pointer"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-2 md:p-3 shadow-2xl relative overflow-hidden transition-colors duration-500 group-hover:border-white/20">
              <img
                src={dashboardImgUrl}
                alt="Dashboard Colab+"
                className="w-full h-auto rounded-[2rem] shadow-2xl"
                style={{ transform: "translateZ(50px)" }}
              />
              <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />
            </div>

            <motion.div
              animate={{
                rotate: 45,
                scale: [1, 1.1, 1],
                y: [0, -10, 0],
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 bg-primary-teal w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl z-20"
              style={{ transform: "translateZ(80px) rotate(45deg)" }}
            >
              <div className="w-6 h-6 border-4 border-white rounded-xs" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] z-50">
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary-teal to-transparent opacity-100" />
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary-teal to-transparent blur-[3px] opacity-60" />
      </div>
    </section>
  );
}
