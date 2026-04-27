import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Users, TrendingUp, AlertTriangle, FileWarning, DollarSign, PieChart } from "lucide-react";
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
          listarColaboradores().catch((e) => {
            if (e.response?.status === 401 || e.response?.status === 403) throw e;
            return [];
          }),
          listarPendenciasAbertas().catch((e) => {
            if (e.response?.status === 401 || e.response?.status === 403) throw e;
            return [];
          }),
          listarAlertasVencimentos().catch((e) => {
            if (e.response?.status === 401 || e.response?.status === 403) throw e;
            return [];
          })
        ]);
        setColaboradores(dadosColab);
        setPendencias(dadosPendencias);
        setAlertas(dadosAlertas);
      } catch (erro: unknown) {
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

  const ativos = colaboradores.filter(c => c.status);
  
  // Resumo Financeiro Estimado
  const custoTotalFolha = ativos.reduce((acc, c) => {
    const sal = (c.salario && !isNaN(Number(c.salario))) ? Number(c.salario) : 0;
    const enc = (c.encargosMensais && !isNaN(Number(c.encargosMensais))) ? Number(c.encargosMensais) : 0;
    return acc + sal + enc;
  }, 0);
  
  const mediaSalarial = ativos.length > 0 
    ? (ativos.reduce((acc, c) => {
        const sal = (c.salario && !isNaN(Number(c.salario))) ? Number(c.salario) : 0;
        return acc + sal;
      }, 0) / ativos.length) 
    : 0;

  const formatCurrency = (val: number) => {
    let num = Number(val);
    if (isNaN(num) || !isFinite(num)) {
      num = 0;
    }
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(num);
  }

  // Distribuição de Contratos
  const contagemCLT = ativos.filter(c => c.tipoContrato === 'CLT').length;
  const contagemPJ = ativos.filter(c => c.tipoContrato === 'PJ').length;
  const contagemEstagio = ativos.filter(c => c.tipoContrato === 'ESTAGIO').length;
  
  const pct = (val: number) => {
    if (!ativos || ativos.length === 0) return 0;
    const result = Math.round((val / ativos.length) * 100);
    return (Number.isNaN(result) || !Number.isFinite(result)) ? 0 : result;
  };

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
                {pendencias.map((pend) => {
                  const nomeColab = pend.colaboradorNome || pend.colaborador?.nome || "Colaborador Indefinido";
                  const idColab = pend.colaboradorId || pend.colaborador?.id || "N/A";
                  
                  return (
                  <li
                    key={pend.id}
                    className="flex items-start justify-between border-b border-gray-50 pb-3 last:border-0"
                  >
                    <div className="flex flex-col">
                      <p className="text-sm font-bold text-corporate-slate">
                        <Link to="/colaboradores" className="hover:text-primary-teal hover:underline">
                          {nomeColab !== "Colaborador Indefinido" ? nomeColab : `Colaborador #${idColab}`}
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
                )})}
              </ul>
            )}
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card className="h-full">
            <h3 className="font-bold text-lg text-corporate-slate mb-6 flex items-center gap-2">
              <DollarSign size={20} className="text-success-green" />
              Resumo Financeiro (Ativos)
            </h3>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-sm text-metallic-silver font-medium mb-1">Custo Estimado da Folha</p>
                <p className="text-2xl font-black text-corporate-slate">{formatCurrency(custoTotalFolha)}</p>
                <p className="text-xs text-metallic-silver mt-1">Salário base + encargos mensais</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                 <div className="p-4 rounded-xl border border-gray-100">
                    <p className="text-xs text-metallic-silver font-medium mb-1">Média Salarial</p>
                    <p className="text-lg font-bold text-corporate-slate">{formatCurrency(mediaSalarial)}</p>
                 </div>
              </div>
            </div>
          </Card>

          <Card className="h-full">
            <h3 className="font-bold text-lg text-corporate-slate mb-6 flex items-center gap-2">
              <PieChart size={20} className="text-primary-teal" />
              Distribuição de Contratos
            </h3>
            
            <div className="space-y-5">
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-corporate-slate">CLT ({contagemCLT})</span>
                  <span className="text-xs font-bold text-metallic-silver">{pct(contagemCLT)}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-primary-teal h-2.5 rounded-full" style={{ width: `${pct(contagemCLT)}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-corporate-slate">PJ ({contagemPJ})</span>
                  <span className="text-xs font-bold text-metallic-silver">{pct(contagemPJ)}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: `${pct(contagemPJ)}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-corporate-slate">Estágio ({contagemEstagio})</span>
                  <span className="text-xs font-bold text-metallic-silver">{pct(contagemEstagio)}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: `${pct(contagemEstagio)}%` }}></div>
                </div>
              </div>

            </div>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}
