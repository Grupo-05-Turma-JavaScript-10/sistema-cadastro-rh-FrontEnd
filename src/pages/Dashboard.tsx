import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Users, Briefcase, UserPlus, TrendingUp } from "lucide-react";
import { Card } from "../components/ui/Card";
import { StatCard } from "../components/ui/StatCard";
import { PageHeader } from "../components/ui/PageHeader";
import { PageTransition } from "../components/ui/PageTransition";
import type Worker from "../models/Worker";
import { listarColaboradores } from "../services/colaboradorService";

interface SummaryRowProps {
  label: string;
  value: number;
  variant: "primary" | "danger" | "neutral";
}

function SummaryRow({ label, value, variant }: SummaryRowProps) {
  const styles = {
    primary: "bg-primary-teal/10 border-primary-teal text-primary-teal",
    danger: "bg-error-red/10 border-error-red text-error-red",
    neutral: "bg-gray-100 border-metallic-silver text-metallic-silver",
  };

  return (
    <div
      className={`${styles[variant]} p-5 rounded-lg border-l-4 flex justify-between items-center transition-transform duration-300 hover:translate-x-1 cursor-default hover:shadow-sm`}
    >
      <span className="font-bold text-sm">{label}</span>
      <p className="text-2xl font-bold text-corporate-slate">{value}</p>
    </div>
  );
}

export function Dashboard() {
  const [colaboradores, setColaboradores] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        const dados = await listarColaboradores();
        setColaboradores(dados);
      } catch (erro: any) {
        console.error("Erro ao carregar dashboard:", erro);
        toast.error("Falha ao carregar dados do dashboard.");
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

  const totalColaboradores = colaboradores.length;
  const colaboradoresAtivos = colaboradores.filter((c) => c.status === true).length;
  const colaboradoresInativos = totalColaboradores - colaboradoresAtivos;

  const cargosAtivos = colaboradores.filter(c => c.cargo != null).length;

  const usuariosDoSistema = colaboradores.filter((c) => {
    return typeof c.email === "string" && c.email !== "" && c.email.includes("@") && c.email.includes(".");
  }).length;

  const novosEsteMes = 5;
  const taxaCrescimento = "5.2%";

  const atividadesRecentes = [
    { id: 1, type: "novo", name: "Maria Silva", time: "Há 2 horas", color: "bg-success-green" },
    { id: 2, type: "cargo", name: "João Santos", time: "Há 4 horas", color: "bg-primary-teal" },
    { id: 3, type: "novo", name: "Pedro Costa", time: "Há 6 horas", color: "bg-success-green" },
    { id: 4, type: "sair", name: "Ana Oliveira", time: "Há 1 dia", color: "bg-error-red" },
  ];

  const getActivityLabel = (activity: typeof atividadesRecentes[number]) => {
    switch (activity.type) {
      case "novo":
        return `Novo colaborador: ${activity.name}`;
      case "cargo":
        return `Atualização de cargo: ${activity.name}`;
      case "sair":
        return `Desligamento: ${activity.name}`;
      default:
        return activity.name;
    }
  };

  if (loading) {
    return (
      <PageTransition>
        <div className="space-y-6">
          <PageHeader title="Bem-vindo ao Dashboard" subtitle="Visão geral da gestão de RH" />
          <div className="flex justify-center items-center h-[50vh]">
            <p className="text-lg text-metallic-silver animate-pulse">Carregando dados...</p>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        <PageHeader
          title="Bem-vindo ao Dashboard"
          subtitle="Visão geral da gestão de RH"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total de Colaboradores"
            value={totalColaboradores}
            subtext={`+${novosEsteMes} este mês`}
            icon={Users}
          />
          <StatCard
            title="Cargos Ativos"
            value={cargosAtivos}
            subtext="+2 este mês"
            icon={Briefcase}
          />

          <div className="relative">
            <StatCard
              title="Novos este Mês"
              value={novosEsteMes}
              subtext={`+${novosEsteMes}% vs mês anterior`}
              icon={UserPlus}
            />
            <span className="absolute top-3 right-3 px-2 py-0.5 bg-primary-teal/20 text-primary-teal font-semibold text-xs rounded-full shadow-sm">
              Em breve
            </span>
          </div>

          <div className="relative">
            <StatCard
              title="Taxa de Crescimento"
              value={taxaCrescimento}
              subtext="Tendência positiva"
              icon={TrendingUp}
            />
            <span className="absolute top-3 right-3 px-2 py-0.5 bg-primary-teal/20 text-primary-teal font-semibold text-xs rounded-full shadow-sm">
              Em breve
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="h-full relative">
            <div className="absolute top-4 right-4">
              <span className="px-2 py-0.5 bg-primary-teal/20 text-primary-teal font-semibold text-xs rounded-full shadow-sm">
                Em breve
              </span>
            </div>
            <h3 className="font-bold text-lg text-corporate-slate mb-6">Atividades Recentes</h3>
            <ul className="space-y-6">
              {atividadesRecentes.map((activity) => (
                <li
                  key={activity.id}
                  className="flex items-start justify-between border-b border-gray-50 pb-2 last:border-0"
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-1.5 w-2 h-2 rounded-full ${activity.color} shadow-sm`} />
                    <div>
                      <p className="text-sm font-bold text-corporate-slate">
                        {getActivityLabel(activity)}
                      </p>
                      <p className="text-xs text-metallic-silver mt-0.5">{activity.name}</p>
                    </div>
                  </div>
                  <span className="text-xs text-metallic-silver font-medium">{activity.time}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="h-full">
            <h3 className="font-bold text-lg text-corporate-slate mb-6">Resumo Rápido</h3>
            <div className="space-y-4">
              <SummaryRow
                label="Colaboradores Ativos"
                value={colaboradoresAtivos}
                variant="primary"
              />
              <SummaryRow
                label="Colaboradores Inativos"
                value={colaboradoresInativos}
                variant="danger"
              />
              <SummaryRow
                label="Usuários do Sistema"
                value={usuariosDoSistema}
                variant="neutral"
              />
            </div>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}
