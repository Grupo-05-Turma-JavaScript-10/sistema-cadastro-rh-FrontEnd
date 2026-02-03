import { CheckCircle2Icon, Plus, ShieldCheckIcon, UsersIcon } from "lucide-react";
import { useEffect, useState } from "react";
import UsersTable from "../components/users/UsersTable";
import PermissionLevels from "../components/users/PermissionsLevel";
import type Worker from "../models/Worker";
import { Button } from "../components/ui/Button";
import { StatCard } from "../components/ui/StatCard";
import { SearchBar } from "../components/ui/SearchBar";
import { PageHeader } from "../components/ui/PageHeader";
import { PageTransition } from "../components/ui/PageTransition";
import { listarColaboradores, atualizarColaborador } from "../services/colaboradorService";

function Users() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);

  useEffect(() => {
    listarColaboradores(setWorkers);
  }, []);

  // NOVO USUÁRIO (placeholder de modal)
  function handleNewUser() {
    alert("Aqui entra o modal/form de criação de usuário");
  }
  
  function handleEdit(worker: Worker) {
    setSelectedWorker(worker);
    console.log("Editar usuário:", worker);

    // futuramente:
    // abrir modal preenchido com selectedWorker
  }

  // REMOVER USUÁRIO (remove acesso, NÃO deleta colaborador)
  function handleDelete(workerId: number) {
    const worker = workers.find((w) => w.id === workerId);
    if (!worker) return;

    const workerSemUsuario: Worker = {
      ...worker,
      usuario: undefined,
    };

    atualizarColaborador(workerSemUsuario, () => {
      listarColaboradores(setWorkers);
    });
  }

  return (
    <PageTransition>
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
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            title="Total de Usuários"
            value={workers.length}
            icon={UsersIcon}
          />

          <StatCard
            title="Usuários Ativos"
            value={workers.filter((w) => w.status).length}
            variant="success"
            icon={CheckCircle2Icon}
          />

          <StatCard
            title="Administradores"
            value={workers.filter((w) => w.usuario).length}
            variant="brand"
            icon={ShieldCheckIcon}
          />
        </section>
      </div>
    </PageTransition>
  );
}

export default Users;
