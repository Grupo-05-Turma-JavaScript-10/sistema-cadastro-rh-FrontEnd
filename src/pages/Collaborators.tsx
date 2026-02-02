import { useState } from "react";
import { PlusIcon, FilterIcon } from "lucide-react";
import { Button } from "../components/ui/Button";
import CollaboratorsTable from "../components/collaborators/CollaboratorsTable";
import { SearchBar } from "../components/ui/SearchBar";
import { PageHeader } from "../components/ui/PageHeader";
import CollaboratorForm from "../components/collaborators/CollaboratorForm";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import SalaryCalcDialog from "../components/collaborators/SalaryCalcDialog";
import SalaryHistoryDialog from "../components/collaborators/SalaryHistoryDialog";
import { useCollaborators } from "../hooks/useCollaborators";
import { useCollaborator } from "../hooks/useCollaborator";
import { deletarColaborador } from "../services/colaboradorService";
import { toast } from "react-toastify";

export function Collaborators() {
    const { data: collaborators, query, setQuery, refetch, updateLocal } = useCollaborators();
    const [openForm, setOpenForm] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const { save } = useCollaborator(selectedId ?? undefined);
    const [openDelete, setOpenDelete] = useState(false);
    const [openCalc, setOpenCalc] = useState(false);
    const [openHistory, setOpenHistory] = useState(false);

    function handleNewCollaborator() {
        setSelectedId(null);
        setOpenForm(true);
    }

    async function handleSave(payload: any) {
        try {
            await save(payload);
            setOpenForm(false);
            refetch();
            toast.success("Colaborador salvo com sucesso!");
        } catch (err: any) {
            toast.error(err?.message || "Falha ao salvar colaborador. Verifique os dados obrigatórios.");
        }
    }

    function handleEdit(worker: any) {
        setSelectedId(worker.id);
        setOpenForm(true);
    }

    async function handleDeleteConfirm() {
        if (selectedId == null) return;
        await deletarColaborador(selectedId);
        setOpenDelete(false);
        refetch();
        toast.success("Colaborador excluído!");
    }

    function handleDelete(worker: any) {
        setSelectedId(worker.id);
        setOpenDelete(true);
    }


    return (
        <div className="space-y-6">

            <PageHeader
                title="Colaboradores"
                subtitle="Gerencie os colaboradores da empresa"
            >
                <Button onClick={handleNewCollaborator}>
                    <PlusIcon size={20} />
                    Novo Colaborador
                </Button>
                
            </PageHeader>

            <div className="flex flex-col md:flex-row gap-3">

                <SearchBar
                    placeholder="Buscar por nome, cargo ou departamento..."
                    className="flex-1"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <button className="flex items-center gap-2 px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium text-sm">
                    <FilterIcon size={18} />
                    Filtros
                </button>
            </div>


            <CollaboratorsTable
                workers={collaborators}
                onView={(worker) => {
                    setSelectedId(worker.id);
                    setOpenHistory(true);
                }}
                onEdit={handleEdit}
                onDelete={(worker) => handleDelete(worker)}
                onCalculate={(worker) => {
                    setSelectedId(worker.id);
                    setOpenCalc(true);
                }}
            />

            <ConfirmDialog
                open={openDelete}
                title="Excluir colaborador"
                description="Essa ação não pode ser desfeita."
                onConfirm={handleDeleteConfirm}
                onClose={() => setOpenDelete(false)}
            />

            <SalaryCalcDialog
                open={openCalc}
                onClose={() => setOpenCalc(false)}
                worker={selectedId ? (collaborators.find(w => w.id === selectedId) ?? null) : null}
                onCalculate={async (payload) => {
                    if (!selectedId) return;
                    const { calcularSalarioColaborador } = await import("../services/colaboradorService");
                    const res = await calcularSalarioColaborador(selectedId, payload);
                    toast.success("Salário calculado com sucesso!");
                    const anyRes = res as any;
                    const salario = Number(anyRes?.salario ?? anyRes?.liquido ?? anyRes?.salarioCalculado);
                    if (Number.isFinite(salario)) {
                        updateLocal(selectedId, { salario });
                        refetch();
                    }
                    return res;
                }}
            />
            
            <SalaryHistoryDialog
                open={openHistory}
                workerId={selectedId}
                onClose={() => setOpenHistory(false)}
            />

            {openForm && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                        <h3 className="text-lg font-semibold mb-4">
                            {selectedId ? "Editar Colaborador" : "Novo Colaborador"}
                        </h3>
                        <CollaboratorForm
                            initial={selectedId ? (collaborators.find(w => w.id === selectedId) ?? null) : null}
                            onSubmit={handleSave}
                            onCancel={() => setOpenForm(false)}
                        />
                    </div>
                </div>
            )}

        </div>
    );
}
