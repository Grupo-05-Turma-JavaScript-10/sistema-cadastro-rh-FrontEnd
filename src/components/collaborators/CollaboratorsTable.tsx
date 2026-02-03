import { PencilIcon, TrashIcon, Calculator } from "lucide-react"; 
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import type Worker from "../../models/Worker";

interface CollaboratorsTableProps {
  workers: Worker[];
  onEdit?: (worker: Worker) => void;
  onDelete?: (worker: Worker) => void;
  onCalculate?: (worker: Worker) => void;
}

export default function CollaboratorsTable({ workers, onEdit, onDelete, onCalculate }: CollaboratorsTableProps) {
  
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

  const getDepartment = (role: string) => {
    if (role.includes("Projetos") || role.includes("Desenvolvedor")) return "TI";
    if (role.includes("Designer")) return "Design";
    if (role.includes("RH")) return "RH";
    return "Administrativo";
  };

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
              <Badge variant={worker.status ? "success" : "danger"}>
                {worker.status ? "Ativo" : "Inativo"}
              </Badge>
            </div>

            <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded-md space-y-1">
              <p><span className="font-semibold">Dept:</span> {getDepartment(worker.cargo?.nome || "")}</p>
              <p><span className="font-semibold">Admissão:</span> {formatDate(worker.data_admissão)}</p>
              <p><span className="font-semibold">Salário:</span> {formatCurrency(worker.salario)}</p>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-gray-50 mt-1">
              <button
                onClick={() => onEdit?.(worker)}
                className="flex-1 flex items-center justify-center gap-2 p-2 text-primary-teal hover:bg-primary-teal/10 rounded-md transition-colors text-sm font-medium"
              >
                <PencilIcon size={16} /> Editar
              </button>
              <button
                onClick={() => onCalculate?.(worker)}
                className="flex-1 flex items-center justify-center gap-2 p-2 text-primary-teal hover:bg-primary-teal/10 rounded-md transition-colors text-sm font-medium"
              >
                <Calculator size={16} /> Calcular
              </button>
              <button
                onClick={() => onDelete?.(worker)}
                className="flex-1 flex items-center justify-center gap-2 p-2 text-error-red hover:bg-error-red/10 rounded-md transition-colors text-sm font-medium"
              >
                <TrashIcon size={16} /> Excluir
              </button>
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
                  <th className="p-4">Departamento</th>
                  <th className="p-4">Data de Admissão</th>
                  <th className="p-4">Salário</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right pr-6">Ações</th>
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
                      {getDepartment(worker.cargo?.nome || "")}
                    </td>

                    <td className="p-4 text-gray-600">
                      {formatDate(worker.data_admissão)}
                    </td>
                    <td className="p-4 text-gray-600">
                      {formatCurrency(worker.salario)}
                    </td>

                    <td className="p-4">
                      <Badge variant={worker.status ? "success" : "danger"}>
                        {worker.status ? "Ativo" : "Inativo"}
                      </Badge>
                    </td>

                    <td className="p-4 text-right pr-6">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onEdit?.(worker)}
                          className="p-2 text-primary-teal hover:bg-primary-teal/10 rounded-md transition-colors"
                          title="Editar"
                        >
                          <PencilIcon size={18} />
                        </button>
                        <button
                          onClick={() => onCalculate?.(worker)}
                          className="p-2 text-primary-teal hover:bg-primary-teal/10 rounded-md transition-colors"
                          title="Calcular Salário"
                        >
                          <Calculator size={18} />
                        </button>
                        <button
                          onClick={() => onDelete?.(worker)}
                          className="p-2 text-error-red hover:bg-error-red/10 rounded-md transition-colors"
                          title="Excluir"
                        >
                          <TrashIcon size={18} />
                        </button>
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
