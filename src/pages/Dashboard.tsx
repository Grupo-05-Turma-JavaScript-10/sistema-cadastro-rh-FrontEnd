import { Users, Briefcase, UserPlus, TrendingUp } from "lucide-react";
import { Card } from "../components/ui/Card";
import { StatCard } from "../components/dashboard/StatCard";

export function Dashboard() {
  

  const dashboardData = {
    stats: {
      total: 247,
      ativos: 32,
      novos: 12,
      crescimento: "5.2%"
    },
    activities: [
      { id: 1, type: 'novo', name: 'Maria Silva', time: 'Há 2 horas', color: 'bg-success-green' },
      { id: 2, type: 'cargo', name: 'João Santos', time: 'Há 4 horas', color: 'bg-primary-teal' },
      { id: 3, type: 'novo', name: 'Pedro Costa', time: 'Há 6 horas', color: 'bg-success-green' },
      { id: 4, type: 'sair', name: 'Ana Oliveira', time: 'Há 1 dia', color: 'bg-error-red' },
    ]
  };

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-corporate-slate mb-2">Bem-vindo ao Dashboard</h1>
      <p className="text-metallic-silver mb-8">Visão geral da gestão de RH</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total de Colaboradores" 
          value={dashboardData.stats.total} 
          subtext="+12 este mês" 
          icon={Users} 
        />
        <StatCard 
          title="Cargos Ativos" 
          value={dashboardData.stats.ativos} 
          subtext="+3 este mês" 
          icon={Briefcase} 
        />
        <StatCard 
          title="Novos este Mês" 
          value={dashboardData.stats.novos} 
          subtext="+5% vs mês anterior" 
          icon={UserPlus} 
        />
        <StatCard 
          title="Taxa de Crescimento" 
          value={dashboardData.stats.crescimento} 
          subtext="Tendência positiva" 
          icon={TrendingUp} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <Card className="h-full">
          <h3 className="font-bold text-lg text-corporate-slate mb-6">Atividades Recentes</h3>
          
          <ul className="space-y-6">
            {dashboardData.activities.map((activity) => (
              <li key={activity.id} className="flex items-start justify-between border-b border-gray-50 pb-2">
                <div className="flex items-start gap-3">
                  {/* Cor dinâmica vinda dos dados */}
                  <div className={`mt-1.5 w-2 h-2 rounded-full ${activity.color} shadow-sm`}></div>
                  <div>
                    <p className="text-sm font-bold text-corporate-slate">
                      {activity.type === 'novo' ? 'Novo colaborador' : 
                       activity.type === 'cargo' ? 'Atualização de cargo' : 'Desligamento'}
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
            
            <div className="bg-primary-teal/10 p-5 rounded-lg border-l-4 border-primary-teal flex justify-between items-center">
              <span className="text-primary-teal font-bold text-sm">Colaboradores Ativos</span>
              <p className="text-2xl font-bold text-corporate-slate">235</p>
            </div>

            <div className="bg-error-red/10 p-5 rounded-lg border-l-4 border-error-red flex justify-between items-center">
              <span className="text-error-red font-bold text-sm">Colaboradores Inativos</span>
              <p className="text-2xl font-bold text-corporate-slate">12</p>
            </div>

             <div className="bg-gray-100 p-5 rounded-lg border-l-4 border-metallic-silver flex justify-between items-center">
              <span className="text-metallic-silver font-bold text-sm">Usuários do Sistema</span>
              <p className="text-2xl font-bold text-corporate-slate">8</p>
            </div>

          </div>
        </Card>

      </div>
    </div>
  );
}