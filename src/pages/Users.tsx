import { CheckCircle2Icon, Plus, ShieldCheckIcon, UsersIcon } from "lucide-react";
import { useEffect, useState } from "react";
import UsersTable from "../components/users/UsersTable";
import PermissionLevels from "../components/users/PermissionsLevel";
import type Worker from "../models/Worker";
import { Button } from "../components/ui/Button";
import { StatCard } from "../components/ui/StatCard";
import { SearchBar } from "../components/ui/SearchBar";
import { PageHeader } from "../components/ui/PageHeader";

function Users() {
    const [workers, setWorkers] = useState<Worker[]>([]);

    useEffect(() => {
        // aqui futuramente entra o fetch da service/API
        setWorkers([]);
    }, []);

    useEffect(() => {
        // MOCK TEMPORÁRIO PARA VISUALIZAÇÃO
        const mockWorkers: Worker[] = [
            {
                id: 1,
                nome: "Admin Master",
                cpf: "000.000.000-00",
                email: "admin@empresa.com",
                data_admissão: new Date("2022-01-10"),
                salario: 12000,
                status: true,
                cargo: {
                    id: 1,
                    nome: "Administrador do Sistema",
                    descricao: "",
                },
                usuario: {
                    idUsuario: 1,
                    nome: "admin",
                    senha: "",
                    foto: "",
                },
            },
            {
                id: 2,
                nome: "Admin Master 2",
                cpf: "000.000.000-00",
                email: "admin2@empresa.com",
                data_admissão: new Date("2022-01-10"),
                salario: 12000,
                status: false,
                cargo: {
                    id: 1,
                    nome: "Administrador do Sistema",
                    descricao: "",
                },
                usuario: {
                    idUsuario: 1,
                    nome: "admin",
                    senha: "",
                    foto: "",
                },
            },
        ];

        setWorkers(mockWorkers);
    }, []);

    function handleNewUser() {
        alert("Teste modal");
    }

    return (
        <div className="space-y-6">
            <PageHeader 
                title="Usuários do Sistema" 
                subtitle="Controle quem pode acessar e gerenciar o sistema"
            >
                <Button onClick={handleNewUser}>
                    <Plus size={20} />
                    Novo Usuário
                </Button>
            </PageHeader>

            <SearchBar
                placeholder="Buscar por nome, e-mail ou perfil"
                className="mb-6"
            />

            <PermissionLevels />

            <UsersTable
                workers={workers}
                onEdit={(worker) => console.log("Editar", worker)}
                onDelete={(id) => console.log("Excluir", id)}
            />

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatCard
                    title="Total de Usuários"
                    value={workers.length}
                    icon={UsersIcon}
                />
                <StatCard
                    title="Usuários Ativos"
                    value={workers.filter(w => w.status).length}
                    variant="success"
                    icon={CheckCircle2Icon}
                />
                <StatCard
                    title="Administradores"
                    value={workers.filter(w => w.usuario).length}
                    variant="brand"
                    icon={ShieldCheckIcon}
                />
            </section>
        </div>
    );
}

export default Users;
