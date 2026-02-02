import { Plus } from "lucide-react";

import { Button } from "../components/ui/Button";
import { SearchBar } from "../components/ui/SearchBar";
import { PageHeader } from "../components/ui/PageHeader";
import { PositionsTable, type Position } from "../components/positions/PositionsTable";


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
            <PageHeader
                title="Cargos & Estrutura"
                subtitle="Gerencie a estrutura organizacional"
            >
                <Button onClick={handleNewPosition}>
                    <Plus size={20} />
                    Novo Cargo
                </Button>
            </PageHeader>

            <SearchBar
                placeholder="Buscar por cargo..."
                className="mb-6"
            />


            <PositionsTable
                positions={positions}
                onEdit={(pos) => console.log("Editar", pos)}
                onDelete={(id) => console.log("Deletar", id)}
            />
        </div>
    );
}