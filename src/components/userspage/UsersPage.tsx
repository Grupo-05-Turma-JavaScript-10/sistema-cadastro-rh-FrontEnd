import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import UsersTable from "./UsersTable";
import PermissionLevels from "./PermissionsLevel";
import type Worker from "../../models/Worker";
import { Button } from "../ui/Button";

function UsersPage() {
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

    return (
        <main className="p-6 space-y-6">
            <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Usuários do Sistema</h1>
                    <p className="text-sm text-[var(--color-metallic-silver)]">
                        Controle quem pode acessar e gerenciar o sistema
                    </p>
                </div>

                <Button>
                    <Plus size={20} />
                    Novo Usuário
                </Button>
            </header>

            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6 flex items-center gap-3">
                <Search size={20} className="text-metallic-silver" />
                <input
                    type="text"
                    placeholder="Buscar por nome, e-mail ou perfil"
                    className="flex-1 outline-none text-corporate-slate placeholder:text-gray-400"
                />
            </div>

            <PermissionLevels />

            <UsersTable
                workers={workers}
                onEdit={(worker) => console.log("Editar", worker)}
                onDelete={(id) => console.log("Excluir", id)}
            />

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatCard label="Total de Usuários" value={workers.length} />
                <StatCard
                    label="Usuários Ativos"
                    value={workers.filter(w => w.status).length}
                    valueColor="text-[var(--color-success-green)]"
                />
                <StatCard
                    label="Administradores"
                    value={workers.filter(w => w.usuario).length}
                    valueColor="text-[var(--color-primary-teal)]"
                />
            </section>
        </main>
    );
}

export default UsersPage;
