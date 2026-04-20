import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Users, TrendingUp, AlertTriangle, FileWarning } from "lucide-react";
import { Card } from "../components/ui/Card";
import { StatCard } from "../components/ui/StatCard";
import { PageHeader } from "../components/ui/PageHeader";
import { PageTransition } from "../components/ui/PageTransition";
import type Worker from "../models/Worker"; 
import type { Pendencia, AlertaVencimento } from "../models/NovosRecursos";
import { listarColaboradores, listarPendenciasAbertas, listarAlertasVencimentos } from "../services/colaboradorService";

// interface SummaryRowProps {
//   label: string;
//   value: number;
//   variant: "primary" | "danger" | "neutral";
// }

// function SummaryRow({ label, value, variant }: SummaryRowProps) {
//   const styles = {
//     primary: "bg-primary-teal/10 border-primary-teal text-primary-teal",
//     danger: "bg-error-red/10 border-error-red text-error-red",
//     neutral: "bg-gray-100 border-metallic-silver text-metallic-silver",
//   };

//   return (
//     <div
//       className={`${styles[variant]} p-5 rounded-lg border-l-4 flex justify-between items-center transition-transform duration-300 hover:translate-x-1 cursor-default hover:shadow-sm`}
//     >
//       <span className="font-bold text-sm">{label}</span>
//       <p className="text-2xl font-bold text-corporate-slate">{value}</p>
//     </div>
//   );
// }

export function Dashboard() {
  const [colaboradores, setColaboradores] = useState<Worker[]>([]);
  const [pendencias, setPendencias] = useState<Pendencia[]>([]);
  const [alertas, setAlertas] = useState<AlertaVencimento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        const [dadosColab, dadosPendencias, dadosAlertas] = await Promise.all([
          listarColaboradores(),
          listarPendenciasAbertas().catch(() => []), // Falbacks para não quebrar a tela
          listarAlertasVencimentos().catch(() => [])
        ]);
        setColaboradores(dadosColab);
        setPendencias(dadosPendencias);
        setAlertas(dadosAlertas);
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
  // const colaboradoresAtivos = colaboradores.filter((c) => c.status === true).length;
  // const colaboradoresInativos = totalColaboradores - colaboradoresAtivos;


  // const cargosAtivos = Array.from(
  //   new Set(
  //     colaboradores
  //       .map(c => c.cargo?.nome) 
  //       .filter(Boolean)         
  //   )
  // ).length;

  // const usuariosDoSistema = colaboradores.filter((c) => {
  //   return typeof c.email === "string" && c.email !== "" && c.email.includes("@") && c.email.includes(".");
  // }).length;

  const novosEsteMes = 7;
  const taxaCrescimento = "5.2%";

  // const atividadesRecentes = [
  //   { id: 1, type: "novo", name: "Maria Silva", time: "Há 2 horas", color: "bg-success-green" },
  //   { id: 2, type: "cargo", name: "João Santos", time: "Há 4 horas", color: "bg-primary-teal" },
  //   { id: 3, type: "novo", name: "Pedro Costa", time: "Há 6 horas", color: "bg-success-green" },
  //   { id: 4, type: "sair", name: "Ana Oliveira", time: "Há 1 dia", color: "bg-error-red" },
  // ];

  // const getActivityLabel = (activity: typeof atividadesRecentes[number]) => {
  //   switch (activity.type) {
  //     case "novo":
  //       return `Novo colaborador: ${activity.name}`;
  //     case "cargo":
  //       return `Atualização de cargo: ${activity.name}`;
  //     case "sair":
  //       return `Desligamento: ${activity.name}`;
  //     default:
  //       return activity.name;
  //   }
  // };

  const getAlertColor = (dias: number) => {
    if (dias < 7) return "bg-error-red text-white";
    if (dias <= 15) return "bg-yellow-500 text-white";
    return "bg-primary-teal text-white";
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
            title="Alertas de Vencimento"
            value={alertas.length}
            subtext="Prazos críticos próximos"
            icon={AlertTriangle}
          />
          <StatCard
            title="Documentos Pendentes"
            value={pendencias.length}
            subtext="Checklists não finalizados"
            icon={FileWarning}
          />
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
          <Card className="h-full relative overflow-y-auto max-h-[400px]">
            <h3 className="font-bold text-lg text-corporate-slate mb-6 flex items-center gap-2">
              <AlertTriangle size={20} className="text-yellow-500" />
              Painel de Alertas
            </h3>
            {alertas.length === 0 ? (
              <p className="text-sm text-metallic-silver">Nenhum alerta crítico no momento.</p>
            ) : (
              <ul className="space-y-4">
                {alertas.map((alerta) => (
                  <li
                    key={alerta.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between border border-gray-100 p-3 rounded-xl hover:shadow-sm transition-shadow gap-2"
                  >
                    <div>
                      <p className="text-sm font-bold text-corporate-slate">
                        <Link to="/colaboradores" className="hover:text-primary-teal hover:underline">
                          {alerta.nome}
                        </Link>
                      </p>
                      <p className="text-xs text-metallic-silver mt-0.5">{alerta.tipoAlerta}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap text-center ${getAlertColor(alerta.diasRestantes)}`}>
                      {alerta.diasRestantes} dias restantes
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card className="h-full overflow-y-auto max-h-[400px]">
            <h3 className="font-bold text-lg text-corporate-slate mb-6 flex items-center gap-2">
              <FileWarning size={20} className="text-error-red" />
              Cobranças Pendentes
            </h3>
            {pendencias.length === 0 ? (
              <p className="text-sm text-metallic-silver">Todos os colaboradores estão com a documentação em dia.</p>
            ) : (
              <ul className="space-y-3">
                {pendencias.map((pend) => (
                  <li
                    key={pend.id}
                    className="flex items-start justify-between border-b border-gray-50 pb-3 last:border-0"
                  >
                    <div className="flex flex-col">
                      <p className="text-sm font-bold text-corporate-slate">
                        <Link to="/colaboradores" className="hover:text-primary-teal hover:underline">
                          {pend.colaboradorNome || `Colaborador #${pend.colaboradorId}`}
                        </Link>
                      </p>
                      <p className="text-xs text-error-red font-medium mt-0.5 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-error-red block"></span>
                        {pend.titulo}
                      </p>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-metallic-silver bg-gray-100 px-2 py-1 rounded">
                      Pendente
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}
