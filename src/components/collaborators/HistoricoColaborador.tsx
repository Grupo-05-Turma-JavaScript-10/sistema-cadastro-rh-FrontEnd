import { useEffect, useState } from "react";
import type Worker from "../../models/Worker";
import type { HistoricoSalarial } from "../../models/NovosRecursos";
import { listarHistoricoColaborador } from "../../services/colaboradorService";
import { History, TrendingUp, RefreshCw, Briefcase } from "lucide-react";
import { toast } from "react-toastify";

interface Props {
  colaborador: Worker;
}

export function HistoricoColaborador({ colaborador }: Props) {
  const [historico, setHistorico] = useState<HistoricoSalarial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchHistorico() {
      setIsLoading(true);
      try {
        const data = await listarHistoricoColaborador(colaborador.id);
        setHistorico(data);
      } catch (error) {
        console.error("Erro ao buscar histórico", error);
        toast.error("Não foi possível carregar o histórico do colaborador.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchHistorico();
  }, [colaborador.id]);

  function formatBRL(value: string | number) {
    const num = typeof value === "string" ? parseFloat(value) : value;
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(num || 0);
  }

  function getMotivoIcon(motivo: string) {
    const m = motivo.toLowerCase();
    if (m.includes("promoção")) return <TrendingUp size={16} className="text-green-500" />;
    if (m.includes("cargo")) return <Briefcase size={16} className="text-blue-500" />;
    return <RefreshCw size={16} className="text-primary-teal" />;
  }

  if (isLoading) {
    return <div className="p-4 text-center text-metallic-silver">Carregando histórico...</div>;
  }

  return (
    <div className="space-y-4 mt-4">
      <div className="flex items-center gap-2 mb-6">
        <History size={18} className="text-primary-teal" />
        <h4 className="text-sm font-bold text-corporate-slate">
          Histórico de Cargos e Salários
        </h4>
      </div>

      {historico.length === 0 ? (
        <div className="bg-gray-50 border border-dashed border-gray-200 rounded-xl p-8 text-center flex flex-col items-center justify-center">
          <History size={32} className="text-gray-300 mb-2" />
          <p className="text-metallic-silver text-sm">
            Nenhum histórico registrado para este colaborador.
          </p>
        </div>
      ) : (
        <div className="relative border-l-2 border-gray-100 ml-3 space-y-8 pb-4">
          {historico.map((item) => (
            <div key={item.id} className="relative pl-6">
              <div className="absolute -left-[9px] top-1 bg-white border-2 border-primary-teal w-4 h-4 rounded-full" />
              
              <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    {getMotivoIcon(item.motivo)}
                    <span className="font-bold text-corporate-slate text-sm">
                      {item.motivo}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-metallic-silver bg-gray-50 px-2 py-1 rounded-md">
                    {new Date(item.dataAlteracao).toLocaleDateString("pt-BR")}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="block text-[10px] uppercase font-bold text-metallic-silver mb-1">
                      Cargo
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 line-through text-xs">
                        {item.cargoAnterior?.nome || "-"}
                      </span>
                      <span className="text-gray-400">→</span>
                      <span className="font-medium text-corporate-slate">
                        {item.cargoNovo?.nome || "-"}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="block text-[10px] uppercase font-bold text-metallic-silver mb-1">
                      Salário
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 line-through text-xs">
                        {formatBRL(item.salarioAnterior)}
                      </span>
                      <span className="text-gray-400">→</span>
                      <span className="font-medium text-corporate-slate">
                        {formatBRL(item.salarioNovo)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}