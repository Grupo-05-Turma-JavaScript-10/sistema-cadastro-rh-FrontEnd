import {
  Pencil,
  Trash2,
  MailIcon,
  ShieldIcon,
} from "lucide-react";
import { Badge, type BadgeVariant } from "../ui/Badge";
import { Card } from "../ui/Card";
import type Worker from "../../models/Worker";
import { Button } from "../ui/Button";

interface UsersTableProps {
  workers: Worker[];
  onEdit?: (worker: Worker) => void;
  onDelete?: (workerId: number) => void;
}

function UsersTable({ workers, onEdit, onDelete }: UsersTableProps) {
  const getUserRole = (worker: Worker): {
    label: string;
    variant: BadgeVariant;
  } => {
    if (!worker.usuario) {
      return {
        label: "Visualizador",
        variant: "neutral",
      };
    }

    return {
      label: "Administrador",
      variant: "brand",
    };
  };

  return (
    <div>
      <div className="md:hidden space-y-4">
        {workers.map((worker) => {
          const role = getUserRole(worker);

          return (
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
                    {worker.email}
                  </span>
                </div>

                <Badge variant={role.variant}>{role.label}</Badge>
              </div>

              <div className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded-md">
                <ShieldIcon size={16} className="text-metallic-silver" />

                <Badge variant={worker.status ? "success" : "neutral"}>
                  {worker.status ? "Ativo" : "Inativo"}
                </Badge>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-gray-50 mt-1">
                <Button
                  variant="ghost"
                  onClick={() => onEdit?.(worker)}
                  className="flex-1 justify-center text-primary-teal hover:bg-primary-teal/10 hover:text-primary-teal"
                >
                  <Pencil size={16} className="mr-2" /> Editar
                </Button>
                
                <Button
                  variant="ghost"
                  onClick={() => onDelete?.(worker.id)}
                  className="flex-1 justify-center text-error-red hover:bg-error-red/10 hover:text-error-red"
                >
                  <Trash2 size={16} className="mr-2" /> Excluir
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="hidden md:block">
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-metallic-silver font-semibold">
                  <th className="p-4 pl-6">Nome</th>
                  <th className="p-4">E-mail</th>
                  <th className="p-4">Perfil</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right pr-6">Ações</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {workers.map((worker) => {
                  const role = getUserRole(worker);

                  return (
                    <tr
                      key={worker.id}
                      className="hover:bg-gray-50/50 transition-colors group"
                    >
                      <td className="p-4 pl-6 font-medium text-corporate-slate">
                        {worker.nome}
                      </td>

                      <td className="p-4 text-gray-600">
                        <div className="flex items-center gap-2">
                          <MailIcon size={16} className="text-metallic-silver" />
                          {worker.email}
                        </div>
                      </td>

                      <td className="p-4">
                        <Badge variant={role.variant}>{role.label}</Badge>
                      </td>

                      <td className="p-4">
                        <Badge variant={worker.status ? "success" : "neutral"}>
                          {worker.status ? "Ativo" : "Inativo"}
                        </Badge>
                      </td>

                      <td className="p-4 text-right pr-6">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            onClick={() => onEdit?.(worker)}
                            className="p-2 h-auto w-auto text-primary-teal hover:bg-primary-teal/10 hover:text-primary-teal"
                            title="Editar"
                          >
                            <Pencil size={18} />
                          </Button>
                          
                          <Button
                            variant="ghost"
                            onClick={() => onDelete?.(worker.id)}
                            className="p-2 h-auto w-auto text-error-red hover:bg-error-red/10 hover:text-error-red"
                            title="Excluir"
                          >
                            <Trash2 size={18} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default UsersTable;
