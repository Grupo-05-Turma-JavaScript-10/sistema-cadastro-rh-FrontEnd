import { PencilIcon, TrashIcon, Calculator, MoreVertical } from "lucide-react"; 
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import type Worker from "../../models/Worker";
import { useState } from "react";

interface CollaboratorsTableProps {
  workers: Worker[];
  onEdit?: (worker: Worker) => void;
  onDelete?: (worker: Worker) => void;
  onCalculate?: (worker: Worker) => void;
}

export default function CollaboratorsTable({ workers, onEdit, onDelete, onCalculate }: CollaboratorsTableProps) {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  
  const formatDate = (date: Date | string) => {
    if (!date) return "-";
    const d = new Date(date);
    return new Intl.DateTimeFormat('pt-BR').format(d);
  };
  const toNumber = (value: unknown) => {
    const n = typeof value === "number" ? value : Number(value);
    return Number.isFinite(n) ? n : 0;
  };
  const formatCurrency = (value: unknown) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(toNumber(value));

  // departamento e data de admissão removidos da listagem

  return (
    <div>
      <div className="md:hidden space-y-4">
        {workers.map((worker) => (
          <div
            key={worker.id}
            className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex flex-col gap-3"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="font-bold text-corporate-slate block">
                  {worker.nome}
                </span>
                <span className="text-xs text-metallic-silver">
                  {worker.cargo?.nome || "Sem cargo"}
                </span>
              </div>
              <Badge variant={worker.status ? "success" : "neutral"}>
                {worker.status ? "Ativo" : "Inativo"}
              </Badge>
            </div>

            <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded-md space-y-1">
              <p><span className="font-semibold">Salário:</span> {formatCurrency(worker.salario)}</p>
            </div>

            <div className="pt-2 border-t border-gray-50 mt-1">
              <div className="relative flex items-center justify-center">
                <button
                  onClick={() => setOpenMenuId(openMenuId === worker.id ? null : worker.id)}
                  className="p-2 rounded-md hover:bg-gray-100 transition-colors text-corporate-slate"
                  aria-label="Ações"
                >
                  <MoreVertical size={18} />
                </button>
                {openMenuId === worker.id && (
                  <div className="absolute z-10 top-full mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md">
                    <button
                      onClick={() => { setOpenMenuId(null); onEdit?.(worker); }}
                      className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-sm text-corporate-slate"
                    >
                      <PencilIcon size={16} /> Editar
                    </button>
                    <button
                      onClick={() => { setOpenMenuId(null); onCalculate?.(worker); }}
                      className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-sm text-corporate-slate"
                    >
                      <Calculator size={16} /> Calcular
                    </button>
                    <button
                      onClick={() => { setOpenMenuId(null); onDelete?.(worker); }}
                      className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-sm text-error-red"
                    >
                      <TrashIcon size={16} /> Excluir
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:block">
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-metallic-silver font-semibold">
                  <th className="p-4 pl-6">Nome</th>
                  <th className="p-4">Cargo</th>
                  <th className="p-4">Salário</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Ações</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {workers.map((worker) => (
                  <tr
                    key={worker.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="p-4 pl-6 font-medium text-corporate-slate">
                      {worker.nome}
                    </td>

                    <td className="p-4 text-gray-600">
                      {worker.cargo?.nome || "-"}
                    </td>

                    <td className="p-4 text-gray-600">
                      {formatCurrency(worker.salario)}
                    </td>
                    <td className="p-4">
                      <Badge variant={worker.status ? "success" : "neutral"}>
                        {worker.status ? "Ativo" : "Inativo"}
                      </Badge>
                    </td>

                    <td className="p-4 text-center">
                      <div className="relative inline-flex items-center justify-center">
                        <button
                          onClick={() => setOpenMenuId(openMenuId === worker.id ? null : worker.id)}
                          className="p-2 rounded-md hover:bg-gray-100 transition-colors text-corporate-slate"
                          title="Ações"
                        >
                          <MoreVertical size={18} />
                        </button>
                        {openMenuId === worker.id && (
                          <div className="absolute z-10 top-full mt-2 right-0 w-44 bg-white border border-gray-200 rounded-md shadow-md">
                            <button
                              onClick={() => { setOpenMenuId(null); onEdit?.(worker); }}
                              className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-sm text-corporate-slate"
                            >
                              <PencilIcon size={16} /> Editar
                            </button>
                            <button
                              onClick={() => { setOpenMenuId(null); onCalculate?.(worker); }}
                              className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-sm text-corporate-slate"
                            >
                              <Calculator size={16} /> Calcular
                            </button>
                            <button
                              onClick={() => { setOpenMenuId(null); onDelete?.(worker); }}
                              className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-sm text-error-red"
                            >
                              <TrashIcon size={16} /> Excluir
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
