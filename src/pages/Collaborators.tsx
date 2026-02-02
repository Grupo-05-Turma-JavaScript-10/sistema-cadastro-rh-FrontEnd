import { useState, useEffect } from "react";
import { PlusIcon, FilterIcon } from "lucide-react";
import { Button } from "../components/ui/Button";
import CollaboratorsTable from "../components/collaborators/CollaboratorsTable";
import type Worker from "../models/Worker";
import { SearchBar } from "../components/ui/SearchBar";
import { PageHeader } from "../components/ui/PageHeader";
import { PageTransition } from "../components/ui/PageTransition";

export function Collaborators() {
    const [collaborators, setCollaborators] = useState<Worker[]>([]);

    useEffect(() => {

        const mockData: Worker[] = [
            {
                id: 1,
                nome: "Maria Silva",
                cargo: { id: 1, nome: "Gerente de Projetos", descricao: "" },
                email: "maria@empresa.com",
                cpf: "123",
                data_admissão: new Date("2023-03-15"),
                salario: 0,
                status: true,
                usuario: { idUsuario: 1, nome: "maria", senha: "", foto: "" }
            },
            {
                id: 2,
                nome: "João Santos",
                cargo: { id: 2, nome: "Desenvolvedor Senior", descricao: "" },
                email: "joao@empresa.com",
                cpf: "123",
                data_admissão: new Date("2022-05-20"),
                salario: 0,
                status: true,
                usuario: { idUsuario: 2, nome: "joao", senha: "", foto: "" }
            },
        ];
        setCollaborators(mockData);
    }, []);

    function handleNewCollaborator() {
        console.log("Abrir modal de novo colaborador");
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

            <div className="flex flex-col md:flex-row gap-3">

                <SearchBar
                    placeholder="Buscar por nome, cargo ou departamento..."
                    className="flex-1"
                />

                <button className="flex items-center gap-2 px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium text-sm">
                    <FilterIcon size={18} />
                    Filtros
                </button>
            </div>


            <CollaboratorsTable
                workers={collaborators}
                onView={(worker) => console.log("Ver", worker)}
                onEdit={(worker) => console.log("Editar", worker)}
            />

        </div>
        </PageTransition>
    );

}