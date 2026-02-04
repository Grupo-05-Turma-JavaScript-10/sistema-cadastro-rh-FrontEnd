import { useState } from "react";
import { PlusIcon, FilterIcon } from "lucide-react";
import { Button } from "../components/ui/Button";
import CollaboratorsTable from "../components/collaborators/CollaboratorsTable";
import { SearchBar } from "../components/ui/SearchBar";
import { PageHeader } from "../components/ui/PageHeader";
import CollaboratorForm from "../components/collaborators/CollaboratorForm";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import SalaryCalcDialog from "../components/collaborators/SalaryCalcDialog";
import { useCollaborators } from "../hooks/useCollaborators";
import { useCollaborator } from "../hooks/useCollaborator";
import { deletarColaborador } from "../services/colaboradorService";
import { toast } from "react-toastify";
import { PageTransition } from "../components/ui/PageTransition";
import { Modal } from "../components/ui/Modal";

export function Collaborators() {
    const { data: collaborators, query, setQuery, refetch, updateLocal } = useCollaborators();
    const [openForm, setOpenForm] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const { save } = useCollaborator(selectedId ?? undefined);
    const [openDelete, setOpenDelete] = useState(false);
    const [openCalc, setOpenCalc] = useState(false);

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
        <PageTransition>
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

                <div className="flex flex-col md:flex-row gap-4 mb-6">

                    <div className="flex-1">
                        <SearchBar
                            placeholder="Buscar por nome, cargo ou departamento..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <button className="flex items-center justify-center gap-2 px-4 py-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium text-sm h-full md:w-auto w-full">
                        <FilterIcon size={18} />
                        Filtros
                    </button>

                </div>


                <CollaboratorsTable
                    workers={collaborators}
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

                />


                <Modal
                    isOpen={openForm}
                    onClose={() => setOpenForm(false)}
                    title={selectedId ? "Editar Colaborador" : "Novo Colaborador"}
                >
                    <CollaboratorForm
                        initial={selectedId ? (collaborators.find(w => w.id === selectedId) ?? null) : null}
                        onSubmit={handleSave}
                        onCancel={() => setOpenForm(false)}
                    />
                </Modal>

            </div>
        </PageTransition>
    );
}
