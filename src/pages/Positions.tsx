import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "../components/ui/Button";
import { SearchBar } from "../components/ui/SearchBar";
import { PageHeader } from "../components/ui/PageHeader";
import { PositionsTable, type Position } from "../components/positions/PositionsTable";
import PositionForm from "../components/positions/PositionForm";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import type PositionModel from "../models/Position";
import { usePositions } from "../hooks/usePositions";
import { usePosition } from "../hooks/usePosition";
import { deletarCargo } from "../services/cargoService";
import { toast } from "react-toastify";


export function Cargos() {

    const { data, query, setQuery, refetch } = usePositions();
    const [openForm, setOpenForm] = useState(false);
    const [selected, setSelected] = useState<PositionModel | null>(null);
    const [openDelete, setOpenDelete] = useState(false);
    const { save } = usePosition();

    const positions: Position[] = data.map((p) => ({
        id: p.id,
        title: p.nome,
        level: "—",
        dept: "—",
        count: Array.isArray(p.colaborador) ? p.colaborador.length : 0,
        type: "neutral",
    }));

    function handleNewPosition() {
        setSelected(null);
        setOpenForm(true);
    }

    return (
        <PageTransition>
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
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />


            <PositionsTable
                positions={positions}
                onEdit={(pos) => {
                    const match = data.find((p) => p.id === pos.id) ?? null;
                    setSelected(match);
                    setOpenForm(true);
                }}
                onDelete={(id) => {
                    const match = data.find((p) => p.id === id) ?? null;
                    setSelected(match);
                    setOpenDelete(true);
                }}
            />

            <ConfirmDialog
                open={openDelete}
                title="Excluir cargo"
                description="Essa ação não pode ser desfeita."
                onClose={() => setOpenDelete(false)}
                onConfirm={async () => {
                    try {
                        if (selected?.id) {
                            await deletarCargo(selected.id);
                            toast.success("Cargo excluído!");
                            setOpenDelete(false);
                            refetch();
                        }
                    } catch {
                        toast.error("Falha ao excluir cargo.");
                    }
                }}
            />

            {openForm && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                        <h3 className="text-lg font-semibold mb-4">
                            {selected ? "Editar Cargo" : "Novo Cargo"}
                        </h3>
                        <PositionForm
                            initial={selected ?? null}
                            onSubmit={async (payload) => {
                                try {
                                    await save(payload as PositionModel);
                                    toast.success("Cargo salvo com sucesso!");
                                    setOpenForm(false);
                                    refetch();
                                } catch {
                                    toast.error("Falha ao salvar cargo.");
                                }
                            }}
                            onCancel={() => setOpenForm(false)}
                        />
                    </div>
                </div>
            )}
        </div>
        </PageTransition>
    );
}
