import { Plus, Pencil, Trash2, Building2Icon, UsersIcon } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Badge, type BadgeVariant } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { SearchBar } from "../components/ui/SearchBar";

interface Position {
    id: number;
    title: string;
    level: string;
    dept: string;
    count: number;
    type: BadgeVariant;
}

export function Cargos() {

    const positions: Position[] = [
        { id: 1, title: "Gerente de Projetos", level: "Gerencial", dept: "TI", count: 3, type: "brand" },
        { id: 2, title: "Desenvolvedor Senior", level: "Senior", dept: "TI", count: 8, type: "success" },
        { id: 3, title: "Desenvolvedor Pleno", level: "Pleno", dept: "TI", count: 12, type: "neutral" },
        { id: 4, title: "Desenvolvedor Junior", level: "Junior", dept: "TI", count: 6, type: "neutral" },
        { id: 5, title: "Designer UX/UI", level: "Pleno", dept: "Design", count: 4, type: "neutral" },
        { id: 6, title: "Analista de RH", level: "Pleno", dept: "RH", count: 2, type: "neutral" },
        { id: 7, title: "Assistente Administrativo", level: "Junior", dept: "Administrativo", count: 5, type: "neutral" },
    ];

    function handleNewPosition() {
        alert("Teste modal");
    }

    return (
        <div className="space-y-6">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-corporate-slate">Cargos & Estrutura</h1>
                    <p className="text-metallic-silver mt-1">Gerencie a estrutura organizacional</p>
                </div>

                <Button onClick={handleNewPosition}>
                    <Plus size={20} />
                    Novo Cargo
                </Button>
            </header>

            <SearchBar
                placeholder="Buscar por cargo..."
                className="mb-6"
            />


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
                            <button className="flex-1 flex items-center justify-center gap-2 p-2 text-primary-teal hover:bg-primary-teal/10 rounded-md transition-colors text-sm font-medium">
                                <Pencil size={16} /> Editar
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 p-2 text-error-red hover:bg-error-red/10 rounded-md transition-colors text-sm font-medium">
                                <Trash2 size={16} /> Excluir
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
                                                <button className="p-2 text-primary-teal hover:bg-primary-teal/10 rounded-md transition-colors cursor-pointer" title="Editar">
                                                    <Pencil size={18} />
                                                </button>
                                                <button className="p-2 text-error-red hover:bg-error-red/10 rounded-md transition-colors cursor-pointer" title="Excluir">
                                                    <Trash2 size={18} />
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