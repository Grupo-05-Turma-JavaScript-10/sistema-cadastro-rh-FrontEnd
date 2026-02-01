import { Pencil, Trash2, Building2Icon, UsersIcon } from "lucide-react";
import { Card } from "../ui/Card";
import { Badge, type BadgeVariant } from "../ui/Badge";
import { Button } from "../ui/Button"; 

export interface Position {
  id: number;
  title: string;
  level: string;
  dept: string;
  count: number;
  type: BadgeVariant;
}

interface PositionsTableProps {
  positions: Position[];
  onEdit?: (pos: Position) => void;
  onDelete?: (id: number) => void;
}

export function PositionsTable({ positions, onEdit, onDelete }: PositionsTableProps) {
  return (
    <div>
      <div className="md:hidden space-y-4">
        {positions.map((pos) => (
          <div key={pos.id} className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-bold text-corporate-slate block">{pos.title}</span>
                <span className="text-xs text-metallic-silver">{pos.dept}</span>
              </div>
              <Badge variant={pos.type}>{pos.level}</Badge>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-md">
              <UsersIcon size={16} className="text-metallic-silver" />
              <span>{pos.count} colaboradores</span>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-gray-50 mt-1">
              <Button 
                variant="ghost" 
                onClick={() => onEdit?.(pos)}
                className="flex-1 justify-center text-primary-teal hover:bg-primary-teal/10 hover:text-primary-teal"
              >
                <Pencil size={16} className="mr-2" /> Editar
              </Button>
              
              <Button 
                variant="ghost"
                onClick={() => onDelete?.(pos.id)}
                className="flex-1 justify-center text-error-red hover:bg-error-red/10 hover:text-error-red"
              >
                <Trash2 size={16} className="mr-2" /> Excluir
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* --- DESKTOP VIEW --- */}
      <div className="hidden md:block">
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-metallic-silver font-semibold">
                  <th className="p-4 pl-6">Nome do Cargo</th>
                  <th className="p-4">Nível</th>
                  <th className="p-4">Departamento</th>
                  <th className="p-4">Colaboradores</th>
                  <th className="p-4 text-right pr-6">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {positions.map((pos) => (
                  <tr key={pos.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="p-4 pl-6 font-medium text-corporate-slate">{pos.title}</td>
                    <td className="p-4"><Badge variant={pos.type}>{pos.level}</Badge></td>
                    <td className="p-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Building2Icon size={16} className="text-metallic-silver" />
                        {pos.dept}
                      </div>
                    </td>
                    <td className="p-4 text-gray-600 pl-8">
                      <div className="flex items-center gap-2">
                        <UsersIcon size={16} className="text-metallic-silver" />
                        {pos.count}
                      </div>
                    </td>
                    <td className="p-4 text-right pr-6">
                      <div className="flex items-center justify-end gap-2">
                        {/* Botões de Ícone Desktop */}
                        <Button 
                            variant="ghost"
                            onClick={() => onEdit?.(pos)}
                            className="p-2 h-auto w-auto text-primary-teal hover:bg-primary-teal/10 hover:text-primary-teal" 
                            title="Editar"
                        >
                          <Pencil size={18} />
                        </Button>
                        <Button 
                            variant="ghost"
                            onClick={() => onDelete?.(pos.id)}
                            className="p-2 h-auto w-auto text-error-red hover:bg-error-red/10 hover:text-error-red" 
                            title="Excluir"
                        >
                          <Trash2 size={18} />
                        </Button>
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