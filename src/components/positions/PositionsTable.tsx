import { Pencil, Trash2, UsersIcon, MoreVertical } from "lucide-react";
import { Card } from "../ui/Card";
import type { BadgeVariant } from "../ui/Badge";
import { Button } from "../ui/Button"; 
import { useState } from "react";

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
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  return (
    <div>
      <div className="md:hidden space-y-4">
        {positions.map((pos) => (
          <div key={pos.id} className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-bold text-corporate-slate block">{pos.title}</span>
                {/* departamento removido */}
              </div>
              {/* nível removido */}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-md">
              <UsersIcon size={16} className="text-metallic-silver" />
              <span>{pos.count} colaboradores</span>
            </div>

            <div className="pt-2 border-t border-gray-50 mt-1">
              <div className="relative flex items-center justify-center">
                <button
                  onClick={() => setOpenMenuId(openMenuId === pos.id ? null : pos.id)}
                  className="p-2 rounded-md hover:bg-gray-100 transition-colors text-corporate-slate"
                  aria-label="Ações"
                >
                  <MoreVertical size={18} />
                </button>
                {openMenuId === pos.id && (
                  <div className="absolute z-10 top-full mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md">
                    <button
                      onClick={() => { setOpenMenuId(null); onEdit?.(pos); }}
                      className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-sm text-corporate-slate"
                    >
                      <Pencil size={16} /> Editar
                    </button>
                    <button
                      onClick={() => { setOpenMenuId(null); onDelete?.(pos.id); }}
                      className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-sm text-error-red"
                    >
                      <Trash2 size={16} /> Excluir
                    </button>
                  </div>
                )}
              </div>
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
                  <th className="p-4">Colaboradores</th>
                  <th className="p-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {positions.map((pos) => (
                  <tr key={pos.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="p-4 pl-6 font-medium text-corporate-slate">{pos.title}</td>
                    <td className="p-4 text-gray-600 pl-8">
                      <div className="flex items-center gap-2">
                        <UsersIcon size={16} className="text-metallic-silver" />
                        {pos.count}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="relative inline-flex items-center justify-center">
                        <button
                          onClick={() => setOpenMenuId(openMenuId === pos.id ? null : pos.id)}
                          className="p-2 rounded-md hover:bg-gray-100 transition-colors text-corporate-slate"
                          title="Ações"
                        >
                          <MoreVertical size={18} />
                        </button>
                        {openMenuId === pos.id && (
                          <div className="absolute z-10 top-full mt-2 right-0 w-40 bg-white border border-gray-200 rounded-md shadow-md">
                            <button
                              onClick={() => { setOpenMenuId(null); onEdit?.(pos); }}
                              className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-sm text-corporate-slate"
                            >
                              <Pencil size={16} /> Editar
                            </button>
                            <button
                              onClick={() => { setOpenMenuId(null); onDelete?.(pos.id); }}
                              className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-sm text-error-red"
                            >
                              <Trash2 size={16} /> Excluir
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
